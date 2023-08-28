<a name="readme-top"></a>
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center"><font size="6">tiktok-post-dl</font></h1>

  <p align="center">
  An javascript project to download media from a post in tiktok
    <br />
    <a href="https://github.com/janexmgd/tiktok-post-dl"><strong>Explore the docs »</strong></a>
  </p>
</div>
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li>
      <a href="#how-to-run">How to run</a>
    </li>
    <li><a href="#get-all-post-url-from-profile">Get all post url from profile</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![About](docs/about.png)

This project is about developing tools for downloading media from tiktok post using Node.js. This tool is designed to provide an efficient solution for downloading a large number of files at once.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

### Getting Started

1. Make sure you have the latest Node.js installed. (I'm using node js 19.9.0)
2. Clone this repository to your machine.
3. Install the dependencies

- npm
  ```sh
  npm install
  ```
  <p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- How to run -->

### How To Run

1.start the project locally

```sh
 npm start
```

2.follow instructions

<!-- Get all post url from profile -->

### Get all post url from profile

thx to thread at https://stackoverflow.com/questions/59690743/scraping-all-videos-from-a-tiktok-profile

You can see at <a href='./docs/tutorGetAllVideos.txt'>version txt</a>

1. Open the target tiktok profile
2. Open console menu at your broswer(Iam using brave broswer at Xubuntu) and copy this code

```js
let goToBottom = setInterval(() => window.scrollBy(0, 400), 1000);
```

3. Wait until scrool done, after scrool done copy this code to the console like step 2

```js
clearInterval(goToBottom);
let arrayVideos = [];
console.log('\n'.repeat(50));
const containers = document.querySelectorAll('[class*="-DivItemContainerV2"]');
for (const container of containers) {
  const link = container.querySelector('[data-e2e="user-post-item"] a');
  const title = container.querySelector('[data-e2e="user-post-item-desc"] a');
  if (link.href === 'https://www.tiktok.com/') {
    link.href = window.location.href;
  }
  arrayVideos.push(link.href);
  console.log(link.href);
}
```

4. after this copy this code, edit the video_links.txt to change filename

```js
let videoLinks = arrayVideos.filter((link) => link.includes('/video'));

let formattedData = videoLinks.join('\n');

let blob = new Blob([formattedData], { type: 'text/plain' });
let elem = window.document.createElement('a');
elem.href = window.URL.createObjectURL(blob);
elem.download = 'video_links.txt';
document.body.appendChild(elem);
elem.click();
document.body.removeChild(elem);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- NOTES -->

### Notes

im run at ubuntu 22.04 jammy, im dont test at windows lmao

put your list at currentfilepath/list

The file downloaded will saved at currentfilepath/media/yourfoldername

<br>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
