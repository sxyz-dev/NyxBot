module.exports = {
  command: "setdeskripsi",
  alias: ["setdesc"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
    botAdmin: true,
  },
  description: "Untuk mengganti deskripsi group",
  async run(m, { sock, text }) {
    if (!text) throw "> Masukan deskripsi group baru nya";
    if (text.length > 200) throw "> Buset panjang amat, Maksimal 200 karakter!";
    await sock.groupUpdateDescription(m.cht, text);
    m.reply(
      `> *Berhasil mengganti deskripsi group menjadi :*
 > ${text.trim()}`,
    );
  },
};
