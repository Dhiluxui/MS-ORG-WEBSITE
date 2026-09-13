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
            if (file.endsWith('page.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const adminDir = path.join(__dirname, 'src', 'app', 'admin');
const filesToProcess = [
    ...walk(path.join(adminDir, 'cms')),
    ...walk(path.join(adminDir, 'settings'))
];

for (const file of filesToProcess) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace solid backgrounds with glassmorphic backgrounds
    content = content.replace(/bg-\[#111\]/g, 'bg-[#0A0A0A]/50 backdrop-blur-md');
    
    // Replace border colors
    content = content.replace(/border-ms-border-dark/g, 'border-[#1C1C1C]');
    
    // Replace old headers (without pulsing dot) to new headers (with pulsing dot)
    const h1Regex = /<h1 className="font-orbitron text-2xl text-ms-white font-bold tracking-widest uppercase(?:\s*flex items-center gap-3)?">(.*?)<\/h1>/gs;
    content = content.replace(h1Regex, (match, inner) => {
        // if inner already has the pulsing dot or it's been processed, skip
        if (inner.includes('animate-pulse')) return match;
        
        return `<div className="flex items-center gap-3">\n          <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></div>\n          <h1 className="font-orbitron font-bold text-2xl tracking-widest uppercase text-ms-white flex items-center gap-3">\n            ${inner.trim()}\n          </h1>\n        </div>`;
    });
    
    // Update header subtitle
    const pRegex = /<p className="text-ms-white-40 tracking-widest mt-1">(.*?)<\/p>/g;
    content = content.replace(pRegex, '<p className="font-jetbrains text-[#10b981] text-xs tracking-[0.2em] mt-1 opacity-80">$1</p>');
    
    // Update old accent colors to emerald (#10b981)
    content = content.replace(/text-ms-blue/g, 'text-[#10b981]');
    content = content.replace(/text-st-green/g, 'text-[#10b981]');
    content = content.replace(/text-st-yellow/g, 'text-[#10b981]');
    content = content.replace(/text-st-red/g, 'text-[#10b981]');
    
    // Save file
    fs.writeFileSync(file, content);
}
console.log('Successfully upgraded ' + filesToProcess.length + ' files to Cyberpunk UI.');
