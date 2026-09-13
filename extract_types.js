const fs = require('fs');
const path = require('path');

const outputTxt = 'C:/Users/Dhileep/.gemini/antigravity-ide/brain/adcbab94-0a30-4131-8275-8ef65876fd28/.system_generated/steps/110/output.txt';
const dbTypesDest = path.join('c:/Users/Dhileep/Downloads/esports/src/types', 'database.ts');

const data = JSON.parse(fs.readFileSync(outputTxt, 'utf8'));
if (data && data.types) {
    if (!fs.existsSync(path.dirname(dbTypesDest))) {
        fs.mkdirSync(path.dirname(dbTypesDest), { recursive: true });
    }
    fs.writeFileSync(dbTypesDest, data.types, 'utf8');
    console.log('Types written successfully to ' + dbTypesDest);
} else {
    console.error('Failed to find types in output');
}
