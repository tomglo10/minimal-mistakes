const fs = require('fs');
const path = require('path');

const postsDir = './_posts';

if (!fs.existsSync(postsDir)) {
    console.error("Error: _posts folder not found.");
    process.exit(1);
}

console.log("Starting automatic link repair across library...");
console.log("------------------------------------------------");

let filesRepaired = 0;
let totalLinksFixed = 0;

fs.readdirSync(postsDir).forEach(file => {
    if (path.extname(file) === '.md') {
        const filePath = path.join(postsDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Matches markdown links pointing directly to an internal .md file
        // Example: [text](2024-01-17-watchman-device.md)
        const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+\.md)\)/g;

        let match;
        while ((match = markdownLinkRegex.exec(content)) !== null) {
            const originalLinkText = match[0];
            const linkText = match[1];
            const targetFile = match[2];

            // Strip the directory path if it exists, and strip the extension
            const baseFileName = path.basename(targetFile, '.md');

            // Generate the correct native Jekyll link format
            const jekyllLink = `[${linkText}]({% post_url ${baseFileName} %})`;
            
            content = content.replace(originalLinkText, jekyllLink);
            modified = true;
            totalLinksFixed++;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Fixed links in: ${file}`);
            filesRepaired++;
        }
    }
});

console.log("------------------------------------------------");
console.log(`Repair complete. Fixed ${totalLinksFixed} links across ${filesRepaired} files.`);