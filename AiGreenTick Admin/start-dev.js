import { spawn } from 'child_process';

console.log('🚀 Starting AI Greentick STANDALONE ADMIN Control Environment...');

// Start the Express backend server (port 5000)
const server = spawn('node', ['server.js'], { 
  stdio: 'inherit', 
  shell: true 
});

// Start the Vite Admin frontend development server (port 4000)
const vite = spawn('npx', ['vite'], { 
  stdio: 'inherit', 
  shell: true 
});

// Terminate both processes on exit
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down Admin development servers...');
  server.kill();
  vite.kill();
  process.exit();
});

process.on('exit', () => {
  server.kill();
  vite.kill();
});
