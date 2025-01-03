module.exports = {
    command: "infoch",
    alias: ["bcch"],
    category: ["owner"],
    settings: { owner: true },
    async run(m, { sock, text }) {
        if (!text) {
            return m.reply("⚠️ *Masukkan pesanmu, Owner! NyxAI siap memproses perintahmu...*");
        }

        try {
            const id = "120363368995781332@newsletter"; // ID channel tujuan
            const caption = `*📢 System Notification:*\n\n${text}`;

            await sock.sendMessage(id, {
                text: caption,
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        title: "🌌 NyxAI System Notification",
                        mediaType: 1,
                        previewType: 1,
                        body: "NyxAI | Version 0.0.1 - Embrace the Void",
                        thumbnailUrl: "https://files.catbox.moe/wpi3bn.jpg",
                        renderLargerThumbnail: true,
                        mediaUrl: "",
                        sourceUrl: ""
                    }
                }
            });

            m.reply("✅ *Pesan berhasil dikirim ke channel!*\n\n💬 *Isi Pesan:* " + text);
        } catch (error) {
            console.error(error);
            m.reply("❌ *Terjadi kesalahan saat mengirim pesan. Silakan coba lagi!*");
        }
    }
}