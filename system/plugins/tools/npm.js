class Command {
     constructor() {
       this.command = "npm"
       this.alias = ["npmjs", "package"],
       this.category = ["tools"]
       this.settings = {
             limit: true
        },
      this.description = "Mencari Package dari NPM"
     this.loading = true
  }
  run = async(m, { sock, Func, text, config }) => {
       if (!text) throw "> Masukan Nama package nya bang"
    
    let data = await Func.fetchJson(`https://registry.npmjs.com/-/v1/search?text=${encodeURIComponent(text)}`);

  let cap = "*– 乂 NpmJS - Search*\n"
      for (let i of data.objects.slice(0, 20)) {
       cap += `> *${i.package.name}@^${i.package.version}*\n`
       cap += `> *- Mingguan :* ${Func.h2k(i.downloads.weekly)} | *- Bulanan :* ${Func.h2k(i.downloads.monthly)}\n`
      cap += `> *- Pembuat :* ${i.package.publisher.username}\n`
      cap += `> *- Diperbarui :* ${Func.ago(i.package.date)}\n`
      cap += Object.entries(i.package.links).map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`).join("\n");
      cap += "\n\n"
    }
    cap += `> © ${config.name}`
    m.reply(cap);
  }
}

module.exports = new Command()