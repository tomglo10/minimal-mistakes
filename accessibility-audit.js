const fs = require('fs');
const path = require('path');

const postsDir = './_posts';
const oldDomain = "blogspot.com"; // Your old home

if (!fs.existsSync(postsDir)) {
    console.error("Error: _posts folder not found.");
    process.exit(1);
}

console.log("Starting Full Library Audit (Accessibility + Link Health)...");
console.log("---------------------------------------------------------");

let issuesFound = 0;

fs.readdirSync(postsDir).forEach(file => {
    if (path.extname(file) === '.md') {
        const filePath = path.join(postsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');

        // 1. Check for missing Alt Text
        if (/!\[\]\(/.test(content) || /<img(?![^>]*\balt=)[^>]*>/.test(content)) {
            console.warn(`[!] IMAGE ISSUE: ${file} (Missing descriptions)`);
            issuesFound++;
        }

        // 2. Check for old Blogger links
        if (content.includes(oldDomain)) {
            console.warn(`[!] LINK ISSUE: ${file} (Points to old blogspot domain)`);
            issuesFound++;
        }

        // 3. Check for "Broken" Jekyll local links
        // Looks for links that don't start with http, /, or #
        const localLinkRegex = /\[.*?\]\((?!(http|\/|#)).*?\)/g;
        if (localLinkRegex.test(content)) {
            console.warn(`[!] LINK ISSUE: ${file} (Possible broken local path)`);
            issuesFound++;
        }
    }
});

console.log("---------------------------------------------------------");
console.log(`Audit complete. Found ${issuesFound} issues.`);