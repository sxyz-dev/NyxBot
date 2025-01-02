module.exports = {
  command: "gcsetting",
  alias: ["groupsetting", "settingc"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
    botAdmin: true,
  },
  description: "Untuk membuka/menutup group",
  loading: true,
  async run(m, { sock, text }) {
    if (!text)
      throw `*– 乂 Cara - Penggunaan*
> *-* *\`open\`* untuk membuka group
> *-* *\`close\`* untuk menutup group

*– 乂 Contoh Pengunaan*
> *-* ${m.prefix + m.command} open
> *-* ${m.prefix + m.command} close`;
    await sock
      .groupSettingUpdate(
        m.cht,
        text === "open" ? "not_announcement" : "announcement",
      )
      .then((a) =>
        m.reply(
          `> *-* Berhasil ${text === "open" ? "membuka" : "menutup"} group`,
        ),
      );
  },
};
