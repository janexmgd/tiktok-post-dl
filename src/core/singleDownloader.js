import downloader from '../tools/downloader.js';
import path from 'path';
import fs from 'fs';
import delay from '../utils/simpleDelay.js';

const singleDownloader = async (url, foldername) => {
  try {
    console.clear();
    const outputPath = path.join(process.cwd(), 'media', foldername);
    if (!fs.existsSync(path.join(process.cwd(), 'media'))) {
      fs.mkdirSync(path.join(process.cwd(), 'media'));
    }
    console.log(`file will saved at ${outputPath}`);
    await downloader(foldername, url, 1, 1);
    console.log(`Success download post from ${url}`);
    await delay(2);
  } catch (error) {
    console.log(error);
  }
};
export default singleDownloader;
