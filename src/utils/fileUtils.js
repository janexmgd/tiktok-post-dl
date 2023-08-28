import fs from 'fs/promises';
import fsNonProm from 'fs';
import path from 'path';

const checkFolderExists = async (folderPath) => {
  try {
    console.log(`checking ${folderPath}`);
    await fs.access(folderPath, fs.constants.F_OK);
    console.log(`Folder is already exist: ${folderPath}`);
  } catch (error) {
    // console.error('Folder is not exist ', error);
    await createFolder(folderPath);
  }
};
const createFolder = async (folderPath) => {
  try {
    console.log(`Creating Folder ${folderPath}`);
    await fs.mkdir(folderPath, { recursive: true });
    console.log(`Success creating folder ${folderPath}`);
  } catch (error) {
    console.error('Error when creating folder: ', error);
  }
};
export const readList = async (filename) => {
  const currentDir = process.cwd();
  const filePath = path.join(`${currentDir}`, 'list', `${filename}`);
  const data = await fsNonProm.promises.readFile(filePath, 'utf-8');
  const urlListSplit = data.split('\n');
  const urlList = [];
  for (const url of urlListSplit) {
    try {
      urlList.push(url);
    } catch (error) {
      console.log(error);
    }
  }
  return urlList;
};
export const checkIsDownloaded = (filename, folderName) => {
  try {
    // const currentFilePath = new URL(import.meta.url).pathname;
    const currentDir = process.cwd();
    const filePath = path.join(currentDir, 'media', folderName, filename);
    const checkFile = fsNonProm.existsSync(filePath);
    if (checkFile) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // return;
    console.log(error);
  }
};
export const downloadFile = async (
  data,
  folderName,
  fileName,
  type,
  folderChecking
) => {
  try {
    const currentDir = process.cwd();
    const folderPath = path.join(`${currentDir}`, 'media', `${folderName}`);
    if (folderChecking == true) {
      await checkFolderExists(folderPath);
    } else {
      if (type == 'video') {
        // const isAlready = checkIsDownloaded(`${fileName}.mp4`, folderName);
        // if (isAlready == true) {
        //   console.log(`${fileName}.mp4 is already downloaded`);
        // } else {
        await data.pipe(
          fsNonProm.createWriteStream(`${folderPath}/${fileName}.mp4`)
        );
        console.log(` success download ${fileName}.mp4`);
        // }
      } else {
        // const isAlready = checkIsDownloaded(`${fileName}.png`, folderName);
        // if (isAlready == true) {
        //   console.log(`${fileName}.png is already downloaded`);
        // } else {
        // await data.pipe(
        //   fsNonProm.createWriteStream(`${folderPath}/${fileName}.png`)
        // );
        const writer = fsNonProm.createWriteStream(
          `${folderPath}/${fileName}.png`
        );
        data.pipe(writer);

        await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });
        // console.log(` success download ${fileName}.png`);
        // }
      }
    }
  } catch (error) {
    console.log(error);
    return;
  }
};
