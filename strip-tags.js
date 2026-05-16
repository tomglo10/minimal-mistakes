const fs = require('fs');
const path = require('path');
const postsDir = './_posts';

fs.readdirSync(postsDir).forEach(file => {
    if (path.extname(file) === '.md') {
        const filePath = path.join(postsDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // This regex catches ANY invalid post_url tags and removes them cleanly
        let fixedContent = content.replace(/\{%\s*post_url\s+[^%]*%\}/g, '#');
        
        if (content !== fixedContent) {
            fs.writeFileSync(filePath, fixedContent, 'utf8');
            console.log(`Cleaned ghost tags from: ${file}`);
        }
    }
});
console.log("Scrub complete.");