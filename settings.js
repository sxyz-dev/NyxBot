const fs = require('node:fs');

const config = {
    owner: ["6282181938329", "6285270058464"],
    name: "Nyx - Ai",
    sessions: "nyx",
    sticker: {
      packname: "Made by ",
      author: "N\nʏ\nx \n- \nᴀ\nɪ"
    },
   messages: {
        wait: "⟢ Processing in the shadows...",
        owner: "⟢ Reserved for the Night Guardian",
        premium: "⟢ Ascend to Premium to unlock these powers",
        group: "⟢ Exclusive to the Circle of Trust",
        botAdmin: "⟢ Authority not granted - Admin access required",
        grootbotbup: "⟢ Grant NyxAI administrative rights to proceed"
    },
   database: "neko-db",
   tz: "Asia/Jakarta"
}

module.exports = config

let file = require.resolve(__filename);
fs.watchFile(file, () => {
   fs.unwatchFile(file);
  delete require.cache[file];
});