import https from 'https';

https.get('https://postimg.cc/HJcMM37C', (resp) => {
  let data = '';
  resp.on('data', (chunk) => {
    data += chunk;
  });
  resp.on('end', () => {
    const urls = data.match(/https:\/\/(?:i\.)?postimg\.cc\/[^\"]+/g);
    console.log(Array.from(new Set(urls)));
  });
});
