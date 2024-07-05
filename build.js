const fs = require('node:fs');
const babel = require('./vendors/babel.min');
const sourceFile = './src/App.jsx';
const content = fs.readFileSync(sourceFile, { type: ''});

console.log({content})
const result = babel.transform(content, {
    presets: ['react', 'es2017']
})

fs.writeFileSync('app.build.js', result.code);

