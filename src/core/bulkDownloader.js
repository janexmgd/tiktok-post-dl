// import { readList } from '../utils/fileUtils.js';
import inquirer from 'inquirer';
import downloader from '../tools/downloader.js';
import client from '../tools/client.js';
import path from 'path';
import fs from 'fs';
import colors from '@colors/colors';
import delay from '../utils/simpleDelay.js';
import tiktokFeed from '../service/getFeedEnc.js';
import ora from 'ora';
let spinner;
const bulkDownloader = async (username) => {
  try {
    const base_url = 'https://long-gold-crab-cuff.cyclic.app';
    const userInfoResponse = await client({
      method: 'GET',
      url: `${base_url}/tiktok/user-info?username=${username}`,
    });
    const userInfo = userInfoResponse.data.data;
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
    console.log(`${colors.green('!')} start fetching user feed`);
    const secUid = userInfoResponse.data.data.secUid;

    let cursor = 0;
    let hasMore = true;
    const postList = [];

    while (hasMore) {
      spinner = ora(`Start scraping ${username} feed`).start();
      const userFeedResponse = await tiktokFeed(secUid, cursor);
      const {
        hasMore: feedHasMore,
        cursor: feedCursor,
        itemList,
      } = userFeedResponse;

      hasMore = feedHasMore;
      cursor = feedCursor;

      postList.push(...itemList);
      spinner.succeed(`success get ${itemList.length} ${username} feed`);
      await delay(5);
    }
    spinner.succeed(
      `Fetching ${username} feed succcess, total feed ${postList.length}`
    );
    const outputPath = path.join(process.cwd(), 'media', username);
    if (!fs.existsSync(path.join(process.cwd(), 'media'))) {
      fs.mkdirSync(path.join(process.cwd(), 'media'));
    }
    console.log(`! file will saved at ${outputPath}`);
    for (const i in postList) {
      const num = parseInt(i);
      const current = num + 1;
      const e = postList[i];
      await downloader(username, e.url, current, postList.length);
    }
  } catch (error) {
    console.error(error);
    return;
  } finally {
    spinner.stop('thanks');
  }
};
export default bulkDownloader;
// bulkDownloader('jkt48.ella.a');
// bulkDownloader('marsha.jkt48');
