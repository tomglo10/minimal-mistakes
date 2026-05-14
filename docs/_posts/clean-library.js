const fs = require('fs');
const path = require('path');

// Target your Jekyll _posts directory
const POSTS_DIR = path.join(__dirname, '_posts');

// Regex to extract the title from the Jekyll front matter
const TITLE_REGEX = /^title:\s*["']?(.*?)["']?\s*$/m;

function auditLibrary() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`Error: Could not find directory at ${POSTS_DIR}`);
    return;
  }

  const files = fs.readdirSync(POSTS_DIR).filter(file => 
    file.endsWith('.md') || file.endsWith('.markdown') || file.endsWith('.html')
  );
  
  const titleMap = new Map();
  const duplicates = [];

  console.log(`--- Scanning ${files.length} files for duplicates ---\n`);

  files.forEach(file => {
    const fullPath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const match = content.match(TITLE_REGEX);

    if (match) {
      // Normalize the title to catch case-sensitive or spacing duplicates
      const title = match[1].toLowerCase().trim();
      
      if (titleMap.has(title)) {
        duplicates.push({
          title: title,
          firstSeen: titleMap.get(title),
          duplicate: file
        });
      } else {
        titleMap.set(title, file);
      }
    }
  });

  if (duplicates.length === 0) {
    console.log("✅ Success: No duplicate titles found.");
  } else {
    console.log(`⚠️ Found ${duplicates.length} duplicate entries:\n`);
    duplicates.forEach((dup, i) => {
      console.log(`${i + 1}. Title: "${dup.title}"`);
      console.log(`   Keep:   ${dup.firstSeen}`);
      console.log(`   Remove: ${dup.duplicate}\n`);
    });
    console.log("Action Required: Manually verify and delete the 'Remove' files in VS Code.");
  }
}

auditLibrary();
