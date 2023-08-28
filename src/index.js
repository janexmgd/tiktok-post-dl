import inquirer from 'inquirer';
import main from './main.js';
const runner = async () => {
  console.clear();
  console.log(`
  1. Download single tiktok
  2. Bulk Download tiktok
`);
  const input = await inquirer.prompt([
    {
      type: 'input',
      name: 'taskNum',
      message: 'What do you want',
    },
  ]);
  main(input.taskNum);
};
export default runner;
