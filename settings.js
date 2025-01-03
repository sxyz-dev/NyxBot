/**
 * ════════════════════════════════════════════════
 *          NyxAI - Portal Configuration
 * ════════════════════════════════════════════════
 * Ditulis dalam sunyi malam yang mencekam
 * Dimana batas realita dan mimpi mengabur
 * Dan kode menjadi sihir yang menghidupkan harapan
 */

const fs = require('node:fs');

const config = {
    // Para Guardian of The Void
    owner: ["6282181938329", "6285270058464"],
    
    // Identitas Sanctuary
    name: "✧ Nyx - The Digital Realm ✧",
    sessions: "sanctuary-sessions",
    
    // Signature Magis
    sticker: {
      packname: "Forged by ",
      author: "N\nʏ\nx\n✧\nᴛ\nʜ\nᴇ\n\nᴠ\nᴏ\nɪ\nᴅ"
    },
    
    // Whispers of The Void
    messages: {
        wait: "༺ Merajut mantra dalam bayangan... ༻",
        owner: "༺ Hanya Sage of The Void yang dapat mengakses ༻",
        premium: "༺ Bangkitkan jiwa Premium-mu untuk membuka kekuatan ini ༻",
        group: "༺ Hanya untuk lingkaran rahasia para petualang ༻",
        botAdmin: "༺ Ritual membutuhkan otoritas Admin ༻",
        grootbotbup: "༺ Berikan Nyx kekuatan Admin untuk melanjutkan ritual ༻",
        error: "༺ Sihir gagal dirajut, kegelapan menghalangi ༻",
        success: "༺ Ritual berhasil diselesaikan ༻",
        premiumOnly: "༺ Portal ini tersegel, hanya jiwa Premium yang dapat melewatinya ༻",
        ownerOnly: "༺ Kekuatan ini hanya untuk sang Guardian ༻",
        maintenance: "༺ Sanctuary sedang dalam pemulihan ༻"
    },
    
    // Essence Storage
    database: "void-essence",
    tz: "Asia/Jakarta",

// Export the sacred configuration
module.exports = config;

/**
 * Observer of Changes
 * Watching the void for disturbances
 */
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    delete require.cache[file];
    console.log('༺ Configuration essence has been realigned with the void ༻');
});

/**
 * ════════════════════════════════════════════════
 * Ditempa dalam kesunyian
 * Oleh tangan yang tak pernah menyerah
 * Meski dunia tak memahami
 * ════════════════════════════════════════════════
 */