/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

const root = process.cwd();

fs.renameSync(path.join(root, 'dist', 'dsbridge-external.cjs.js'), path.join(root, 'dist', 'dsbridge-external.cjs'));
fs.renameSync(path.join(root, 'dist', 'dsbridge-external.es.js'), path.join(root, 'dist', 'dsbridge-external.mjs'));
