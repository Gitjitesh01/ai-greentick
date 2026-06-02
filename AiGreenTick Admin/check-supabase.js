import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

// Polyfill globalThis.WebSocket for older Node.js versions to bypass realtime-js constructor crash
if (!globalThis.WebSocket) {
  globalThis.WebSocket = class {};
}

dotenv.config();

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('🔗 Connecting to Supabase URL:', url);

if (!url || !key) {
  console.error('❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env file.');
  process.exit(1);
}

const supabase = createClient(url, key);

async function checkTable(name) {
  try {
    const { data, error, status } = await supabase
      .from(name)
      .select('*')
      .limit(1);

    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
        console.error(`❌ Table "${name}" does NOT exist. Status: ${status}. Error:`, error.message);
        return false;
      }
      console.warn(`⚠️ Table "${name}" returned error:`, error.message);
      return false;
    }

    console.log(`✅ Table "${name}" is connected and reachable. Records found:`, data ? data.length : 0);
    return true;
  } catch (err) {
    console.error(`❌ Exception checking table "${name}":`, err.message);
    return false;
  }
}

async function run() {
  console.log('🔍 Checking database schema and table availability...');
  const siteContentOk = await checkTable('site_content');
  const leadsOk = await checkTable('leads');

  if (siteContentOk && leadsOk) {
    console.log('🎉 Verification complete: Both tables are successfully initialized on Supabase!');
  } else {
    console.log('⚠️ Verification incomplete: Some tables are missing or inaccessible. Please run the SQL schema script in your Supabase SQL editor.');
  }
}

run();
