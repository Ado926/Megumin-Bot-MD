import {watchFile, unwatchFile} from 'fs';
import chalk from 'chalk';
import {fileURLToPath} from 'url';
import fs from 'fs'; 
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';
import '../plugins/main-allfake.js';

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botnumber = '' //Ejemplo: +573138954963
global.confirmCode = ''

//• ↳𝑺𝑶𝑳𝑶 𝑫𝑬𝑺𝑨𝑹𝑹𝑶𝑳𝑳𝑨𝑫𝑶𝑹𝑬𝑺 𝑨𝑷𝑹𝑶𝑩𝑨𝑫𝑶𝑺
global.owner = [
  ['50493732693', '🜲 Propietario 🜲', true],
  ['5216671548329']
];

global.suittag = ['50493732693']
global.prems = []

global.libreria = 'Baileys'
global.baileys = 'fizzxydev/baileys-pro'
global.vs = '^2.0.5'
global.languaje = 'Español'
global.nameqr = 'MichiAi-MD'
global.sessions = 'MeguminSession'
global.jadi = 'MeguminJadiBot'
global.meguminJadibts = true

//• ↳ ◜𝑴𝑨𝑹𝑪𝑨𝑺 𝑫𝑬 𝑨𝑮𝑼𝑨◞ • 💌
global.packsticker = `☁️━━━━━━━━━━━━\n├ Bot:\n├ Creador:\n├ Fecha de creación:\n├ Hora actual:\n☁️━━━━━━━━━━━━`
global.packname = '⪛✰ 𝗠𝗶𝗰𝗵𝗶-𝗔𝗶-𝗕𝗼𝘁 ✰⪜'
global.botname = '☁️ 𓃠 𝗠𝗶𝗰𝗵𝗶・𝗔𝗜・𝗕𝗼𝘁 ✩'
global.wm = '☁️ Michi_Ai-Bot by Wirk'
global.author = `☁️━━━━━━━━━━━━\n➤ Creado por: Wirk\n➤ Fecha: ${moment.tz('America/Los_Angeles').format('DD/MM/YY')}\n➤ Hora: ${moment.tz('America/Los_Angeles').format('HH:mm:ss')}\n☁️━━━━━━━━━━━━\nSticker hecho por: Michi Ai Bot`
global.dev = '© Powered By Wirk'
global.textbot = '☁️ Michi Ai Bot • Creado por Wirk'
global.titulowm = '☁️ Explosión de comandos • Michi Ai Bot'
global.titulowm2 = '☁️ Michi Ai Bot en acción'
global.igfg = 'Wirk Project (◣_◢)'
global.gt = '☁️ Michi Ai Bot - Funcionalidades únicas'
global.namechannel = '☁️ Michi Ai Bot / Wirk Project'
global.etiqueta = 'Wirk'

//• ↳ ◜𝑰𝑴𝑨́𝑮𝑬𝑵𝑬𝑺◞ • 🌇
global.imagen1 = 'https://qu.ax/EbklL.jpg'
global.imagen2 = 'https://qu.ax/EbklL.jpg'
global.imagen3 = 'https://qu.ax/EbklL.jpg'
global.imagenadult = 'https://qu.ax/EbklL.jpg'
global.logo = 'https://qu.ax/EbklL.jpg'

//• ↳ ◜𝑭𝑨𝑲𝑬 𝑬𝑺𝑻𝑰𝑳𝑶◞ • 🪩
global.estilo = {
  key: {
    fromMe: false,
    participant: `0@s.whatsapp.net`,
    ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {})
  },
  message: {
    orderMessage: {
      itemCount: -999999,
      status: 1,
      surface: 1,
      message: '⏤͟͞ू⃪ ፝͜⁞Mɪᴄʜɪ Aɪ Bᴏᴛ✰⃔࿐',
      orderTitle: 'Bang',
      thumbnailUrl: logo,
      sellerJid: '0@s.whatsapp.net'
    }
  }
}
//• ↳ ◜𝑳𝑰𝑵𝑲𝑺◞ • 🌿
global.ofcgp = 'https://chat.whatsapp.com/F4QEFF2Hn4102NdbPJ2ZOi' //Grupo Oficial De Megumin
global.gp1 = 'https://chat.whatsapp.com/DSz2abnPgfE4IzZjynQLu3' //Grupo de Kotori Bot
global.gp2 = 'https://chat.whatsapp.com/J9gyFJLbhVIJXaUZlpo8Xt'//Grupo de enlaces
global.comunidad1 = 'https://chat.whatsapp.com/DWQb1xZClyR98ogvwI3qae' //Comunidad Megumin
global.channel = 'https://whatsapp.com/channel/0029VaqAtuIK0IBsHYXtvA3e' //Canal Oficial
global.channel2 = 'https://whatsapp.com/channel/0029Vb7Ji66KbYMTYLU9km3p' //Canal de Legends
global.yt = 'https://youtube.com/@Moitwr' //Canal De Youtube
global.md = 'https://github.com/Ado926/Mai2' //Github Oficial
global.correo = 'minexdt@gmail.com'

