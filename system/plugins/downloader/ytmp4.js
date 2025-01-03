const axios = require('axios');

module.exports = {
    command: "ytmp4",
    alias: ["ytv"],
    category: ["downloader"],
    settings: { limit: true },
    loading: true,
    async run(m, { config, sock, text, Func }) {
        if (!text) return m.reply("A-anu Itu Tidak Ada Url Nya.");
        if (!Func.isUrl(text)) return m.reply("E-etoo Itu Tidak Url");

        try {
            const data = await SaveTube.dl(text, 5, 'video');
            await sock.sendMessage(m.cht, {
                video: { url: data.link },
                caption: `*${data.title}*\n📦 Ukuran: ${data.quality}p\n⏱ Durasi: ${data.durationLabel}`,
            });
        } catch (e) {
            console.warn(e.message);
            return m.reply(config.messages.maintenance || "Maaf, terjadi kesalahan.");
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
        if (!this.qualities[type] || !this.qualities[type][qualityIndex]) {
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
            console.error("Fetch error:", error.message);
            throw new Error("❌ Gagal mengambil data dari server.");
        }
    },

    dLink(cdnUrl) {
        return `https://${cdnUrl}/download`;
    },

    async dl(link, qualityIndex, type) {
        this.checkQuality(type, qualityIndex);

        const cdnNumber = this.cdn();
        const cdnUrl = `cdn${cdnNumber}.savetube.su`;

        const videoInfo = await this.fetchData(`https://${cdnUrl}/info`, cdnNumber, { url: link });
        const downloadBody = {
            downloadType: type,
            quality: this.qualities[type][qualityIndex],
            key: videoInfo.data.key
        };

        const dlRes = await this.fetchData(this.dLink(cdnUrl), cdnNumber, downloadBody);

        if (!dlRes.data || !dlRes.data.downloadUrl) throw new Error("❌ Gagal mendapatkan URL download.");

        return {
            link: dlRes.data.downloadUrl,
            duration: videoInfo.data.duration,
            durationLabel: videoInfo.data.durationLabel,
            title: videoInfo.data.title,
            quality: this.qualities[type][qualityIndex]
        };
    }
};