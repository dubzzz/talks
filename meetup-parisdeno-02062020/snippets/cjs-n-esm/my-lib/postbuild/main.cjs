const replace = require('replace-in-file');

// Append *.js file extension on all local imports
const options = {
  files: 'build/esm/**/*.js',
  from: [/from '\.(.*)(?<!\.js)'/g, /from "\.(.*)(?<!\.js)"/g],
  to: ["from '.$1.js'", 'from ".$1.js"'],
};
const results = replace.sync(options);
for (const { file, hasChanged } of results) {
  if (hasChanged) {
    console.info(`Extensions added to: ${file}`);
  }
}
