const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');

const fixFiles = () => {
  const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));
  
  for (const file of files) {
    const filePath = path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix buttons and fixed-dark backgrounds
    content = content.replace(/bg-gradient-to-r from-purple([^"]*)text-foreground([^"]*)/g, 'bg-gradient-to-r from-purple$1text-white$2');
    content = content.replace(/bg-transparent text-foreground/g, 'bg-transparent text-white'); // hero-demo border button
    content = content.replace(/bg-purple-600 hover:bg-purple-700 text-foreground/g, 'bg-purple-600 hover:bg-purple-700 text-white');
    content = content.replace(/bg-gradient-to-br from-\[\#000\] to-\[\#1A2428\] text-foreground/g, 'bg-gradient-to-br from-[#000] to-[#1A2428] text-white');
    content = content.replace(/bg-gradient-to-b from-gray-950 via-black to-gray-900 text-foreground/g, 'bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white');
    
    // Also, hero-demo.tsx specifically:
    // It has a hardcoded dark background. 
    // Wait, hero-demo.tsx: `<section className="min-h-screen w-full bg-gradient-to-br from-[#000] to-[#1A2428] text-foreground` -> changed above.
    
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

fixFiles();
console.log("Colors fixed!");
