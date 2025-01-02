module.exports = {
  command: "setnamegroup",
  alias: ["setnamegc"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
    botAdmin: true,
  },
  description: "Untuk mengganti nama group",
  async run(m, { sock, text }) {
    if (!text) throw "> Masukan Nama group baru nya";
    if (text.length > 20) throw "> Buset panjang amat, Maksimal 20 karakter!";
    await sock.groupUpdateSubject(m.cht, text);
    m.reply(
      `> *Berhasil mengganti nama group menjadi :*
 > ${text}`,
    );
  },
};
