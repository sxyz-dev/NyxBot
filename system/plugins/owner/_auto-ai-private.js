module.exports = {
   command: "ai-priv",
   alias: ["privateAi"],
   category: ["ai", "owner"],
   settings: { admin: true, limit: true },
   async run(m, { sock, text }) {
      if (!text) {
         return m.reply(`A-Anu Masukkan Input Kamu\n\n> ${m.prefix + m.command} on\n> ${m.prefix + m.command} off`);
      }
      
      const currentAutoAiStatus = db.list().user[m.sender].autoaiV1;

      if (text === "on") {
         if (currentAutoAiStatus) {
            return m.reply("Autoai Sudah Diaktifkan Di Private Chat.");
         }
         db.list().user[m.sender].autoaiV1 = true;
         return m.reply("Sesi AutoAi Chat Anda Sudah Di Mulai Silahkan Mengobrol Di Private");
      } else if (text === "off") {
         if (!currentAutoAiStatus) {
            return m.reply("Autoai Sudah Dimatikan, Chat Otomatis Sudah Tidak Aktif.");
         }
         db.list().user[m.sender].autoaiV1 = false;
         return m.reply("Autoai Berhasil Di Matikan, Chat Otomatis Di Batalkan.");
      } else {
         return m.reply(`Perintah Tidak Dikenal. Gunakan perintah yang valid:\n> ${m.prefix + m.command} on\n> ${m.prefix + m.command} off`);
      }
   }
}