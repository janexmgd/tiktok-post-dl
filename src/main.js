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
      {
        type: 'input',
        name: 'foldername',
        message: 'insert folder name to save your download',
      },
    ]);
    await singleDownloader(input.url, input.foldername);
  } else if (taskNum == 2) {
    const input = await inquirer.prompt([
      {
        type: 'input',
        name: 'username',
        message: 'insert tiktok username',
      },
    ]);
    await bulkDownloader(input.username);
  } else {
    console.log('invalid action lmao');
  }
};
export default main;
