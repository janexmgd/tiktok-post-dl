function _0x315a(_0xc4e352,_0x2d1e2d){const _0x486f15=_0x486f();return _0x315a=function(_0x315a2a,_0x3a5f7f){_0x315a2a=_0x315a2a-0xda;let _0x13907e=_0x486f15[_0x315a2a];return _0x13907e;},_0x315a(_0xc4e352,_0x2d1e2d);}function _0x486f(){const _0x4fd484=['digg_count','https://api19-normal-c-useast1a.tiktokv.com','desc','162IlmcSP','video','statistics','images','share_count','168HLBwjL','music','cover','log','height','GET','map','status','match','play_url','slideshow','string','play_addr','684920qtCjFG','aweme_list','PARSE\x20must\x20be\x20a\x20boolean!','Video\x20id\x20not\x20found!','failed\x20to\x20catch\x20data','119155uEoSEl','play_count','avatar_thumb','1782441htjiwb','212086rtDzWk','author','https://api19-normal-c-useast2a.tiktokv.com','data_size','responseUrl','https://api16-core-c-useast1a.tiktokv.com','449738MyywMK','data','request','length','aweme_id','69036InGTrY','comment_count','30kzauqw','image_post_info','uri','5KeIvFe','fail','unique_id','Parser\x20error\x20:\x20Failed\x20to\x20fetch\x20data!','3157PXVlaq','url_list','nickname','2883708yceXyD','Failed\x20to\x20fetch\x20data'];_0x486f=function(){return _0x4fd484;};return _0x486f();}const _0x1d59a2=_0x315a;(function(_0x2c73ba,_0x1b9751){const _0x2e63e0=_0x315a,_0x1eaa34=_0x2c73ba();while(!![]){try{const _0x75a15d=-parseInt(_0x2e63e0(0xe7))/0x1*(parseInt(_0x2e63e0(0xdd))/0x2)+parseInt(_0x2e63e0(0xee))/0x3+-parseInt(_0x2e63e0(0x105))/0x4+-parseInt(_0x2e63e0(0x10a))/0x5*(-parseInt(_0x2e63e0(0xf3))/0x6)+-parseInt(_0x2e63e0(0x10e))/0x7*(parseInt(_0x2e63e0(0xf8))/0x8)+parseInt(_0x2e63e0(0x10d))/0x9*(-parseInt(_0x2e63e0(0xe4))/0xa)+-parseInt(_0x2e63e0(0xeb))/0xb*(-parseInt(_0x2e63e0(0xe2))/0xc);if(_0x75a15d===_0x1b9751)break;else _0x1eaa34['push'](_0x1eaa34['shift']());}catch(_0x19d035){_0x1eaa34['push'](_0x1eaa34['shift']());}}}(_0x486f,0xb22cc));import _0x2d6632 from'./client.js';const base_urls=[_0x1d59a2(0xf1),_0x1d59a2(0x110),_0x1d59a2(0xdc),'https://api16-core-c-useast2a.tiktokv.com'],endpoint='/aweme/v1/feed/?aweme_id=',pattern=/https:\/\/www\.tiktok\.com\/@[^/]+\/video\/(\d+)/,content_index=0x0;let current_base_url_index=0x0;const getVideoId=async _0x5601f0=>{const _0xb19abc=_0x1d59a2,_0x173d33=_0x5601f0['match'](pattern);if(_0x173d33)return _0x173d33[0x1];else try{const _0x1d2389=await _0x2d6632({'url':_0x5601f0,'method':'GET'}),_0x5d2720=_0x1d2389['request']['res'][_0xb19abc(0xdb)][_0xb19abc(0x100)](pattern);if(_0x5d2720)return _0x5d2720[0x1];return null;}catch(_0x2111fe){const _0x381140=_0x2111fe[_0xb19abc(0xdf)]['_currentUrl']['match'](pattern);if(_0x381140)return _0x381140[0x1];return null;}},checkContentType=_0x169b43=>{const _0x4a6d5f=_0x1d59a2;return _0x169b43[_0x4a6d5f(0x106)][content_index][_0x4a6d5f(0xe5)]?.[_0x4a6d5f(0xf6)]?ParseSlideshowResult(_0x169b43):ParseVideoResult(_0x169b43);},ParseSlideshowResult=_0x4d9c7b=>{const _0x15bb13=_0x1d59a2;return{'type':_0x15bb13(0x102),'owner_name':_0x4d9c7b['aweme_list'][content_index]['author'][_0x15bb13(0xed)],'owner_username':_0x4d9c7b['aweme_list'][content_index]['author'][_0x15bb13(0xe9)],'avatar':_0x4d9c7b[_0x15bb13(0x106)][content_index][_0x15bb13(0x10f)][_0x15bb13(0x10c)][_0x15bb13(0xec)][0x0],'details':{'video_id':_0x4d9c7b[_0x15bb13(0x106)][content_index][_0x15bb13(0xe1)],'images':_0x4d9c7b[_0x15bb13(0x106)][content_index]['image_post_info'][_0x15bb13(0xf6)][_0x15bb13(0xfe)](_0x18e66b=>_0x18e66b=_0x18e66b['display_image'][_0x15bb13(0xec)][0x0]),'audio_url':_0x4d9c7b['aweme_list'][content_index][_0x15bb13(0xf9)][_0x15bb13(0x101)][_0x15bb13(0xe6)],'cover':_0x4d9c7b[_0x15bb13(0x106)][content_index][_0x15bb13(0xf4)][_0x15bb13(0xfa)][_0x15bb13(0xec)][0x0],'desc':_0x4d9c7b[_0x15bb13(0x106)][content_index]['desc'],'total_comment':_0x4d9c7b[_0x15bb13(0x106)][content_index][_0x15bb13(0xf5)][_0x15bb13(0xe3)],'total_likes':_0x4d9c7b[_0x15bb13(0x106)][content_index][_0x15bb13(0xf5)]['digg_count'],'total_views':_0x4d9c7b['aweme_list'][content_index]['statistics'][_0x15bb13(0x10b)],'total_share':_0x4d9c7b[_0x15bb13(0x106)][content_index][_0x15bb13(0xf5)][_0x15bb13(0xf7)]}};},ParseVideoResult=_0x6f2dcf=>{const _0x5b5545=_0x1d59a2;return{'type':'video','owner_name':_0x6f2dcf[_0x5b5545(0x106)][content_index][_0x5b5545(0x10f)]['nickname'],'owner_username':_0x6f2dcf['aweme_list'][content_index]['author']['unique_id'],'avatar':_0x6f2dcf[_0x5b5545(0x106)][content_index][_0x5b5545(0x10f)][_0x5b5545(0x10c)]['url_list'][0x0],'details':{'video_id':_0x6f2dcf['aweme_list'][content_index][_0x5b5545(0xe1)],'video_url':_0x6f2dcf[_0x5b5545(0x106)][content_index][_0x5b5545(0xf4)][_0x5b5545(0x104)][_0x5b5545(0xec)][0x0],'audio_url':_0x6f2dcf['aweme_list'][content_index][_0x5b5545(0xf9)]['play_url'][_0x5b5545(0xe6)],'cover':_0x6f2dcf[_0x5b5545(0x106)][content_index][_0x5b5545(0xf4)][_0x5b5545(0xfa)][_0x5b5545(0xec)][0x0],'width':_0x6f2dcf[_0x5b5545(0x106)][content_index]['video']['width'],'height':_0x6f2dcf['aweme_list'][content_index][_0x5b5545(0xf4)][_0x5b5545(0xfc)],'data_size':_0x6f2dcf['aweme_list'][content_index][_0x5b5545(0xf4)][_0x5b5545(0x104)][_0x5b5545(0xda)],'desc':_0x6f2dcf[_0x5b5545(0x106)][content_index][_0x5b5545(0xf2)],'total_comment':_0x6f2dcf[_0x5b5545(0x106)][content_index][_0x5b5545(0xf5)][_0x5b5545(0xe3)],'total_likes':_0x6f2dcf['aweme_list'][content_index]['statistics'][_0x5b5545(0xf0)],'total_views':_0x6f2dcf['aweme_list'][content_index][_0x5b5545(0xf5)][_0x5b5545(0x10b)],'total_share':_0x6f2dcf[_0x5b5545(0x106)][content_index][_0x5b5545(0xf5)][_0x5b5545(0xf7)]}};},getTiktokNoWM=async(_0xcf4d31,_0x3ee2f2,_0x5611df=0x3)=>{const _0x41c88d=_0x1d59a2;if(_0x5611df=0x0)throw new Error(_0x41c88d(0x109));if(typeof _0xcf4d31!==_0x41c88d(0x103))throw new Error('URL\x20must\x20be\x20a\x20string!');if(typeof _0x3ee2f2!=='boolean')throw new Error(_0x41c88d(0x107));const _0x300f72=await getVideoId(_0xcf4d31);if(!_0x300f72)throw{'status':_0x41c88d(0xe8),'message':_0x41c88d(0x108)};else{current_base_url_index>=base_urls[_0x41c88d(0xe0)]&&(current_base_url_index=0x1);try{const _0x39d344=base_urls[current_base_url_index]+endpoint+_0x300f72,_0x52a55e=await _0x2d6632({'url':_0x39d344,'method':_0x41c88d(0xfd)});if(_0x52a55e[_0x41c88d(0xde)]&&_0x52a55e[_0x41c88d(0xff)]===0xc8)return current_base_url_index+=0x1,_0x3ee2f2?{'status':'ok','result':checkContentType(_0x52a55e['data'])}:{'status':'ok','result':_0x52a55e[_0x41c88d(0xde)][_0x41c88d(0x106)][content_index]};else throw new Error(_0x41c88d(0xef));}catch(_0xfc91dc){console[_0x41c88d(0xfb)](_0x41c88d(0xea)),getTiktokNoWM(_0xcf4d31,!![],_0x5611df=_0x5611df-0x1);}}};export default getTiktokNoWM;