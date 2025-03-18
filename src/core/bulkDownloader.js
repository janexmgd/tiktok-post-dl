import downloader from '../tools/downloader.js';
import path from 'path';
import { checkIsExist } from '../utils/fileUtils.js';
import chalk from 'chalk';
import fs from 'fs';
const bulkDownloader = async (filename) => {
  try {
    const filePath = path.join(process.cwd(), 'list', filename);
    if (!checkIsExist(filePath)) {
      console.log(chalk.italic(`${filePath} not found`));
      return;
    }
    const urls = fs
      .readFileSync(filePath, 'utf-8')
      .replace(/\r/g, '')
      .split('\n');
    for (const [index, url] of urls.entries()) {
      console.log(`Process ${index + 1} / ${urls.length} lines`);
      const response = await fetch('https://saio-api.vercel.app/service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        console.log(
          chalk.red(
            `Failed to fetch service for URL: ${url}, Status: ${response.status}`
          )
        );
        continue;
      }

      const data = await response.json();
      const cookie = data.data.cookie;
      const ttData = data.data;
      await downloader(ttData, cookie);
    }
  } catch (error) {
    console.error(error);
    return;
  }
};
export default bulkDownloader;
