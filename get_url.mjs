import https from 'https';
https.get('https://postimg.cc/G9Jrh9gn', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/https:\/\/i\.postimg\.cc\/[^\"]+/);
    console.log(match ? match[0] : 'not found');
  });
});
