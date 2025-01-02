const axios = require("axios");

const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+?)(?:[\/]|$)/i;

module.exports = {
   command: "gitclone",
   alias: ["gitdl", "githubdl"],
   settings: {
      limit: true
  },
  description: "Download repository dari github",
  loading: true,
  async run(m, { sock, Func, text }) {
      if (!Func.isUrl(text) && !/github.com/.test(text)) throw "> Masukan Link repository github!"
   let [_, author, repo] = text.match(regex);
   if (!author || !repo)  throw "> Masukan Link repository"
    repo.replace(/.git$/, "");
    let api = `https://api.github.com/repos/${author}/${repo}`  
    let { data } = await axios.get(api).catch(e => e.response);   
   let cap = `*– 乂 Github - Clone*\n`
      cap += `> *- Nama :* ${data.name}\n`
      cap += `> *- Pemilik :* ${data.owner.login}\n`
      cap += `> *- Bahasa Program :* ${data.language}\n`
      cap += `> *- Total star :* ${Func.h2k(data.watchers)}\n`
      cap += `> *- Total fork :* ${Func.h2k(data.forks)}\n`
      cap += `> *- Dibuat sejak :* ${Func.ago(data.created_at)}\n`
      cap += `> *- Terakhir update :* ${Func.ago(data.updated_at)}\n`
      cap += `\n> ${data.description}`
     
     m.reply({
       document: {
          url: api + "/zipball",
      },
      caption: cap,
      fileName: repo + ".zip",
      mimetype: "application/zip"
    })
  }
}