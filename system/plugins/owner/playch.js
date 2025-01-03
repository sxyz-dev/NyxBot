const yts = require('yt-search');
const axios = require('axios');

module.exports = {
   command: "playch",
   alias: ["chplay"],
   category: ["owner"],
   settings: { owner: true },
   loading: true,
   async run(m, { sock, text, config }) {
      if (!text) return m.reply("Masukkan Nama Lagu Yang Ingin Diputar Dan Dikirim Ke Saluran");

      try {
        await m.reply(config.messages.wait)
         const data = await yts(text);
         const result = data.videos[0];
         const audio = await SaveTube.dl(result.url, "4", "audio");
         const id = "120363368995781332@newsletter";

         await sock.sendMessage(id, {
            audio: { url: audio.link },
            mimetype: "audio/mpeg",
            ptt: true,
            contextInfo: {
               externalAdReply: {
                  showAdAttribution: true,
                  title: `NyxAI Music Player`,
                  mediaType: 1,
                  previewType: 1,
                  body: `H-Hello Do You Like Music?`,
                  thumbnailUrl: result.thumbnail,
                  renderLargerThumbnail: true,
                  mediaUrl: result.url,
                  sourceUrl: result.url
               }
            }
         });
         await m.reply(config.messages.success)
      } catch (e) {
         console.warn(e.message);
      }
   }
};

const SaveTube = {
   qualities: {
      audio: { 1: '32', 2: '64', 3: '128', 4: '192' },
      video: { 1: '144', 2: '240', 3: '360', 4: '480', 5: '720', 6: '1080', 7: '1440', 8: '2160' }
   },

   headers: {
      'accept': '*/*',
      'referer': 'https://ytshorts.savetube.me/',
      'origin': 'https://ytshorts.savetube.me/',
      'user-agent': 'Postify/1.0.0',
      'Content-Type': 'application/json'
   },

   cdn() {
      return Math.floor(Math.random() * 11) + 51;
   },

   checkQuality(type, qualityIndex) {
      if (!(qualityIndex in this.qualities[type])) {
         throw new Error(`❌ Kualitas ${type} tidak valid. Pilih salah satu: ${Object.keys(this.qualities[type]).join(', ')}`);
      }
   },

   async fetchData(url, cdn, body = {}) {
      const headers = { ...this.headers, 'authority': `cdn${cdn}.savetube.su` };
      const response = await axios.post(url, body, { headers });
      return response.data;
   },

   dLink(cdnUrl) {
      return `https://${cdnUrl}/download`;
   },

   async dl(link, qualityIndex, type) {
      const quality = this.qualities[type][qualityIndex];
      if (!type) throw new Error('❌ Tipe tidak valid. Pilih 1 untuk audio atau 2 untuk video.');

      this.checkQuality(type, qualityIndex);
      const cdnNumber = this.cdn();
      const cdnUrl = `cdn${cdnNumber}.savetube.su`;
      const videoInfo = await this.fetchData(`https://${cdnUrl}/info`, cdnNumber, { url: link });

      const dlRes = await this.fetchData(this.dLink(cdnUrl), cdnNumber, {
         downloadType: type,
         quality: quality,
         key: videoInfo.data.key
      });

      return {
         link: dlRes.data.downloadUrl,
         duration: videoInfo.data.duration,
         durationLabel: videoInfo.data.durationLabel,
         fromCache: videoInfo.data.fromCache,
         id: videoInfo.data.id,
         key: videoInfo.data.key,
         thumbnail: videoInfo.data.thumbnail,
         title: videoInfo.data.title,
         videoUrl: videoInfo.data.url,
         quality,
         type
      };
   }
};