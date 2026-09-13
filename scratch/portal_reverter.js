const fs = require('fs');

const file = 'c:\\Users\\Dhileep\\Downloads\\esports\\src\\app\\(portal)\\layout.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/#10b981/gi, '#2463FF');
fs.writeFileSync(file, content, 'utf8');

console.log('Updated portal layout.');
