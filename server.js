const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const CONFIG_FILE = path.join(__dirname, 'config.properties');
const PARTIALS_DIR = path.join(__dirname, 'public', 'partials');

// Ordered list of partial files that make up the full page.
// To add, remove, or reorder a section — just edit this array.
const PAGE_PARTIALS = [
  'header.html',    // <html>, <head>, opening <body>
  'nav.html',       // top header bar + desktop nav + mobile nav
  'home.html',      // hero banner + Home section
  'about.html',     // About Us section
  'projects.html',  // Our Projects section
  'gallery.html',   // Gallery section
  'site-visit.html',// Site Visit booking form section
  'contact.html',   // Contact section + </main>
  'footer.html',    // footer + scripts + </body></html>
];

// Simple properties file parser
function parseProperties(filePath) {
  const config = {};
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split(/\r?\n/);
      
      lines.forEach(line => {
        const trimmed = line.trim();
        // Ignore empty lines and comments
        if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith(';')) {
          const delimiterIndex = trimmed.indexOf('=');
          if (delimiterIndex > -1) {
            const key = trimmed.substring(0, delimiterIndex).trim();
            const value = trimmed.substring(delimiterIndex + 1).trim();
            config[key] = value;
          }
        }
      });
    } else {
      console.warn(`Configuration file not found at ${filePath}. Using default values.`);
    }
  } catch (error) {
    console.error('Error parsing properties file:', error);
  }
  return config;
}

// Assemble full page HTML by concatenating all partials in order
function buildPage() {
  return PAGE_PARTIALS
    .map(file => {
      const filePath = path.join(PARTIALS_DIR, file);
      try {
        return fs.readFileSync(filePath, 'utf-8');
      } catch (err) {
        console.error(`Could not read partial: ${file}`, err);
        return `<!-- missing partial: ${file} -->`;
      }
    })
    .join('\n');
}

// Read properties
let properties = parseProperties(CONFIG_FILE);

// Watch properties file for changes so it loads dynamically without restarting server
fs.watch(CONFIG_FILE, (eventType) => {
  if (eventType === 'change') {
    console.log('config.properties changed, reloading properties...');
    properties = parseProperties(CONFIG_FILE);
  }
});

// Middleware for JSON
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint to get the config
app.get('/api/config', (req, res) => {
  res.json({
    whatsappNumber: properties['whatsapp.number'] || '+919886126344',
  });
});

// Serve the assembled page for all other routes (client-side routing support)
app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(buildPage());
});

// Start Server
const port = parseInt(properties['port']) || 3000;
app.listen(port, () => {
  console.log(`====================================================`);
  console.log(`  Chandu Real Estate server is running on:`);
  console.log(`  http://localhost:${port}`);
  console.log(`  Page assembled from ${PAGE_PARTIALS.length} partials in public/partials/`);
  console.log(`  WhatsApp redirection target: ${properties['whatsapp.number'] || '+919886126344'}`);
  console.log(`====================================================`);
});
