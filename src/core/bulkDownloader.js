// import { readList } from '../utils/fileUtils.js';
import inquirer from 'inquirer';
import downloader from '../tools/downloader.js';
import delay from '../utils/simpleDelay.js';
import client from '../tools/client.js';
import path from 'path';
import fs from 'fs';
const bulkDownloader = async (username) => {
  try {
    // console.log(username);
    // return;
    const res = await client({
      method: 'POST',
      url: 'https://long-gold-crab-cuff.cyclic.app/feed/tiktok',
      data: {
        username: username,
      },
    });
    const data = res?.data?.data;
    if (!data) {
      throw new Error('error when fetching profile');
    }
    const userInfo = {
      username: data.username,
      nickname: data.nickname,
      feedLength: data.feedLength,
    };
    console.log(userInfo);
    const asq = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmation',
        message: 'Does the profile that appears matches your expectations?',
      },
    ]);
    if (asq.confirmation == false) {
      console.log('process stopped by user');
      return;
    }
    const outputPath = path.join(process.cwd(), 'media', username);
    if (!fs.existsSync(path.join(process.cwd(), 'media'))) {
      fs.mkdirSync(path.join(process.cwd(), 'media'));
    }
    console.log(`file will saved at ${outputPath}`);
    const feedList = data.feedList;
    for (const i in feedList) {
      const num = parseInt(i);
      const current = num + 1;
      const e = feedList[i];
      await downloader(username, e.url, current, userInfo.feedLength);
    }
  } catch (error) {
    console.error(error);
    return;
  }
};
export default bulkDownloader;
// bulkDownloader('jkt48.ella.a');
// bulkDownloader('marsha.jkt48');
