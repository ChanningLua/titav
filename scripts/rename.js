/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

const root = process.cwd();

fs.renameSync(path.join(root, 'dist', 'titav.cjs.js'), path.join(root, 'dist', 'titav.cjs'));
fs.renameSync(path.join(root, 'dist', 'titav.es.js'), path.join(root, 'dist', 'titav.mjs'));
