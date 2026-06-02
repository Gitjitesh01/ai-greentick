import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Polyfill globalThis.WebSocket for older Node.js versions to bypass realtime-js constructor crash
if (!globalThis.WebSocket) {
  globalThis.WebSocket = class { };
}

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');
const uploadsDir = path.join(__dirname, 'uploads');

// Get email and password from environment variables or use a default one
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@aigreentick.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const SESSION_TOKEN = 'aigreentick_secure_session_token_2026';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Initialize Supabase Client
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

let supabase = null;
if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY && SUPABASE_URL !== 'https://your-project-ref.supabase.co') {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    console.log('✅ Supabase database connection initialized.');
  } catch (err) {
    console.error('❌ Failed to initialize Supabase client:', err);
  }
} else {
  console.log('⚠️ Supabase credentials unconfigured. Falling back to local db.json.');
}

// Helper function to read from DB (supporting Supabase & Local JSON)
async function readDB() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('key, value');

      if (error) {
        console.error('Error fetching content from Supabase:', error);
        throw error;
      }

      const db = {};
      data.forEach(row => {
        db[row.key] = row.value;
      });

      // Fetch leads as well to maintain structure compatibility
      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (!leadsError && leadsData) {
        db.leads = leadsData.map(l => ({
          ...l,
          date: l.created_at
        }));
      } else {
        db.leads = [];
      }

      return db;
    } catch (supabaseError) {
      console.warn('⚠️ Supabase read failed. Falling back to local db.json:', supabaseError.message);
    }
  }

  // Fallback Mode (Local db.json)
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database file:', error);
    return { hero: {}, plans: [], blogPosts: [], leads: [] };
  }
}

// Helper function to write to DB (supporting Supabase & Local JSON)
async function writeDB(data) {
  if (supabase) {
    try {
      let overallSuccess = true;
      for (const [key, value] of Object.entries(data)) {
        if (key === 'leads') continue; // Leads table updated via independent API
        const { error } = await supabase
          .from('site_content')
          .upsert({ key, value });
        if (error) {
          console.error(`Error saving key ${key} to Supabase:`, error);
          overallSuccess = false;
        }
      }
      if (overallSuccess) return true;
    } catch (supabaseError) {
      console.warn('⚠️ Supabase write failed. Falling back to local db.json:', supabaseError.message);
    }
  }

  // Fallback Mode (Local db.json)
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing to database file:', error);
    return false;
  }
}

// Authentication Middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${SESSION_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized access. Please log in.' });
  }
  next();
};

// 1. Auth Endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ success: true, token: SESSION_TOKEN });
  }
  return res.status(400).json({ success: false, error: 'Invalid email or password' });
});

app.get('/api/auth/validate', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader === `Bearer ${SESSION_TOKEN}`) {
    return res.json({ valid: true });
  }
  return res.json({ valid: false });
});

// 2. Public Content API
app.get('/api/content', async (req, res) => {
  const db = await readDB();
  const { leads, ...contentData } = db;
  res.json(contentData);
});

