const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '_posts');

function fixLayouts() {
  const files = fs.readdirSync(POSTS_DIR);
  let count = 0;

  files.forEach(file => {
    if (file.endsWith('.md')) {
      const filePath = path.join(POSTS_DIR, file);
      let content = fs.readFileSync(filePath, 'utf8');

      // Swaps "layout: post" for "layout: single"
      const fixedContent = content.replace(/layout:\s*post/g, 'layout: single');

      if (content !== fixedContent) {
        fs.writeFileSync(filePath, fixedContent);
        count++;
      }
    }
  });
  console.log(`✅ Success: Fixed layout in ${count} posts.`);
}

fixLayouts();