import inquirer from 'inquirer';
import main from './main.js';
import boxen from 'boxen';
import chalk from 'chalk';
const runner = async () => {
  process.stdout.write('\x1Bc');
  console.log(boxen(chalk.italic('Tiktok-post-dl'), { padding: 1 }));
  const choices = [
    { name: 'Download single tiktok', value: 1 },
    { name: 'Bulk download tiktok', value: 2 },
  ];
  const { input } = await inquirer.prompt({
    type: 'list',
    message: 'select service',
    name: 'input',
    choices,
  });
  // const input = 1;
  main(input);
};
export default runner;