// Recursive helper to find and upload base64 images in JSON payload
async function processBase64Images(obj) {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === 'string') {
    const base64Regex = /^data:image\/(\w+);base64,/;
    const match = obj.match(base64Regex);
    if (match) {
      const ext = match[1];
      const cleanBase64 = obj.replace(base64Regex, '');
      const buffer = Buffer.from(cleanBase64, 'base64');
      const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}.${ext}`;
      
      let imageUrl = '';
      let isUploadedToSupabase = false;

      if (supabase) {
        try {
          // Check bucket
          const { data: buckets, error: listError } = await supabase.storage.listBuckets();
          if (!listError && !buckets.find(b => b.name === 'images')) {
            await supabase.storage.createBucket('images', { public: true });
          }

          // Upload to bucket
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('images')
            .upload(filename, buffer, {
              contentType: `image/${ext}`,
              upsert: true
            });

          if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage
              .from('images')
              .getPublicUrl(filename);
            imageUrl = publicUrl;
            isUploadedToSupabase = true;
          }
        } catch (err) {
          console.warn('⚠️ Base64 upload to Supabase failed, falling back to local file:', err.message);
        }
      }

      // Local fallback
      if (!imageUrl) {
        try {
          const filePath = path.join(uploadsDir, filename);
          await fs.writeFile(filePath, buffer);
          imageUrl = `/uploads/${filename}`;
        } catch (err) {
          console.error('❌ Failed to write local upload file during payload processing:', err);
          return obj;
        }
      }

      // Record in image library index for transparency/deletion support
      try {
        const db = await readDB();
        db.images = db.images || [];
        const newImage = {
          id: Date.now().toString() + Math.random().toString(36).substring(2, 6),
          name: `Inline Upload (${filename.substring(0, 8)})`,
          url: imageUrl,
          description: 'Uploaded directly via editor save',
          created_at: new Date().toISOString(),
          filename: filename,
          isSupabase: isUploadedToSupabase
        };
        db.images.unshift(newImage);
        await writeDB(db);
      } catch (dbErr) {
        console.error('⚠️ Failed to add inline upload to image index:', dbErr);
      }

      return imageUrl;
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    const newArr = [];
    for (const item of obj) {
      newArr.push(await processBase64Images(item));
    }
    return newArr;
  }

  if (typeof obj === 'object') {
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
      newObj[key] = await processBase64Images(value);
    }
    return newObj;
  }

  return obj;
}

// 3. Admin Content Update API
app.put('/api/content', authenticateAdmin, async (req, res) => {
  const db = await readDB();

  // Process and upload any inline base64 images inside the payload
  let processedBody = req.body;
  try {
    processedBody = await processBase64Images(req.body);
  } catch (err) {
    console.error('❌ Failed to process base64 images in PUT payload:', err);
  }

  // Merge all received keys from processedBody into db
  Object.assign(db, processedBody);

  const success = await writeDB(db);
  if (success) {
    res.json({ success: true, message: 'Content updated successfully' });
  } else {
    res.status(500).json({ error: 'Failed to update content on disk' });
  }
});

// 4. Public Lead Capture API
app.post('/api/leads', async (req, res) => {
  const { name, email, phone, company, type, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'Missing required lead fields' });
  }

  if (supabase) {
    try {
      const { data: newLead, error } = await supabase
        .from('leads')
        .insert({
          id: Date.now().toString(),
          name,
          email,
          phone,
          company: company || '',
          type: type || 'General Inquiry',
          message
        })
        .select();

      if (error) {
        console.error('Error inserting lead to Supabase:', error);
        throw error;
      }
      return res.status(201).json({ success: true, lead: newLead[0] });
    } catch (supabaseError) {
      console.warn('⚠️ Supabase lead insertion failed. Falling back to local db.json:', supabaseError.message);
    }
  }

  // Fallback to local database
  const db = await readDB();
  const newLead = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    company: company || '',
    type: type || 'General Inquiry',
    message,
    date: new Date().toISOString()
  };

  db.leads = db.leads || [];
  db.leads.unshift(newLead);

  const success = await writeDB(db);
  if (success) {
    res.status(201).json({ success: true, lead: newLead });
  } else {
    res.status(500).json({ error: 'Failed to record lead in database' });
  }
});

// 5. Admin Leads Management API
app.get('/api/leads', authenticateAdmin, async (req, res) => {
  if (supabase) {
    try {
      const { data: leadsData, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error querying leads from Supabase:', error);
        throw error;
      }

      const formattedLeads = leadsData.map(l => ({
        ...l,
        date: l.created_at
      }));
      return res.json(formattedLeads);
    } catch (supabaseError) {
      console.warn('⚠️ Supabase leads query failed. Falling back to local db.json:', supabaseError.message);
    }
  }

  const db = await readDB();
  res.json(db.leads || []);
});

app.delete('/api/leads/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;

  if (supabase) {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting lead from Supabase:', error);
        throw error;
      }
      return res.json({ success: true, message: 'Lead deleted successfully' });
    } catch (supabaseError) {
      console.warn('⚠️ Supabase lead deletion failed. Falling back to local db.json:', supabaseError.message);
    }
  }

  const db = await readDB();
  db.leads = db.leads || [];
  const initialLength = db.leads.length;
  db.leads = db.leads.filter(lead => lead.id !== id);

  if (db.leads.length === initialLength) {
    return res.status(404).json({ error: 'Lead not found' });
  }

  const success = await writeDB(db);
  if (success) {
    res.json({ success: true, message: 'Lead deleted successfully' });
  } else {
    res.status(500).json({ error: 'Failed to save database update' });
  }
});


// Ensure uploads directory exists for local fallback
try {
  if (!existsSync(uploadsDir)) {
    await fs.mkdir(uploadsDir, { recursive: true });
    console.log('📁 Created uploads directory for local image fallback.');
  }
} catch (err) {
  console.error('❌ Failed to create uploads directory:', err);
}

// Serve local uploads
app.use('/uploads', express.static(uploadsDir));

// 6. Image/Media Library Management API
app.get('/api/images', async (req, res) => {
  const db = await readDB();
  res.json(db.images || []);
});

app.post('/api/images/upload', authenticateAdmin, async (req, res) => {
  const { name, type, base64 } = req.body;
  if (!name || !base64) {
    return res.status(400).json({ error: 'Missing name or base64 data' });
  }

  const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(cleanBase64, 'base64');
  const filename = `${Date.now()}-${name.replace(/\s+/g, '_')}`;
  
  let imageUrl = '';
  let isUploadedToSupabase = false;

  if (supabase) {
    try {
      // Check if bucket exists
      const { data: buckets, error: listError } = await supabase.storage.listBuckets();
      if (!listError && !buckets.find(b => b.name === 'images')) {
        await supabase.storage.createBucket('images', { public: true });
        console.log('✅ Created "images" storage bucket in Supabase.');
      }

      // Upload file to bucket
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(filename, buffer, {
          contentType: type || 'image/png',
          upsert: true
        });

      if (uploadError) {
        console.warn('⚠️ Supabase file upload failed, falling back to local file:', uploadError.message);
      } else {
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(filename);
        imageUrl = publicUrl;
        isUploadedToSupabase = true;
        console.log('✅ Image uploaded to Supabase Storage:', imageUrl);
      }
    } catch (err) {
      console.warn('⚠️ Error during Supabase upload process, falling back to local file:', err.message);
    }
  }

  // Fallback if not using Supabase or if Supabase upload failed
  if (!imageUrl) {
    try {
      const filePath = path.join(uploadsDir, filename);
      await fs.writeFile(filePath, buffer);
      imageUrl = `/uploads/${filename}`;
      console.log('📁 Image saved locally:', imageUrl);
    } catch (err) {
      console.error('❌ Failed to write local upload file:', err);
      return res.status(500).json({ error: 'Failed to write uploaded image' });
    }
  }

  // Add metadata row to DB
  const db = await readDB();
  db.images = db.images || [];
  
  const newImage = {
    id: Date.now().toString(),
    name: name.split('.')[0] || name,
    url: imageUrl,
    description: req.body.description || '',
    created_at: new Date().toISOString(),
    filename: filename,
    isSupabase: isUploadedToSupabase
  };

  db.images.unshift(newImage);
  const success = await writeDB(db);

  if (success) {
    res.status(201).json(newImage);
  } else {
    res.status(500).json({ error: 'Failed to record image metadata in database' });
  }
});

app.put('/api/images/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const db = await readDB();
  db.images = db.images || [];

  const imgIndex = db.images.findIndex(img => img.id === id);
  if (imgIndex === -1) {
    return res.status(404).json({ error: 'Image not found' });
  }

  db.images[imgIndex] = {
    ...db.images[imgIndex],
    name: name || db.images[imgIndex].name,
    description: description !== undefined ? description : db.images[imgIndex].description
  };

  const success = await writeDB(db);
  if (success) {
    res.json(db.images[imgIndex]);
  } else {
    res.status(500).json({ error: 'Failed to update image metadata' });
  }
});

app.delete('/api/images/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const db = await readDB();
  db.images = db.images || [];

  const imgIndex = db.images.findIndex(img => img.id === id);
  if (imgIndex === -1) {
    return res.status(404).json({ error: 'Image not found' });
  }

  const image = db.images[imgIndex];

  // Try to delete physical file
  if (image.isSupabase && supabase) {
    try {
      await supabase.storage
        .from('images')
        .remove([image.filename]);
      console.log('✅ Image deleted from Supabase Storage:', image.filename);
    } catch (err) {
      console.warn('⚠️ Could not delete image from Supabase storage:', err.message);
    }
  } else if (image.filename) {
    try {
      const filePath = path.join(uploadsDir, image.filename);
      if (existsSync(filePath)) {
        await fs.unlink(filePath);
        console.log('📁 Local image file deleted:', image.filename);
      }
    } catch (err) {
      console.warn('⚠️ Could not delete local image file:', err.message);
    }
  }

  // Remove from DB list
  db.images.splice(imgIndex, 1);
  const success = await writeDB(db);
  if (success) {
    res.json({ success: true, message: 'Image deleted successfully' });
  } else {
    res.status(500).json({ error: 'Failed to update database after image deletion' });
  }
});

// Serve compiled static files in production (if built)
const siblingWebsitePath = path.join(__dirname, '..', 'AiGreentick', 'copy-of-ai-greentick', 'dist');
const fallbackWebsitePath = path.join(__dirname, '..', 'copy-of-ai-greentick', 'dist');
const WEBSITE_DIST_PATH = process.env.WEBSITE_DIST_PATH ||
  (existsSync(siblingWebsitePath) ? siblingWebsitePath : fallbackWebsitePath);
const ADMIN_DIST_PATH = process.env.ADMIN_DIST_PATH || path.join(__dirname, 'dist');

// Serve Admin UI static files
app.use('/admin', express.static(ADMIN_DIST_PATH));
// Serve public Website static files
app.use('/', express.static(WEBSITE_DIST_PATH));

// For SPA routing, direct all other requests to index.html of respective apps
app.get('/admin/*', async (req, res, next) => {
  try {
    const indexPath = path.join(ADMIN_DIST_PATH, 'index.html');
    await fs.access(indexPath);
    res.sendFile(indexPath);
  } catch {
    next();
  }
});

app.get('/*', async (req, res, next) => {
  // Avoid capturing API routes
  if (req.path.startsWith('/api')) {
    return next();
  }
  try {
    const indexPath = path.join(WEBSITE_DIST_PATH, 'index.html');
    await fs.access(indexPath);
    res.sendFile(indexPath);
  } catch {
    next();
  }
});

// Automatic Database Migration/Seeding on Startup
async function seedSupabaseIfNeeded() {
  if (!supabase) return;
  try {
    const { count, error } = await supabase
      .from('site_content')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.warn('⚠️ Could not query site_content table in Supabase. Check if tables are created in your Supabase project.');
      return;
    }

    if (count === 0) {
      console.log('🌱 Supabase site_content is empty. Starting seeding from local db.json...');
      try {
        const fileContent = await fs.readFile(DB_PATH, 'utf-8');
        const localDB = JSON.parse(fileContent);

        for (const [key, value] of Object.entries(localDB)) {
          if (key === 'leads') {
            const leadsArray = value || [];
            for (const lead of leadsArray) {
              await supabase.from('leads').upsert({
                id: lead.id,
                name: lead.name,
                email: lead.email,
                phone: lead.phone,
                company: lead.company || '',
                type: lead.type || 'General Inquiry',
                message: lead.message,
                created_at: lead.date || new Date().toISOString()
              });
            }
          } else {
            await supabase.from('site_content').upsert({ key, value });
          }
        }
        console.log('✅ Supabase database successfully seeded with dynamic defaults.');
      } catch (seedErr) {
        console.error('❌ Failed to read or parse local db.json for seeding:', seedErr);
      }
    } else {
      console.log('📊 Supabase site_content contains existing records. Skipping seeding.');
    }
  } catch (err) {
    console.error('❌ Database migration/seeding check failed:', err);
  }
}

app.listen(PORT, async () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
  console.log(`Default admin credentials: email=${ADMIN_EMAIL}, password=${ADMIN_PASSWORD}`);
  await seedSupabaseIfNeeded();
});
