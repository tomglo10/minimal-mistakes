const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '_posts');

function repairFrontMatter() {
  const files = fs.readdirSync(POSTS_DIR);
  let count = 0;

  files.forEach(file => {
    if (file.endsWith('.md')) {
      const filePath = path.join(POSTS_DIR, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // This regex finds categories: "[Any, Thing]" and turns it into categories: [Any, Thing]
      const fixedContent = content.replace(/categories:\s*"\[(.*?)\]"/g, 'categories: [$1]');
      
      if (content !== fixedContent) {
        fs.writeFileSync(filePath, fixedContent);
        count++;
      }
    }
  });
  console.log(`✅ Repaired categories in ${count} posts.`);
}

repairFrontMatter();