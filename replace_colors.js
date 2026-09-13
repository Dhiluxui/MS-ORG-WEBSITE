const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.md')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(srcDir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    content = content.replace(/st-green/g, 'ms-blue');
    content = content.replace(/st-yellow/g, 'ms-white');
    content = content.replace(/st-red/g, 'ms-blue');
    content = content.replace(/st-orange/g, 'ms-white');
    content = content.replace(/st-gold/g, 'ms-white');
    
    // Also replace standard tailwind colors that might be used
    content = content.replace(/text-green-400/g, 'text-ms-blue');
    content = content.replace(/bg-green-400\/10/g, 'bg-ms-blue-dim');
    content = content.replace(/border-green-400\/20/g, 'border-ms-blue/20');
    
    content = content.replace(/text-red-400/g, 'text-ms-blue');
    content = content.replace(/bg-red-400\/10/g, 'bg-ms-blue-dim');
    content = content.replace(/border-red-400\/20/g, 'border-ms-blue/20');
    
    content = content.replace(/text-yellow-400/g, 'text-ms-white');
    content = content.replace(/bg-yellow-400\/10/g, 'bg-ms-white-10');
    content = content.replace(/border-yellow-400\/20/g, 'border-ms-white-30');
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});

const twConfigPath = path.join(__dirname, 'tailwind.config.ts');
if (fs.existsSync(twConfigPath)) {
    let tw = fs.readFileSync(twConfigPath, 'utf8');
    tw = tw.replace(/ *'st-green': '.*',\n/g, '');
    tw = tw.replace(/ *'st-yellow': '.*',\n/g, '');
    tw = tw.replace(/ *'st-red': '.*',\n/g, '');
    tw = tw.replace(/ *'st-orange': '.*',\n/g, '');
    tw = tw.replace(/ *'st-gold': '.*',\n/g, '');
    fs.writeFileSync(twConfigPath, tw, 'utf8');
    console.log(`Updated tailwind.config.ts`);
}
