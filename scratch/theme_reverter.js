const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const targetDir = 'c:\\Users\\Dhileep\\Downloads\\esports\\src\\app\\admin';
const files = walk(targetDir);
let changedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  content = content.replace(/#10b981/gi, '#2463FF');
  content = content.replace(/#059669/gi, '#1C4FD6'); // Hover state
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
    console.log(`Reverted: ${file}`);
  }
});

console.log(`Complete. Changed ${changedFiles} files.`);
