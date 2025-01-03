module.exports = {
   command: "nglspam",
   alias: ["spamngl"],
   category: ["tools"],
   settings: { limit: true },
   async run(m, { Scraper, text }) {
      let [usn, msg, count] = text.split("|");
      if (!usn && !msg && !counr) {
         return m.reply("Silahkan Masukkan Format Dengan Benar")
      }
      try {
        if (count.length === 30) {
           return m.reply("Maksimal Hanya 30")
        }
         let data = await Scraper.nglspam.nglSpam(usn, msg, count)
         await m.reply("Sukses Melakukan Spam Nihh.. Jangan Di Salah Gunakan Ya Sayang😁")
      }
   }
}