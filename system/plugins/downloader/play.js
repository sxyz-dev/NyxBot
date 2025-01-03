const yts = require('yt-search');
const axios = require('axios');

module.exports = {
    command: "play",
    alias: ["musik"],
    category: ["downloader"],
    settings: { limit: true },
    loading: true,
    async run(m, { sock, text }) {
        if (!text) {
            return m.reply("Masukkan nama lagu yang ingin diputar.");
        }
        try {
            let search = await yts(text);
            let data = search.videos[0];  // Ambil video pertama dari hasil pencarian
            let dlLink = await SaveTube.dl(data.url, "4", "audio");

            let caption = `
*NyxAI Music Player*
────────────────────
• *Judul      :* ${data.title}
• *Durasi     :* ${data.timestamp}
• *Views      :* ${data.views.toLocaleString()} kali
• *Upload     :* ${data.ago}
• *Channel    :* ${data.author.name}
• *Link       :* ${data.url}
────────────────────
NyxAI—Dibangun dengan tekad dalam kesendirian.
`;

            // Kirim caption terlebih dahulu
            await m.reply({
                text: caption,
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        title: `NyxAI Music Player`,
                        mediaType: 1,
                        previewType: 1,
                        body: `Hello ${m.pushName}, selamat menikmati musik.`,
                        thumbnailUrl: data.thumbnail,
                        renderLargerThumbnail: true,
                        mediaUrl: data.url,
                        sourceUrl: data.url,
                    }
                }
            });

            // Kirim audio setelah caption
            await m.reply({
                audio: { url: dlLink.link },
                mimetype: 'audio/mpeg',
                ptt: false
            });

        } catch (error) {
            console.error(error);
            m.reply("Maaf, terjadi kesalahan saat memproses permintaanmu.");
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
        const headers = {
            ...this.headers,
            'authority': `cdn${cdn}.savetube.su`
        };

        try {
            const response = await axios.post(url, body, { headers });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    
    dLink(cdnUrl, type, quality, videoKey) {
        return `https://${cdnUrl}/download`;
    },
    
    async dl(link, qualityIndex, typeIndex) {
        const type = typeIndex
        const quality = SaveTube.qualities[type][qualityIndex];
        if (!type) throw new Error('❌ Tipe tidak valid. Pilih 1 untuk audio atau 2 untuk video.');
        SaveTube.checkQuality(type, qualityIndex);
        const cdnNumber = SaveTube.cdn();
        const cdnUrl = `cdn${cdnNumber}.savetube.su`;
        
        const videoInfo = await SaveTube.fetchData(`https://${cdnUrl}/info`, cdnNumber, { url: link });
        const badi = {
            downloadType: type,
            quality: quality,
            key: videoInfo.data.key
        };

        const dlRes = await SaveTube.fetchData(SaveTube.dLink(cdnUrl, type, quality, videoInfo.data.key), cdnNumber, badi);

        return {
            link: dlRes.data.downloadUrl,
            duration: videoInfo.data.duration,
            durationLabel: videoInfo.data.durationLabel,
            fromCache: videoInfo.data.fromCache,
            id: videoInfo.data.id,
            key: videoInfo.data.key,
            thumbnail: videoInfo.data.thumbnail,
            thumbnail_formats: videoInfo.data.thumbnail_formats,
            title: videoInfo.data.title,
            titleSlug: videoInfo.data.titleSlug,
            videoUrl: videoInfo.data.url,
            quality,
            type
        };
    }
};