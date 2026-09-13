const fs = require('fs');
const path = require('path');

console.log("----------------------------------------");
console.log("ANTIGRAVITY CLEANUP SCRIPT RUNNING...");
console.log("Fixing duplicate Next.js routes...");

const pathsToDelete = [
  path.join(__dirname, 'src', 'app', 'home'),
  path.join(__dirname, 'src', 'app', 'profile'),
  path.join(__dirname, 'src', 'app', 'team'),
  path.join(__dirname, 'src', 'app', 'invite'),
  path.join(__dirname, '.next'),
  path.join(__dirname, 'src', 'app', '(portal)', 'homepage.tsx'),
  path.join(__dirname, 'src', 'app', '(portal)', 'profilepage.tsx'),
  path.join(__dirname, 'src', 'app', '(portal)', 'teampage.tsx')
];

pathsToDelete.forEach(p => {
  if (fs.existsSync(p)) {
    try {
      fs.rmSync(p, { recursive: true, force: true });
      console.log(`✅ Successfully deleted duplicate/broken route: ${p}`);
    } catch (e) {
      console.log(`❌ Failed to delete ${p}: ${e.message}`);
    }
  }
});

console.log("Cleanup complete! Starting Next.js...");
console.log("----------------------------------------");
