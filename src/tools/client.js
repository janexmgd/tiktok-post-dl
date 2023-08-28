import axios from 'axios';

const client = axios.create({
  headers: {
    Connection: 'keep-alive',
    'Keep-Alive': '300',
    'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
    'Accept-Language': 'en-us,en;q=0.5',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36',
  },
});
export default client;
