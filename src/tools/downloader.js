import path from 'path';
import client from './client.js';
import getTiktokNoWM from './parserEnc.js';
import fs from 'fs';
import ProgressBar from '../utils/progressBar.js';
import { formatFileSize, formatSpeed } from '../utils/formatter.js';
import ora from 'ora';
const progressBar = new ProgressBar();
const MAX_RETRY = 3;

const parser = async (url) => {
  try {
    const response = await getTiktokNoWM(url, true);
    const data = response.result;
    if (data.type == 'video') {
      const videoUrl = data.details.video_url;
      const videoId = data.details.video_id;
      const username = data.owner_username;
      const datas = {
        username: username,
        id: videoId,
        url: videoUrl,
        type: data.type,
      };

      return datas;
    } else if (data.type == 'slideshow') {
      const datas = {
        username: data.owner_username,
        id: data.details.video_id,
        type: data.type,
        url: data.details.images,
      };
      return datas;
    }
  } catch (error) {
    console.log(error);
  }
};
const downloader = async (foldername, url, currentLength, length) => {
  let retryCount = 0;
  while (retryCount < MAX_RETRY) {
    try {
      const spinner = ora(
        `Downloading ${url} ${currentLength}/${length}`
      ).start();
      let downloadedSize = 0;
      let lastTimestamp = Date.now();
      const data = await parser(url);
      const outputPath = path.join(process.cwd(), 'media', foldername);
      let filePath;
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
      }
      if (data.type == 'video') {
        const filename = `${data.id}.mp4`;
        filePath = path.join(outputPath, `${filename}`);
        if (fs.existsSync(filePath)) {
          spinner.succeed(
            `${filename} already exists ${currentLength}/${length}.`
          );
          return;
        }
        // console.log('\n');
        const response = await client({
          url: data.url,
          method: 'GET',
          responseType: 'stream',
        });
        const totalSize = parseInt(response.headers['content-length'], 10);
        const fileSize = formatFileSize(totalSize);
        spinner.succeed(`Download size: ${fileSize}`);
        progressBar.start(100, {
          filename,
          size: fileSize,
          total: 1,
          bar: { width: 0 },
        });

        const writer = fs.createWriteStream(filePath);

        response.data.on('data', (chunk) => {
          downloadedSize += chunk.length;
          const current = downloadedSize;
          const currentTime = Date.now();
          const timeDiff = currentTime - lastTimestamp;
          const speed = (current / timeDiff) * 1000;

          const percentage = (current / totalSize) * 100;
          progressBar.update(
            percentage,
            formatSpeed(speed),
            currentLength,
            length
          );
        });
        response.data.pipe(writer);
        await new Promise((resolve, reject) => {
          writer.on('finish', () => {
            progressBar.complete();
            spinner.succeed(
              `${filename} successfully downloaded ${currentLength}/${length}`
            );
            resolve();
          });
          writer.on('error', (error) => {
            progressBar.complete();
            spinner.succeed(
              `error when download ${filename}: ${error.message}`
            );
            // reject(error);
            throw new Error(error);
          });
        });
      } else if (data.type == 'slideshow') {
        for (let index = 0; index < data.url.length; index++) {
          const filename = `${data.id}_${index + 1}.png`;
          filePath = path.join(outputPath, `${filename}`);
          if (fs.existsSync(filePath)) {
            spinner.succeed(`${filename} already exists.`);
            continue;
          }
          const response = await client({
            url: data.url[index],
            method: 'GET',
            responseType: 'stream',
          });
          const totalSize = parseInt(response.headers['content-length'], 10);
          const fileSize = formatFileSize(totalSize);
          spinner.succeed(`Download size: ${fileSize}`);

          progressBar.start(totalSize, {
            filename,
            size: fileSize,
            total: 1,
            bar: { width: 0 },
          });

          const writer = fs.createWriteStream(filePath);

          response.data.on('data', (chunk) => {
            downloadedSize += chunk.length;
            const current = downloadedSize;
            const currentTime = Date.now();
            const timeDiff = currentTime - lastTimestamp;
            const speed = (current / timeDiff) * 1000;

            const percentage = (current / totalSize) * 100;
            progressBar.update(percentage, { speed: formatSpeed(speed) });
          });

          await new Promise((resolve, reject) => {
            response.data.pipe(writer);
            writer.on('finish', () => {
              progressBar.complete();
              spinner.succeed(`${filename} successfully downloaded`);
              resolve();
            });
            writer.on('error', (error) => {
              progressBar.complete();
              spinner.fail();
              // console.error(
              //   `Error when downloading ${filename}: ${error.message}`
              // );
              throw new Error(error);
            });
          });
        }
      } else {
        throw new Error('cant get data');
      }
      break;
    } catch (error) {
      console.error(`Error during download: ${error.message}`);
      retryCount++;

      if (retryCount < MAX_RETRY) {
        console.log(`Retrying download (${retryCount} of ${MAX_RETRY})...`);
      } else {
        console.log(`Maximum retries reached. Download failed.`);
        break; // Keluar dari loop while jika sudah mencapai batas retry
      }
    }
  }
};
// console.clear();
// down('https://www.tiktok.com/@marsha.jkt48/video/7267214827645422853');
export default downloader;
