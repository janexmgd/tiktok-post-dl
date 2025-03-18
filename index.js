import runner from './src/index.js';

(async () => {
  process.stdout.write('\x1Bc');
  await runner();
})();
