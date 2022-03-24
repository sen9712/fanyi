import * as https from 'https';
import md5 =  require('md5');
import * as querystring from 'querystring';
import { appId, appSecret } from './private';

export const translate = (word) => {

  const salt = Math.random()

  
  const sign = md5(appId+word+salt+appSecret)
  

 const query:string  =  querystring.stringify({ 
  q: word, 
  from: 'en',
  to: 'zh',
  appid: appId,
  slat: salt,
  sign: sign
}
 )

const options = {
  hostname: 'api.fanyi.baidu.com',
  port: 443,
  path: '/api/trans/vip/translate?' + query,
  method: 'GET'
};
console.log(options);
console.log(query);

const req = https.request(options, (res) => {
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();
}