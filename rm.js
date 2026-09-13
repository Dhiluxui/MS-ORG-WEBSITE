const fs = require('fs');
const path = require('path');

const folders = ['home', 'profile', 'team'];

folders.forEach(folder => {
  const dir = path.join(__dirname, 'src/app', folder);
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log('Deleted ' + dir);
  }
});
