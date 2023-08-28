import client from './client.js';

const base_urls = [
  'https://api19-normal-c-useast1a.tiktokv.com',
  'https://api19-normal-c-useast2a.tiktokv.com',
  'https://api16-core-c-useast1a.tiktokv.com',
  'https://api16-core-c-useast2a.tiktokv.com',
];
const endpoint = '/aweme/v1/feed/?aweme_id=';
const pattern = /https:\/\/www\.tiktok\.com\/@[^/]+\/video\/(\d+)/;
const content_index = 0;
let current_base_url_index = 0;

const getVideoId = async (url) => {
  const match = url.match(pattern);
  if (match) {
    return match[1];
  } else {
    try {
      const res = await client({
        url: url,
        method: 'GET',
      });
      const redirectMatch = res.request.res.responseUrl.match(pattern);
      if (redirectMatch) {
        return redirectMatch[1];
      }
      return null;
    } catch (error) {
      const match = error.request._currentUrl.match(pattern);
      if (match) {
        return match[1];
      }
      return null;
    }
  }
};

const checkContentType = (data) => {
  if (data.aweme_list[content_index].image_post_info?.images) {
    return ParseSlideshowResult(data);
  } else {
    return ParseVideoResult(data);
  }
};
const ParseSlideshowResult = (data) => {
  return {
    type: 'slideshow',
    owner_name: data.aweme_list[content_index].author.nickname,
    owner_username: data.aweme_list[content_index].author.unique_id,
    avatar: data.aweme_list[content_index].author.avatar_thumb.url_list[0],
    details: {
      video_id: data.aweme_list[content_index].aweme_id,
      images: data.aweme_list[content_index].image_post_info.images.map(
        (image) => (image = image.display_image.url_list[0])
      ),
      audio_url: data.aweme_list[content_index].music.play_url.uri,
      cover: data.aweme_list[content_index].video.cover.url_list[0],
      desc: data.aweme_list[content_index].desc,
      total_comment: data.aweme_list[content_index].statistics.comment_count,
      total_likes: data.aweme_list[content_index].statistics.digg_count,
      total_views: data.aweme_list[content_index].statistics.play_count,
      total_share: data.aweme_list[content_index].statistics.share_count,
    },
  };
};
const ParseVideoResult = (data) => {
  return {
    type: 'video',
    owner_name: data.aweme_list[content_index].author.nickname,
    owner_username: data.aweme_list[content_index].author.unique_id,
    avatar: data.aweme_list[content_index].author.avatar_thumb.url_list[0],
    details: {
      video_id: data.aweme_list[content_index].aweme_id,
      video_url: data.aweme_list[content_index].video.play_addr.url_list[0],
      audio_url: data.aweme_list[content_index].music.play_url.uri,
      cover: data.aweme_list[content_index].video.cover.url_list[0],
      width: data.aweme_list[content_index].video.width,
      height: data.aweme_list[content_index].video.height,
      data_size: data.aweme_list[content_index].video.play_addr.data_size,
      desc: data.aweme_list[content_index].desc,
      total_comment: data.aweme_list[content_index].statistics.comment_count,
      total_likes: data.aweme_list[content_index].statistics.digg_count,
      total_views: data.aweme_list[content_index].statistics.play_count,
      total_share: data.aweme_list[content_index].statistics.share_count,
    },
  };
};
const getTiktokNoWM = async (url, parse, retryCount = 3) => {
  if ((retryCount = 0)) {
    throw new Error('failed to catch data');
  }
  if (typeof url !== 'string') {
    throw new Error('URL must be a string!');
  }
  if (typeof parse !== 'boolean') {
    throw new Error('PARSE must be a boolean!');
  }

  const videoId = await getVideoId(url);
  if (!videoId) {
    throw { status: 'fail', message: 'Video id not found!' };
  } else {
    if (current_base_url_index >= base_urls.length) {
      current_base_url_index = 1;
    }

    try {
      const apiUrl = base_urls[current_base_url_index] + endpoint + videoId;
      const result = await client({
        url: apiUrl,
        method: 'GET',
      });

      if (result.data && result.status === 200) {
        current_base_url_index += 1;

        if (parse) {
          return { status: 'ok', result: checkContentType(result.data) };
        } else {
          return {
            status: 'ok',
            result: result.data.aweme_list[content_index],
          };
        }
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      // throw { status: 'fail', message: 'Failed to fetch data!' };
      console.log('Parser error : Failed to fetch data!');
      getTiktokNoWM(url, true, (retryCount = retryCount - 1));
    }
  }
};
export default getTiktokNoWM;
