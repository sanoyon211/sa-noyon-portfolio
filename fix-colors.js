const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace section backgrounds
  content = content.replace(/bg-\[\#0A0A0A\]/g, 'bg-background');
  content = content.replace(/bg-black/g, 'bg-background');
  
  // Replace text-white with text-foreground, but carefully (only on headers/paragraphs usually)
  // Actually, just removing text-white from <section> tags
  content = content.replace(/<section([^>]*)text-white([^>]*)>/g, '<section$1text-foreground$2>');
  
  // Also some explicit text-white
  content = content.replace(/className="([^"]*)text-white([^"]*)"/g, 'className="$1text-foreground$2"');
  content = content.replace(/className="([^"]*)text-neutral-300([^"]*)"/g, 'className="$1text-muted-foreground$2"');
  
  fs.writeFileSync(filePath, content, 'utf8');
}

console.log('Done!');