var ase = new Date(); var hour = ase.getHours(); switch(hour){ case 0: hour = 'Linda Mañana'; break; case 1: hour = 'Linda Mañana'; break; case 2: hour = 'Linda Mañana'; break; case 3: hour = 'Linda Mañana'; break; case 4: hour = 'linda mañana'; break; case 5: hour = 'Linda Mañana'; break; case 6: hour = 'Linda Mañana'; break; case 7: hour = 'Linda Mañana'; break; case 8: hour = 'Linda Mañana'; break; case 9: hour = 'Linda Mañana'; break; case 10: hour = 'Lindo Dia'; break; case 11: hour = 'Lindo Dia'; break; case 12: hour = 'Lindo Dia'; break; case 13: hour = 'Lindo Dia'; break; case 14: hour = 'Linda Tarde'; break; case 15: hour = 'Linda Tarde'; break; case 16: hour = 'Linda Tarde'; break; case 17: hour = 'Linda Tarde'; break; case 18: hour = 'Linda Noche'; break; case 19: hour = 'Linda Noche'; break; case 20: hour = 'Linda Noche'; break; case 21: hour = 'Linda Noche'; break; case 22: hour = 'Linda Noche'; break; case 23: hour = 'Linda Noche'; break;}
global.saludo = '🍭' + hour;

global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: "120363402846939411@newsletter", serverMessageId: 100, newsletterName: namechannel, }, }, }
//• ↳ ◜𝑻𝑰𝑬𝑴𝑷𝑶◞ • 🕒
global.d = new Date(new Date + 3600000);
global.locale = 'es';
global.dia = d.toLocaleDateString(locale, {weekday: 'long'});
global.fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'});
global.mes = d.toLocaleDateString('es', {month: 'long'});
global.año = d.toLocaleDateString('es', {year: 'numeric'});
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});
//* ****************************

//• ↳ ◜𝑨𝑷𝑰𝑺 𝑭𝑼𝑵𝑪𝑰𝑶𝑵◞ 👑
global.MyApiRestBaseUrl = 'https://api.cafirexos.com';
global.MyApiRestApikey = 'BrunoSobrino';
global.openai_org_id = 'org-3';
global.openai_key = 'sk-0';
global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f'];
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())];
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63'];
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())];
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5'];
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())];
global.lolkeysapi = ['kurumi']; // ['BrunoSobrino_2']
global.itsrose = ['4b146102c4d500809da9d1ff'];

global.APIs = {
  ApiEmpire: 'https://api-brunosobrino.zipponodes.xyz',
  xteam: 'https://api.xteam.xyz',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://api.zahwazein.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',
  fgmods: 'https://api-fgmods.ddns.net',
  botcahx: 'https://api.botcahx.biz.id',
  ibeng: 'https://api.ibeng.tech/docs',
  rose: 'https://api.itsrose.site',
  popcat: 'https://api.popcat.xyz',
  xcoders: 'https://api-xcoders.site',
  vihangayt: 'https://vihangayt.me',
  erdwpe: 'https://api.erdwpe.com',
  xyroinee: 'https://api.xyroinee.xyz',
  nekobot: 'https://nekobot.xyz'
},
global.APIKeys = {
  'https://api.xteam.xyz': `${keysxteam}`,
  'https://api.lolhuman.xyz': 'GataDios',
  'https://api.neoxr.my.id': `${keysneoxr}`,
  'https://api.zahwazein.xyz': `${keysxxx}`,
  'https://api-fgmods.ddns.net': 'fg-dylux',
  'https://api.botcahx.biz.id': 'Admin',
  'https://api.ibeng.tech/docs': 'tamvan',
  'https://api.itsrose.site': 'Rs-Zeltoria',
  'https://api-xcoders.site': 'Frieren',
  'https://api.xyroinee.xyz': 'uwgflzFEh6'
};

/** ************************/
global.cheerio = cheerio;
global.fs = fs;
global.fetch = fetch;
global.axios = axios;
global.moment = moment;

const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright('Update \'megumin/config.js\''));
  import(`${file}?update=${Date.now()}`);
});
