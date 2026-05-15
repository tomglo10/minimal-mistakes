const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '_posts');

function fixImages() {
  const files = fs.readdirSync(POSTS_DIR);
  
  files.forEach(file => {
    if (file.endsWith('.md')) {
      const filePath = path.join(POSTS_DIR, file);
      let content = fs.readFileSync(filePath, 'utf8');

      // 1. Standardizes folder to /assets/images/
      content = content.replace(/\/assets\/img\//g, '/assets/images/');

      // 2. Ensures images use the Liquid relative_url filter
      // This turns ![alt](/path/to/img.jpg) into ![alt]({{ '/path/to/img.jpg' | relative_url }})
      content = content.replace(/!\[(.*?)\]\(\/(.*?)\)/g, "![$1]({{ '/$2' | relative_url }})");

      fs.writeFileSync(filePath, content);
    }
  });
  console.log("✅ All image paths standardized to /assets/images/ with relative_url filters.");
}

fixImages();
