import { inc } from './c.js';
console.log('a');

await new Promise((resolve) => setTimeout(resolve, 5000));
inc();
