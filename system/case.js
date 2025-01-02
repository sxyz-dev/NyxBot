//============================
// - buat Pengguna case bisa tambah fitur disini
// - Fitur akan otomatis terlihat di .menu jadi jangan bikin fitur menu lagi 👍
//============================

const util = require("util");
const config = require("../settings.js");
const { exec } = require("child_process");
const fs = require("node:fs");
const axios = require("axios");
const Func = require("../lib/function");
const { writeExif } = require("../lib/sticker");

module.exports = async (m, sock, store) => {
  if (m.isBot) return;
  let isCommand =
    (m.prefix && m.body.startsWith(m.prefix) + m.command) || false;
  const quoted = m.isQuoted ? m.quoted : m;
  const scrape = await scraper.list();

  switch (m.command) {
    case "sticker":
    case "s":
      {
        if (/image|video|webp/.test(quoted.msg.mimetype)) {
          let media = await quoted.download();
          if (quoted.msg?.seconds > 10)
            throw "> Video diatas durasi 10 detik gabisa";
          let exif;
          if (m.text) {
            let [packname, author] = m.text.split(/[,|\-+&]/);
            exif = {
              packName: packname ? packname : "",
              packPublish: author ? author : "",
            };
          } else {
            exif = {
              packName: config.sticker.packname,
              packPublish: config.sticker.author,
            };
          }
          let sticker = await writeExif(
            { mimetype: quoted.msg.mimetype, data: media },
            exif,
          );
          await m.reply({ sticker });
        } else if (m.mentions.length !== 0) {
          for (let id of m.mentions) {
            await delay(1500);
            let url = await sock.profilePictureUrl(id, "image");
            let media = await axios
              .get(url, {
                responsType: "arraybuffer",
              })
              .then((a) => a.data);
            let sticker = await writeExif(media, {
              packName: config.sticker.packname,
              packPublish: config.sticker.author,
            });
            await m.reply({ sticker });
          }
        } else if (
          /(https?:\/\/.*\.(?:png|jpg|jpeg|webp|mov|mp4|webm|gif))/i.test(
            m.text,
          )
        ) {
          for (let url of Func.isUrl(m.text)) {
            await delay(1500);
          }
        } else
          m.reply("> Reply photo atau video yang ingin di jadikan sticker");
      }
      break;
    case "brat":
      {
        let input = m.isQuoted ? m.quoted.body : m.text;
        if (!input) return m.reply("> Reply/Masukan pessn");
        m.reply(config.messages.wait);
        let media = await scrape.brat(input);
        let sticker = await writeExif(
          {
            mimetype: "image",
            data: media,
          },
          {
            packName: config.sticker.packname,
            packPublish: config.sticker.author,
          },
        );

        await m.reply({ sticker });
      }
      break;
    default:
      if (
        [">", "eval", "=>"].some((a) =>
          m.command.toLowerCase().startsWith(a),
        ) &&
        m.isOwner
      ) {
        let evalCmd = "";
        try {
          evalCmd = /await/i.test(m.text)
            ? eval("(async() => { " + m.text + " })()")
            : eval(m.text);
        } catch (e) {
          evalCmd = e;
        }
        new Promise((resolve, reject) => {
          try {
            resolve(evalCmd);
          } catch (err) {
            reject(err);
          }
        })
          ?.then((res) => m.reply(util.format(res)))
          ?.catch((err) => m.reply(util.format(err)));
      }
      if (
        ["$", "exec"].some((a) => m.command.toLowerCase().startsWith(a)) &&
        m.isOwner
      ) {
        try {
          exec(m.text, async (err, stdout) => {
            if (err) return m.reply(util.format(err));
            if (stdout) return m.reply(util.format(stdout));
          });
        } catch (e) {
          await m.reply(util.format(e));
        }
      }
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  delete require.cache[file];
});
