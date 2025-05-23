import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import { promises } from 'fs'
import { join } from 'path'
let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
try {        
/*let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}*/
let { exp, chocolates, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let name = await conn.getName(m.sender)
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let user = global.db.data.users[m.sender]
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
const vid = ['https://files.catbox.moe/nnwm47.mp4']

let menu = `> *・°☆・°・°☆・°・*☆・°・*
> Hola *${taguser}*!, soy *Michi-Ai-Bot* ☔
> *・°☆・°・°☆・°・*☆・°・*
> Bot: *${(conn.user.jid == global.conn.user.jid ? 'Oficial' : 'SubBot')}*
> Creador: *Wirk*
> Tiempo Activo: *${uptime}*
> Usuarios: *${totalreg}*
> Modo: *Público*
> Librería: *MekBaileys*
> *・°☆・°・°☆・°・*☆・°・*

> 🌳 Puedes tener tu *Sub Bot* usa *#code* o *#qr* para vincular.

---
 ⧠⭔ *INFO BOT* ⭔⧠
 ❢ Comandos para ver estado e información de la Bot.
 𖹭𖹭 *${usedPrefix}formarpareja5*
 𖹭𖹭 *${usedPrefix}estado*
 𖹭𖹭 *${usedPrefix}host*
 𖹭𖹭 *${usedPrefix}hosting*
 𖹭𖹭 *${usedPrefix}botreglas*
 𖹭𖹭 *${usedPrefix}hornymenu*
 𖹭𖹭 *${usedPrefix}menu*
 𖹭𖹭 *${usedPrefix}menu2*
 𖹭𖹭 *${usedPrefix}runtime*
 𖹭𖹭 *${usedPrefix}script*
 𖹭𖹭 *${usedPrefix}staff*
 𖹭𖹭 *${usedPrefix}menulista*
 𖹭𖹭 *${usedPrefix}blocklist*

---
 ⧠⭔ *BUSCADORES* ⭔⧠
 ❢ Comandos para realizar búsquedas en distintas plataformas.
 𖹭𖹭 *${usedPrefix}githubsearch*
 𖹭𖹭 *${usedPrefix}google <búsqueda>*
 𖹭𖹭 *${usedPrefix}mercadolibre <búsqueda>*
 𖹭𖹭 *${usedPrefix}imagen <query>*
 𖹭𖹭 *${usedPrefix}pinterest*
 𖹭𖹭 *${usedPrefix}tiktoksearch <txt>*

---
 ⧠⭔ *JUEGOS* ⭔⧠
 ❣ Comandos de juegos para jugar con tus amigos.
 𖹭𖹭 *${usedPrefix}69 @tag*
 𖹭𖹭 *${usedPrefix}abrazar <@usuario>*
 𖹭𖹭 *${usedPrefix}acertijo*
 𖹭𖹭 *${usedPrefix}agarrar @tag*
 𖹭𖹭 *${usedPrefix}anal @tag*
 𖹭𖹭 *${usedPrefix}sonrojarse @tag*
 𖹭𖹭 *${usedPrefix}gay <@tag> | <nombre>*
 𖹭𖹭 *${usedPrefix}lesbiana <@tag> | <nombre>*
 𖹭𖹭 *${usedPrefix}pajero <@tag> | <nombre>*
 𖹭𖹭 *${usedPrefix}pajera <@tag> | <nombre>*
 𖹭𖹭 *${usedPrefix}puto <@tag> | <nombre>*
 𖹭𖹭 *${usedPrefix}puta <@tag> | <nombre>*
 𖹭𖹭 *${usedPrefix}manco <@tag> | <nombre>*
 𖹭𖹭 *${usedPrefix}manca <@tag> | <nombre>*
 𖹭𖹭 *${usedPrefix}rata <@tag> | <nombre>*
 𖹭𖹭 *${usedPrefix}prostituta <@tag> | <nombre>*
 𖹭𖹭 *${usedPrefix}prostituto <@tag> | <nombre>*
 𖹭𖹭 *${usedPrefix}apostar *<cantidad>***
 𖹭𖹭 *${usedPrefix}chupartetas @tag*
 𖹭𖹭 *${usedPrefix}consejo*
 𖹭𖹭 *${usedPrefix}cum @tag*
 𖹭𖹭 *${usedPrefix}dance *<@user>***
 𖹭𖹭 *${usedPrefix}formarpareja5*
 𖹭𖹭 *${usedPrefix}abrazar @tag*
 𖹭𖹭 *${usedPrefix}violar @tag*
 𖹭𖹭 *${usedPrefix}dormir @tag*
 𖹭𖹭 *${usedPrefix}lamber @tag*
 𖹭𖹭 *${usedPrefix}enamorada @tag*
 𖹭𖹭 *${usedPrefix}mamada @tag*
 𖹭𖹭 *${usedPrefix}meme*
 𖹭𖹭 *${usedPrefix}violar @tag*
 𖹭𖹭 *${usedPrefix}nombreninja *<texto>***
 𖹭𖹭 *${usedPrefix}acariciar @tag*
 𖹭𖹭 *${usedPrefix}penetrar @user*
 𖹭𖹭 *${usedPrefix}personalidad*
 𖹭𖹭 *${usedPrefix}piropo*
 𖹭𖹭 *${usedPrefix}pokedex *<pokemon>***
 𖹭𖹭 *${usedPrefix}pucheros @tag*
 𖹭𖹭 *${usedPrefix}pregunta*
 𖹭𖹭 *${usedPrefix}golpear @tag*
 𖹭𖹭 *${usedPrefix}reto*
 𖹭𖹭 *${usedPrefix}ruleta *<cantidad> <color>***
 𖹭𖹭 *${usedPrefix}rusa @tag*
 𖹭𖹭 *${usedPrefix}triste @tag*
 𖹭𖹭 *${usedPrefix}scared @tag*
 𖹭𖹭 *${usedPrefix}sexo @tag*
 𖹭𖹭 *${usedPrefix}ship*
 𖹭𖹭 *${usedPrefix}love*
 𖹭𖹭 *${usedPrefix}timida @tag*
 𖹭𖹭 *${usedPrefix}simi*
 𖹭𖹭 *${usedPrefix}bot*
 𖹭𖹭 *${usedPrefix}dormir @tag*
 𖹭𖹭 *${usedPrefix}dormir @tag*
 𖹭𖹭 *${usedPrefix}top *<texto>***
 𖹭𖹭 *${usedPrefix}violar @tag*
 𖹭𖹭 *${usedPrefix}tijeras @tag*
 𖹭𖹭 *${usedPrefix}zodiac *2002 02 25***
 𖹭𖹭 *${usedPrefix}cancion*
 𖹭𖹭 *${usedPrefix}math <mode>*
 𖹭𖹭 *${usedPrefix}ppt*
 𖹭𖹭 *${usedPrefix}slot <apuesta>*

---
 ⧠⭔ *ROLLWAIFU* ⭔⧠
 ❣ Comandos de gacha para reclamar y colecciónar personajes.
 𖹭𖹭 *${usedPrefix}character*
 𖹭𖹭 *${usedPrefix}confirmar*
 𖹭𖹭 *${usedPrefix}darrw @usuario <personaje>*
 𖹭𖹭 *${usedPrefix}guardar <personaje>*
 𖹭𖹭 *${usedPrefix}sacar <personaje>*
 𖹭𖹭 *${usedPrefix}obtenidos*
 𖹭𖹭 *${usedPrefix}robarpersonaje*
 𖹭𖹭 *${usedPrefix}roll*
 𖹭𖹭 *${usedPrefix}toprw*

---
 ⧠⭔ *SUBBOTS* ⭔⧠
 ❢ Comandos para gestionar Sub-Bots.
 𖹭𖹭 *${usedPrefix}jadibot*
 𖹭𖹭 *${usedPrefix}serbot*
 𖹭𖹭 *${usedPrefix}bots*
 𖹭𖹭 *${usedPrefix}deletebot*
 𖹭𖹭 *${usedPrefix}pausarai*

---
 ⧠⭔ *ECONOMÍA Y RPG* ⭔⧠
 ❣ Comandos de economía y rpg para ganar dinero y otros recursos.
 𖹭𖹭 *${usedPrefix}bank*
 𖹭𖹭 *${usedPrefix}chocolates*
 𖹭𖹭 *${usedPrefix}crimen*
 𖹭𖹭 *${usedPrefix}daily*
 𖹭𖹭 *${usedPrefix}claim*
 𖹭𖹭 *${usedPrefix}depositar*
 𖹭𖹭 *${usedPrefix}lb*
 𖹭𖹭 *${usedPrefix}levelup*
 𖹭𖹭 *${usedPrefix}minar*
 𖹭𖹭 *${usedPrefix}retirar*
 𖹭𖹭 *${usedPrefix}rob2*
 𖹭𖹭 *${usedPrefix}rob*
 𖹭𖹭 *${usedPrefix}addprem [@user] <days>*
 𖹭𖹭 *${usedPrefix}slut*
 𖹭𖹭 *${usedPrefix}trabajar*
 𖹭𖹭 *${usedPrefix}transfer [tipo] [cantidad] [@tag]*

---
 ⧠⭔ *REGISTRO* ⭔⧠
 ❣ Comandos de perfil para ver, configurar y comprobar estados de tu perfil.
 𖹭𖹭 *${usedPrefix}profile*
 𖹭𖹭 *${usedPrefix}unreg*
 𖹭𖹭 *${usedPrefix}reg*

---
 ⧠⭔ *XP* ⭔⧠
 ❣ Comandos relacionados con la experiencia.
 𖹭𖹭 *${usedPrefix}bal*
 𖹭𖹭 *${usedPrefix}daily*
 𖹭𖹭 *${usedPrefix}Buy*
 𖹭𖹭 *${usedPrefix}Buyall*

---
 ⧠⭔ *STICKERS* ⭔⧠
 ❣ Comandos para creaciones de stickers etc.
 𖹭𖹭 *${usedPrefix}toimg (reply)*
 𖹭𖹭 *${usedPrefix}qc*
 𖹭𖹭 *${usedPrefix}stiker <img>*
 𖹭𖹭 *${usedPrefix}sticker <url>*
 𖹭𖹭 *${usedPrefix}wm <packname>|<author>*

---
 ⧠⭔ *ANIMES* ⭔⧠
 ❣ Comandos de reacciones de anime.
 𖹭𖹭 *${usedPrefix}animelink*
 𖹭𖹭 *${usedPrefix}akira*
 𖹭𖹭 *${usedPrefix}akiyama*
 𖹭𖹭 *${usedPrefix}anna*
 𖹭𖹭 *${usedPrefix}asuna*
 𖹭𖹭 *${usedPrefix}ayuzawa*
 𖹭𖹭 *${usedPrefix}boruto*
 𖹭𖹭 *${usedPrefix}chiho*
 𖹭𖹭 *${usedPrefix}chitoge*
 𖹭𖹭 *${usedPrefix}deidara*
 𖹭𖹭 *${usedPrefix}erza*
 𖹭𖹭 *${usedPrefix}elaina*
 𖹭𖹭 *${usedPrefix}eba*
 𖹭𖹭 *${usedPrefix}emilia*
 𖹭𖹭 *${usedPrefix}hestia*
 𖹭𖹭 *${usedPrefix}hinata*
 𖹭𖹭 *${usedPrefix}inori*
 𖹭𖹭 *${usedPrefix}isuzu*
 𖹭𖹭 *${usedPrefix}itachi*
 𖹭𖹭 *${usedPrefix}itori*
 𖹭𖹭 *${usedPrefix}kaga*
 𖹭𖹭 *${usedPrefix}kagura*
 𖹭𖹭 *${usedPrefix}kaori*
 𖹭𖹭 *${usedPrefix}keneki*
 𖹭𖹭 *${usedPrefix}kotori*
 𖹭𖹭 *${usedPrefix}kurumi*
 𖹭𖹭 *${usedPrefix}madara*
 𖹭𖹭 *${usedPrefix}mikasa*
 𖹭𖹭 *${usedPrefix}miku*
 𖹭𖹭 *${usedPrefix}minato*
 𖹭𖹭 *${usedPrefix}naruto*
 𖹭𖹭 *${usedPrefix}nezuko*
 𖹭𖹭 *${usedPrefix}sagiri*
 𖹭𖹭 *${usedPrefix}sasuke*
 𖹭𖹭 *${usedPrefix}sakura*
 𖹭𖹭 *${usedPrefix}cosplay*
 𖹭𖹭 *${usedPrefix}infoanime*
 𖹭𖹭 *${usedPrefix}lolice*
 𖹭𖹭 *${usedPrefix}waifu*

---
 ⧠⭔ *DATABASE* ⭔⧠
 ❢ Comandos para la gestión de la base de datos.
 𖹭𖹭 *${usedPrefix}delvn <text>*
 𖹭𖹭 *${usedPrefix}delmsg <text>*
 𖹭𖹭 *${usedPrefix}delimg <text>*
 𖹭𖹭 *${usedPrefix}delsticker <text>*

---
 ⧠⭔ *FIXMENSAJE* ⭔⧠
 ❢ Comandos para arreglar mensajes.
 𖹭𖹭 *${usedPrefix}dsowner*

---
 ⧠⭔ *GRUPOS* ⭔⧠
 ❣ Comandos de grupos para una mejor gestión de ellos.
 𖹭𖹭 *${usedPrefix}group abrir / cerrar*
 𖹭𖹭 *${usedPrefix}delete*
 𖹭𖹭 *${usedPrefix}setppgroup*
 𖹭𖹭 *${usedPrefix}rentar2*
 𖹭𖹭 *${usedPrefix}setwelcome*
 𖹭𖹭 *${usedPrefix}demote*
 𖹭𖹭 *${usedPrefix}encuesta <text|text2>*
 𖹭𖹭 *${usedPrefix}hidetag*
 𖹭𖹭 *${usedPrefix}infogrupo*
 𖹭𖹭 *${usedPrefix}invite *<numero>***
 𖹭𖹭 *${usedPrefix}kick*
 𖹭𖹭 *${usedPrefix}link*
 𖹭𖹭 *${usedPrefix}promote*
 𖹭𖹭 *${usedPrefix}rentar*
 𖹭𖹭 *${usedPrefix}tagall *<mesaje>***
 𖹭𖹭 *${usedPrefix}invocar *<mesaje>***

---
 ⧠⭔ *ON / OFF* ⭔⧠
 ❣ Comandos para activar/desactivar funciones.
 𖹭𖹭 *${usedPrefix}enable <option>*
 𖹭𖹭 *${usedPrefix}disable <option>*

---
 ⧠⭔ *DESCARGAS* ⭔⧠
 ❣ Comandos de descargas para varios archivos.
 𖹭𖹭 *${usedPrefix}facebook*
 𖹭𖹭 *${usedPrefix}fb*
 𖹭𖹭 *${usedPrefix}play*
 𖹭𖹭 *${usedPrefix}playvid*
 𖹭𖹭 *${usedPrefix}gitclone *<url git>***
 𖹭𖹭 *${usedPrefix}instagram*
 𖹭𖹭 *${usedPrefix}ig*
 𖹭𖹭 *${usedPrefix}imagen <query>*
 𖹭𖹭 *${usedPrefix}mediafire <url>*
 𖹭𖹭 *${usedPrefix}apkmod*
 𖹭𖹭 *${usedPrefix}ytmp3doc*
 𖹭𖹭 *${usedPrefix}ytmp4doc*
 𖹭𖹭 *${usedPrefix}spotify*
 𖹭𖹭 *${usedPrefix}tiktok*
 𖹭𖹭 *${usedPrefix}tw*
 𖹭𖹭 *${usedPrefix}ytmp4 *<url youtube>***

---
 ⧠⭔ *HERRAMIENTAS* ⭔⧠
 ❣ Comandos de herramientas con muchas funciones.
 𖹭𖹭 *${usedPrefix}toanime*
 𖹭𖹭 *${usedPrefix}tts <lang> <teks>*
 𖹭𖹭 *${usedPrefix}imagen <query>*
 𖹭𖹭 *${usedPrefix}remini*
 𖹭𖹭 *${usedPrefix}hd*
 𖹭𖹭 *${usedPrefix}enhance*
 𖹭𖹭 *${usedPrefix}nuevafotochannel*
 𖹭𖹭 *${usedPrefix}nosilenciarcanal*
 𖹭𖹭 *${usedPrefix}silenciarcanal*
 𖹭𖹭 *${usedPrefix}noseguircanal*
 𖹭𖹭 *${usedPrefix}seguircanal*
 𖹭𖹭 *${usedPrefix}avisoschannel*
 𖹭𖹭 *${usedPrefix}resiviravisos*
 𖹭𖹭 *${usedPrefix}inspect*
 𖹭𖹭 *${usedPrefix}inspeccionar*
 𖹭𖹭 *${usedPrefix}eliminarfotochannel*
 𖹭𖹭 *${usedPrefix}reactioneschannel*
 𖹭𖹭 *${usedPrefix}reaccioneschannel*
 𖹭𖹭 *${usedPrefix}nuevonombrecanal*
 𖹭𖹭 *${usedPrefix}nuevadescchannel*
 𖹭𖹭 *${usedPrefix}readvo*
 𖹭𖹭 *${usedPrefix}infobot*
 𖹭𖹭 *${usedPrefix}speed*

---
 ⧠⭔ *INFORMACIÓN* ⭔⧠
 ❣ Comandos para ver estado e información de la Bot.
 𖹭𖹭 *${usedPrefix}creador*
 𖹭𖹭 *${usedPrefix}owner*
 𖹭𖹭 *${usedPrefix}dash*
 𖹭𖹭 *${usedPrefix}dashboard*
 𖹭𖹭 *${usedPrefix}views*
 𖹭𖹭 *${usedPrefix}database*
 𖹭𖹭 *${usedPrefix}usuarios*
 𖹭𖹭 *${usedPrefix}user*
 𖹭𖹭 *${usedPrefix}ds*
 𖹭𖹭 *${usedPrefix}fixmsgespera*
 𖹭𖹭 *${usedPrefix}infobot*
 𖹭𖹭 *${usedPrefix}speed*
 𖹭𖹭 *${usedPrefix}ping*
 𖹭𖹭 *${usedPrefix}sistema*
 𖹭𖹭 *${usedPrefix}speed*
 𖹭𖹭 *${usedPrefix}speedtest*
 𖹭𖹭 *${usedPrefix}groups*
 𖹭𖹭 *${usedPrefix}grouplist*
 𖹭𖹭 *${usedPrefix}reportar*

---
 ⧠⭔ *NSFW* ⭔⧠
 ❣ Comandos NSFW (Contenido para adultos) - Úsalo bajo tu responsabilidad.
 𖹭𖹭 *${usedPrefix}nsfwloli*
 𖹭𖹭 *${usedPrefix}nsfwfoot*
 𖹭𖹭 *${usedPrefix}nsfwass*
 𖹭𖹭 *${usedPrefix}nsfwbdsm*
 𖹭𖹭 *${usedPrefix}nsfwcum*
 𖹭𖹭 *${usedPrefix}nsfwero*
 𖹭𖹭 *${usedPrefix}nsfwfemdom*
 𖹭𖹭 *${usedPrefix}nsfwfoot*
 𖹭𖹭 *${usedPrefix}nsfwglass*
 𖹭𖹭 *${usedPrefix}nsfworgy*
 𖹭𖹭 *${usedPrefix}yuri*
 𖹭𖹭 *${usedPrefix}yuri2*
 𖹭𖹭 *${usedPrefix}yaoi*
 𖹭𖹭 *${usedPrefix}yaoi2*
 𖹭𖹭 *${usedPrefix}panties*
 𖹭𖹭 *${usedPrefix}tetas*
 𖹭𖹭 *${usedPrefix}booty*
 𖹭𖹭 *${usedPrefix}ecchi*
 𖹭𖹭 *${usedPrefix}furro*
 𖹭𖹭 *${usedPrefix}hentai*
 𖹭𖹭 *${usedPrefix}trapito*
 𖹭𖹭 *${usedPrefix}imagenlesbians*
 𖹭𖹭 *${usedPrefix}pene*
 𖹭𖹭 *${usedPrefix}porno*
 𖹭𖹭 *${usedPrefix}randomxxx*
 𖹭𖹭 *${usedPrefix}pechos*

---
 ⧠⭔ *CREADOR* ⭔⧠
 ❣ Comandos exclusivos para el creador del bot.
 𖹭𖹭 *${usedPrefix}enable <option>*
 𖹭𖹭 *${usedPrefix}disable <option>*
 𖹭𖹭 *${usedPrefix}addprem [@user] <days>*
 𖹭𖹭 *${usedPrefix}>*
 𖹭𖹭 *${usedPrefix}=>*
 𖹭𖹭 *${usedPrefix}copia*
 𖹭𖹭 *${usedPrefix}broadcastgroup <teks>*
 𖹭𖹭 *${usedPrefix}bcgc <teks>*
 𖹭𖹭 *${usedPrefix}bcgc2*
 𖹭𖹭 *${usedPrefix}broadcast <teks>*
 𖹭𖹭 *${usedPrefix}bc <teks>*
 𖹭𖹭 *${usedPrefix}cheat*
 𖹭𖹭 *${usedPrefix}cleartmp*
 𖹭𖹭 *${usedPrefix}delprem <@user>*
 𖹭𖹭 *${usedPrefix}dsowner*
 𖹭𖹭 *${usedPrefix}$*
 𖹭𖹭 *${usedPrefix}fetch*
 𖹭𖹭 *${usedPrefix}get*
 𖹭𖹭 *${usedPrefix}getplugin *<nombre>***
 𖹭𖹭 *${usedPrefix}nuevabiobot <teks>*
 𖹭𖹭 *${usedPrefix}nuevafotobot *<imagen>***
 𖹭𖹭 *${usedPrefix}nuevonombrebot <teks>*
 𖹭𖹭 *${usedPrefix}prefix [prefix]*
 𖹭𖹭 *${usedPrefix}resetprefix*
 𖹭𖹭 *${usedPrefix}restart*
 𖹭𖹭 *${usedPrefix}saveplugin nombre*
 𖹭𖹭 *${usedPrefix}update*
 𖹭𖹭 *${usedPrefix}actualizar*
 𖹭𖹭 *${usedPrefix}>*
 𖹭𖹭 *${usedPrefix}=>*
 𖹭𖹭 *${usedPrefix}resetpersonajes*

---
 ⧠⭔ *STAFF MICHI* ⭔⧠
 ❣ Comandos para el staff de Megumin.
 𖹭𖹭 *${usedPrefix}autoadmin*
 𖹭𖹭 *${usedPrefix}banchat*
 𖹭𖹭 *${usedPrefix}banuser <@tag> <razón>*
 𖹭𖹭 *${usedPrefix}grupocrear <nombre>*
 𖹭𖹭 *${usedPrefix}ip <alamat ip>*
 𖹭𖹭 *${usedPrefix}join <link>*
 𖹭𖹭 *${usedPrefix}unbanchat*
 𖹭𖹭 *${usedPrefix}unbanuser <@tag>*

---
 ⧠⭔ *AUDIOS* ⭔⧠
 ❣ Comandos para modificar audios.
 𖹭𖹭 *${usedPrefix}bass [vn]*
 𖹭𖹭 *${usedPrefix}blown [vn]*
 𖹭𖹭 *${usedPrefix}deep [vn]*
 𖹭𖹭 *${usedPrefix}earrape [vn]*
 𖹭𖹭 *${usedPrefix}fast [vn]*
 𖹭𖹭 *${usedPrefix}fat [vn]*
 𖹭𖹭 *${usedPrefix}nightcore [vn]*
 𖹭𖹭 *${usedPrefix}reverse [vn]*
 𖹭𖹭 *${usedPrefix}robot [vn]*
 𖹭𖹭 *${usedPrefix}slow [vn]*
 𖹭𖹭 *${usedPrefix}smooth [vn]*
 𖹭𖹭 *${usedPrefix}tupai [vn]*

---
 ⧠⭔ *IA* ⭔⧠
 ❣ Comandos de inteligencia artificial.
 𖹭𖹭 *${usedPrefix}bard*
 𖹭𖹭 *${usedPrefix}chatgpt <texto>*
 𖹭𖹭 *${usedPrefix}ia <texto>*
 𖹭𖹭 *${usedPrefix}dalle*
 𖹭𖹭 *${usedPrefix}remini*

---
 ⧠⭔ *CONVERTIDORES* ⭔⧠
 ❣ Comandos para convertir archivos.
 𖹭𖹭 *${usedPrefix}togifaud*
 𖹭𖹭 *${usedPrefix}tourl*
 𖹭𖹭 *${usedPrefix}tovideo*

> ${dev}`.trim()

await conn.sendMessage(m.chat, { video: { url: vid.getRandom() }, caption: menu, contextInfo: { mentionedJid: [m.sender], isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1, }, forwardingScore: 999, externalAdReply: { title: '⏤͟͞ू⃪ ፝͜⁞M͢ᴇɢ፝֟ᴜᴍ⃨ɪɴ⃜✰⃔࿐', body: dev, thumbnailUrl: perfil, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false,
}, }, gifPlayback: true, gifAttribution: 0 }, { quoted: null })
await m.react(emojis)    

} catch (e) {
await m.reply(`✘ Ocurrió un error al enviar el menú\n\n${e}`)
await m.react(error)
}}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú', 'allmenú', 'allmenu', 'menucompleto'] 
handler.register = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
