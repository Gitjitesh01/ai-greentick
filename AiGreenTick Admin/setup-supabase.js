import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SQL_PATH = path.join(__dirname, 'supabase_schema.sql');
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// Parse project ref from Supabase URL
const supabaseUrl = process.env.VITE_SUPABASE_URL;
if (!supabaseUrl) {
  console.error('❌ Error: VITE_SUPABASE_URL is missing in .env file!');
  process.exit(1);
}

// Extacts project ref from https://[ref].supabase.co
const projectRefMatch = supabaseUrl.match(/https:\/\/([^.]+)\.supabase/);
if (!projectRefMatch) {
  console.error('❌ Error: Could not parse project reference from VITE_SUPABASE_URL:', supabaseUrl);
  process.exit(1);
}

const projectRef = projectRefMatch[1];
const dbHost = process.env.SUPABASE_DB_HOST || `db.${projectRef}.supabase.co`;
const dbUser = process.env.SUPABASE_DB_USER || 'postgres';
const dbPort = process.env.SUPABASE_DB_PORT ? parseInt(process.env.SUPABASE_DB_PORT) : 5432;
const dbName = process.env.SUPABASE_DB_NAME || 'postgres';

console.log('🤖 Supabase Database Schema Setup Tool');
console.log('-------------------------------------');
console.log(`🔗 Target Host: ${dbHost}`);
console.log(`👤 DB User:    ${dbUser}`);
console.log(`📁 DB Name:    ${dbName}`);
console.log('');

// Read database password
const getPassword = async () => {
  if (process.env.SUPABASE_DB_PASSWORD) {
    return process.env.SUPABASE_DB_PASSWORD;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('🔑 Enter your Supabase Database Password: ', (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
};

async function main() {
  const dbPassword = await getPassword();
  if (!dbPassword) {
    console.error('❌ Error: Database password is required!');
    process.exit(1);
  }

  const client = new Client({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: dbName,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('\n⏳ Connecting to Supabase database...');
    await client.connect();
    console.log('✅ Connected successfully!');

    // 1. Read and execute SQL schema
    console.log('📂 Reading supabase_schema.sql...');
    const sql = await fs.readFile(SQL_PATH, 'utf-8');
    
    console.log('⚡ Executing SQL schema to create tables and RLS policies...');
    await client.query(sql);
    console.log('✅ Tables site_content and leads created successfully!');

    // 2. Read and parse db.json
    console.log('📂 Reading local db.json for seeding...');
    const fileContent = await fs.readFile(DB_PATH, 'utf-8');
    const localDB = JSON.parse(fileContent);

    // 3. Seed site_content table
    console.log('🌱 Seeding site_content table...');
    for (const [key, value] of Object.entries(localDB)) {
      if (key === 'leads') continue; // Seed leads separately
      
      console.log(`   - Seeding section: "${key}"`);
      await client.query(
        'INSERT INTO site_content(key, value) VALUES($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value',
        [key, JSON.stringify(value)]
      );
    }
    console.log('✅ site_content table seeded successfully!');

    // 4. Seed leads table
    if (localDB.leads && Array.isArray(localDB.leads)) {
      console.log(`🌱 Seeding leads table (${localDB.leads.length} records)...`);
      for (const lead of localDB.leads) {
        await client.query(
          `INSERT INTO leads(id, name, email, phone, company, type, message, created_at) 
           VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
           ON CONFLICT (id) DO NOTHING`,
          [
            lead.id,
            lead.name,
            lead.email,
            lead.phone,
            lead.company || '',
            lead.type || 'General Inquiry',
            lead.message,
            lead.date || new Date().toISOString()
          ]
        );
      }
      console.log('✅ leads table seeded successfully!');
    }

    console.log('\n🎉 Supabase Database Setup Completed Successfully!');
  } catch (err) {
    console.error('\n❌ Database Setup Failed:', err.message);
  } finally {
    await client.end();
  }
}

main();
