const fs = require('node:fs');
const babel = require('./vendors/babel.min.js');
const { exec } = require('child_process');


const sourceFile = './src/App.jsx';

const content = fs.readFileSync(sourceFile, { type: ''});

// console.log({content})
const result = babel.transform(content, {
    presets: ['react', 'es2017']
})

fs.writeFileSync('app.build.js', result.code);


function execute(command) {
    exec(command, (err, stdout, stderr) => {
        if (err) {
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
}

function uglifyJs(inputPath, outputPath) {
    execute(`uglifyjs --compress --mangle -- ${inputPath} > ${outputPath}`);
}

function minify(inputPath, outputPath) {
    execute(`minify ${inputPath} > ${outputPath}`);

}

uglifyJs('vendors/react-with-dom.js', 'vendors/react-with-dom.min.js');
uglifyJs('app.build.js', 'app.build.min.js');
// minify('styles.css', 'styles.min.css');

const cssContent = fs.readFileSync('styles.css', {encoding:'utf-8'});
const htmlContent = fs.readFileSync('template.html', {encoding:'utf-8'});
fs.writeFileSync('index.tmp.html', htmlContent.replace('<!--style>%STYLE%</style>-->', `<style>${cssContent}</style>`));

minify('index.tmp.html', 'index.html');
