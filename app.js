const https = require('https');

https.get('https://postimg.cc/DJMD3psQ', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/<a href="(https:\/\/i\.postimg\.cc\/[^"]+)" id="download"/);
    if (match) console.log(match[1]);
    else console.log('not found');
  });
}).on('error', (err) => {
  console.error(err);
});
