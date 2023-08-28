import { readList } from '../utils/fileUtils.js';
import downloader from '../tools/downloader.js';
import delay from '../utils/simpleDelay.js';
import path from 'path';
import fs from 'fs';
const bulkDownloader = async (filename, foldername) => {
  try {
    console.clear();
    const outputPath = path.join(process.cwd(), 'media', foldername);
    if (!fs.existsSync(path.join(process.cwd(), 'media'))) {
      fs.mkdirSync(path.join(process.cwd(), 'media'));
    }
    console.log(`file will saved at ${outputPath}`);
    await delay(3);
    console.clear();
    const urlArray = await readList(filename);
    for (let index = 0; index < urlArray.length; index++) {
      let url;
      url = urlArray[index];
      await downloader(foldername, url, index + 1, urlArray.length);
    }
    await delay(3);
    console.log(`Success download post from ${urlArray.length} url`);
    console.clear();
  } catch (error) {
    console.error(error);
  }
};
export default bulkDownloader;
