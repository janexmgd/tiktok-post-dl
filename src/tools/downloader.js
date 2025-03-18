import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { checkIsExist } from '../utils/fileUtils.js';

const shortenFileName = (filename) =>
  filename.length > 9 ? `${filename.substring(0, 9)}***` : filename;

const downloadFile = async (url, filePath, filename, cookie) => {
  const userAgent =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': userAgent,
      cookie: cookie,
    },
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const totalLength = response.headers.get('content-length');
  if (!totalLength) throw new Error('Cannot retrieve content length');

  const writer = fs.createWriteStream(filePath);
  const reader = response.body.getReader();
  let downloadedLength = 0;
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    writer.on('error', (error) => reject(error));
    const pump = async () => {
      try {
        const { done, value } = await reader.read();
        if (done) {
          writer.end();
          process.stdout.write('\n');
          process.stdout.write(
            `${chalk.green('Download complete:')} ${chalk.bold(filename)}\n`
          );
          return resolve();
        }

        downloadedLength += value.length;
        const progress = ((downloadedLength / totalLength) * 100).toFixed(2);
        const elapsedTime = (Date.now() - startTime) / 1000;
        const downloadSpeed = (downloadedLength / elapsedTime / 1024).toFixed(
          2
        );
        process.stdout.write(
          `\r${chalk.blue('Downloading')} ${chalk.bold(
            shortenFileName(filename)
          )}: ${chalk.yellow(progress + '%')} | ${chalk.green('Size:')} ${(
            totalLength /
            (1024 * 1024)
          ).toFixed(2)} MB | ${chalk.cyan('Speed:')} ${downloadSpeed} KB/s`
        );

        writer.write(value, pump);
      } catch (error) {
        reject(error);
      }
    };

    pump();
  });
};

export default async (ttData, cookie) => {
  try {
    const baseFolder = path.join(
      process.cwd(),
      'download',
      ttData.content.author.uniqueId
    );
    fs.mkdirSync(baseFolder, { recursive: true });

    if (ttData.type === 'video') {
      const filename = `${ttData.content.author.uniqueId}_${ttData.content.id}.mp4`;
      const filePath = path.join(baseFolder, filename);

      if (checkIsExist(filePath)) {
        console.log(
          `${chalk.italic(shortenFileName(filename))} already ${chalk.green(
            'exists'
          )}`
        );
        return;
      }

      await downloadFile(
        ttData.content.video.playAddr,
        filePath,
        filename,
        cookie
      );
    } else if (ttData.type === 'image') {
      const { images } = ttData.content.imagePost;

      for (const [index, image] of images.entries()) {
        const filename = `${ttData.content.author.uniqueId}_${ttData.content.id}_${index}.jpeg`;
        const filePath = path.join(baseFolder, filename);

        if (checkIsExist(filePath)) {
          console.log(
            `${chalk.italic(shortenFileName(filename))} already ${chalk.green(
              'exists'
            )}`
          );
          continue;
        }

        await downloadFile(
          image.imageURL.urlList[0],
          filePath,
          filename,
          cookie
        );
      }
    }
  } catch (error) {
    console.error(`${chalk.red('Download failed:')} ${error.message}`);
  }
};
