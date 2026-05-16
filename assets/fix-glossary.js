const fs = require('fs');

const filePath = './_data/glossary.yml';
const content = fs.readFileSync(filePath, 'utf8');

// This logic assumes your file might be missing the dashes
// or has inconsistent spacing.
const lines = content.split('\n');
let fixedContent = "";

lines.forEach(line => {
    let trimmed = line.trim();
    if (trimmed.startsWith('term:')) {
        // Add the mandatory dash and space for the start of a list item
        fixedContent += `- ${trimmed}\n`;
    } else if (trimmed !== "") {
        // Indent sub-properties by two spaces
        fixedContent += `  ${trimmed}\n`;
    }
});

fs.writeFileSync(filePath, fixedContent);
console.log("Glossary formatting fixed!");
const fs = require('fs');
const filePath = './_data/glossary.yml';

if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let fixedContent = "";

    lines.forEach(line => {
        let trimmed = line.trim();
        if (trimmed.startsWith('term:')) {
            fixedContent += `- ${trimmed}\n`;
        } else if (trimmed !== "" && !trimmed.startsWith('-')) {
            fixedContent += `  ${trimmed}\n`;
        } else {
            fixedContent += `${line}\n`;
        }
    });

    fs.writeFileSync(filePath, fixedContent);
    console.log("Glossary formatting fixed!");
} else {
    console.error("glossary.yml not found in _data folder.");
}