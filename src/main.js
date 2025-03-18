import inquirer from 'inquirer';
import bulkDownloader from './core/bulkDownloader.js';
import singleDownloader from './core/singleDownloader.js';
const main = async (taskNum) => {
  if (taskNum == 1) {
    const input = await inquirer.prompt([
      {
        type: 'input',
        name: 'url',
        message: 'insert tiktok link',
      },
    ]);
    await singleDownloader(input.url);
  } else if (taskNum == 2) {
    const input = await inquirer.prompt([
      {
        type: 'input',
        name: 'filename',
        message: 'insert filename(must at list download)',
      },
    ]);
    await bulkDownloader(input.filename);
  } else {
    console.log('invalid action lmao');
  }
};
export default main;
