const yaml = require('js-yaml');
const fs = require('fs');

// Load the 400+ terms from your data file
const glossaryData = yaml.load(fs.readFileSync('./_data/glossary.yml', 'utf8'));

// Convert the data into a quick-lookup map
const glossaryMap = {};
glossaryData.forEach(item => {
    glossaryMap[item.term] = `/glossary/#${item.term.toLowerCase().replace(/ /g, '-')}`;
});

const yaml = require('js-yaml');
const fs = require('fs');

// Load the 400+ terms from your data file
const glossaryData = yaml.load(fs.readFileSync('./_data/glossary.yml', 'utf8'));

// Convert the data into a quick-lookup map
const glossaryMap = {};
glossaryData.forEach(item => {
    glossaryMap[item.term] = `/glossary/#${item.term.toLowerCase().replace(/ /g, '-')}`;
});