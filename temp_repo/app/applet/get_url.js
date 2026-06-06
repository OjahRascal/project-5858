import https from 'https';

https.get('https://postimg.cc/9z0npS8X', (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/https:\/\/i\.postimg\.cc\/[^"']+/);
    if (match) {
      console.log(match[0]);
    } else {
      console.log('No direct link found');
    }
  });
}).on('error', err => {
  console.log(err.message);
});
