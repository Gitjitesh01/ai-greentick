import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Mock WebSocket for Node.js < 22 so we don't crash on RealtimeClient instantiation
global.WebSocket = class {};

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'data', 'db.json');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Error: Supabase environment variables are missing in .env!');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function seed() {
  console.log('🔗 Connecting to Supabase...');
  
  try {
    console.log('📂 Reading local database file...');
    const fileContent = await fs.readFile(DB_PATH, 'utf-8');
    const localDB = JSON.parse(fileContent);

    console.log('🌱 Seeding site_content table...');
    for (const [key, value] of Object.entries(localDB)) {
      if (key === 'leads') {
        const leadsArray = value || [];
        console.log(`📩 Seeding ${leadsArray.length} leads...`);
        for (const lead of leadsArray) {
          const { error } = await supabase.from('leads').upsert({
            id: lead.id,
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            company: lead.company || '',
            type: lead.type || 'General Inquiry',
            message: lead.message,
            created_at: lead.date || new Date().toISOString()
          });
          if (error) {
            console.error(`❌ Failed to seed lead ${lead.id}:`, error.message);
          }
        }
      } else {
        console.log(`📝 Seeding section: "${key}"`);
        const { error } = await supabase.from('site_content').upsert({ key, value });
        if (error) {
          console.error(`❌ Failed to seed site content key "${key}":`, error.message);
        }
      }
    }
    
    console.log('✅ Seeding process completed successfully!');
  } catch (err) {
    console.error('❌ Seeding process failed:', err.message);
  }
}

seed();
