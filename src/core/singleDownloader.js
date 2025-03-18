import downloader from '../tools/downloader.js';
import chalk from 'chalk';

const singleDownloader = async (url) => {
  try {
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
      return;
    }
    const data = await response.json();
    const cookie = data.data.cookie;
    const ttData = data.data;
    await downloader(ttData, cookie);
  } catch (error) {
    console.log(error);
  }
};
export default singleDownloader;
