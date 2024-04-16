const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
    try {
        const files = [
            './dist/buscador/runtime.js',
            './dist/buscador/polyfills.js',
            './dist/buscador/scripts.js',
            './dist/buscador/main.js',
        ]
        await fs.ensureDir('elements')
        await concat(files, 'elements/buscador.js');
        await fs.copyFile('./dist/buscador/styles.css', 'elements/styles.css')
    } catch (error) {
        console.log("error :>> ", error);
    }
})();