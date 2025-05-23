import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import axios from 'axios'

let Reg = /|?(.*)([.|] ?)([0-9])$/i

let handler = async function (m, { conn, text }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)

  let delirius = await axios.get(`https://delirius-apiofc.vercel.app/tools/country?text=${PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international')}`)
  let paisdata = delirius.data.result
  let mundo = paisdata ? `${paisdata.name} ${paisdata.emoji}` : 'Desconocido'
  let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')

  let bio = 0, fechaBio
  let sinDefinir = '😿 Es privada'
  let biografia = await conn.fetchStatus(m.sender).catch(() => null)

  if (!biografia || !biografia[0] || biografia[0].status === null) {
    bio = sinDefinir
    fechaBio = "Fecha no disponible"
  } else {
    bio = biografia[0].status || sinDefinir
    fechaBio = biografia[0].setAt ? new Date(biografia[0].setAt).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" }) : "Fecha no disponible"
  }

  if (user.registered === true) throw '*『✦』Ya estás registrado. Usa #unreg para volver a registrarte.*'
  if (!Reg.test(text)) throw `*『✦』Formato incorrecto.*\n\nUsa:\n#reg *Nombre.edad*\n\n_Ejemplo:_\n#reg ${name2}.18`

  let [_, name, splitter, age] = text.match(Reg)

  if (!name) throw '*『✦』El nombre es obligatorio.*'
  if (!age) throw '*『✦』La edad es obligatoria.*'
  if (name.length >= 30) throw '*『✦』El nombre no debe tener más de 30 caracteres.*'

  age = parseInt(age)
  if (age > 999) throw '*『😏』Viejo/a sabroso/a*'
  if (age < 5) throw '*『🍼』¡Ven aquí, te adoptaré!*'

  user.name = name.trim()
  user.age = age
  user.descripcion = bio
  user.regTime = +new Date
  user.registered = true
  user.money += 5
  user.chocolates += 15
  user.exp += 245
  user.joincount += 12

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)
  m.react('📩')

  let regbot = `👤 𝗥 𝗘 𝗚 𝗜 𝗦 𝗧 𝗥 𝗢 👤
•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•
「💭」𝗡𝗼𝗺𝗯𝗿𝗲: ${name}
「✨️」𝗘𝗱𝗮𝗱: ${age} años
•┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄•
「🎁」𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗮𝘀:
• 15 Chocolates 🍫
• 5 MIchiCoins 🪙
• 245 Experiencia 💸
• 12 Tokens 💰`

  await conn.sendMessage(m.chat, {
    text: regbot,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        title: '¡Usᥙᥲrі᥆ rᥱgіs𝗍rᥲძ᥆!',
        body: '💥 ᴱˡ ᵇᵒᵗ ᵐᵃˢ ᵉˣᵖˡᵒˢᶦᵛᵒꜝꜝꜝ',
        previewType: "PHOTO",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  })
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler
