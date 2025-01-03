const crypto = require('crypto');

const nglSpam = async (username, message, spamCount) => {
  let counter = 0;
  const results = [];
  
  while (counter < spamCount) {
    try {
      const date = new Date();
      const formattedDate = `${date.getHours()}:${date.getMinutes()}`;
      const deviceId = crypto.randomBytes(21).toString('hex');
      const url = 'https://ngl.link/api/submit';

      const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'Referer': `https://ngl.link/${username}`,
        'Origin': 'https://ngl.link',
      };

      const body = new URLSearchParams({
        username,
        question: message,
        deviceId,
        gameSlug: '',
        referrer: '',
      }).toString();

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body,
      });

      if (response.status !== 200) {
        console.log(`[${formattedDate}] [Err] Ratelimited`);
        await delay(25000);
      } else {
        counter++;
        results.push({ timestamp: formattedDate, message: `Message ${counter} sent` });
        console.log(`[${formattedDate}] [Msg] Sent: ${counter}`);
      }
    } catch (error) {
      console.error(`[Err] ${error.message}`);
      await delay(5000);
    }
  }

  return results;
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));