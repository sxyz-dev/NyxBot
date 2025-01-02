module.exports = {
  command: "setppgroup",
  alias: ["setppgc"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
    botAdmin: true,
  },
  description: "Untuk mengubah poto profile group",
  async run(m, { sock }) {
    let q = m.quoted ? m.quoted : m;
    if (!q.isMedia)
      throw "> Reply Atau kirim photo yang ingin di jadikan pp group";
    let buffer = await q.download();
    await sock
      .updateProfilePicture(m.cht, buffer)
      .then((a) => m.reply("> *Berhasil Mengubah pp group !*"));
  },
};
