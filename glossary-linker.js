const fs = require('fs');
const path = require('path');

// 1. Define your terms and where they should link
const glossary = {
    'GFR': '/glossary/#gfr',
    'Albumin': '/glossary/#albumin',
    'Cystatin C': '/glossary/#cystatin-c',
    'Sarcopenia': '/glossary/#sarcopenia',
    'Muscle Catabolism': '/glossary/#muscle-catabolism'
};

const postsDir = path.join(__dirname, '_posts');

// 2. Process the files
fs.readdirSync(postsDir).forEach(file => {
    if (path.extname(file) === '.md') {
        const filePath = path.join(postsDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        Object.keys(glossary).forEach(term => {
            // Only link the first occurrence to avoid "link fatigue"
            const regex = new RegExp(`\\b(${term})\\b`, 'i'); 
            
            // Check if term exists and isn't already a link
            if (regex.test(content) && !content.includes(`[${term}]`)) {
                content = content.replace(regex, `[$1](${glossary[term]})`);
                modified = true;
                console.log(`Linked "${term}" in ${file}`);
            }
        });

        if (modified) {
            fs.writeFileSync(filePath, content);
        }
    }
});

console.log('Glossary audit complete.');
