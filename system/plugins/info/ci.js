module.exports = {
  command: "cinfo",
  alias: ["channelinfo", "ci"],
  category: ["info"],
  description: "Ambil metadata saluran melalui link",
  loading: true,
  async run(m, { sock, Func, text, config }) {
    if (!Func.isUrl(text) || !text)
      throw `> Ketik atau reply link saluran WhatsApp`;
    for (let prop of Func.isUrl(text)) {
      if (!/whatsapp.com\/channel/.test(prop)) continue;
      m.reply(config.messages.wait);
      let id = prop.replace(
        new RegExp(/https:\/\/\whatsapp.com\/channel\//, "gi"),
        "",
      );
      let metadata = await sock.newsletterMetadata("invite", id);
      let cap = `*– 乂 Newsletter - Info*
> *- Id :* ${metadata.id}
> *- Nama :* ${metadata.name}
> *- Pengikut :* ${Func.h2k(metadata.subscribers)}
> *- Dibuat sejak :* ${new Date(metadata.creation_time * 1000).toLocaleString(
        "ID",
      )}`;
      m.reply(
        metadata.preview
          ? {
              image: {
                url: "https://pps.whatsapp.net" + metadata.preview,
              },
              caption: cap,
            }
          : cap,
      );
    }
  },
};
