import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender];

  if (user.chocolates < 2) {
    return conn.reply(m.chat, `ꕥ No tienes suficientes *Chocolates*. Necesitas al menos 2 para usar este comando.`, m);
  }

  if (!text.trim()) {
    return conn.reply(m.chat, `✧ Ingresa el nombre de la música a descargar.`, m);
  }

  try {
    const search = await yts(text);
    const videoInfo = search.all?.[0];
    if (!videoInfo) {
      return conn.reply(m.chat, `✧ No se encontraron resultados para tu búsqueda.`, m);
    }

    const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;
    const vistas = formatViews(views);
    const canal = author?.name || 'Desconocido';

    const infoMessage = `
*╭─ YT PLAY 𝗜𝗻𝗳𝗼 ─╮*
┊> ☔ *Título:* ${title || 'Desconocido'}
┊> 🍁 *Duración:* ${timestamp || 'Desconocido'}
┊> 🌴 *Vistas:* ${vistas || 'Desconocido'}
┊> ☔ *Canal:* ${canal}
┊> 🍁 *Publicado:* ${ago || 'Desconocido'}
*╰───────────────🍁🌴☔╯*`;

    const thumb = (await conn.getFile(thumbnail))?.data;

    const JT = {
      contextInfo: {
        externalAdReply: {
          title: global.botname,
          body: global.dev,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    };

    await conn.reply(m.chat, infoMessage, m, JT);

    if (['play', 'mp3', 'playaudio'].includes(command)) {
      try {
        const api = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)).json();
        const result = api.result?.download?.url;

        if (!result) throw new Error('No se pudo generar el enlace de descarga del audio.');

        await conn.sendMessage(
          m.chat,
          { audio: { url: result }, fileName: `${api.result.title}.mp3`, mimetype: 'audio/mpeg' },
          { quoted: m }
        );
      } catch (e) {
        console.error('Error al enviar el audio:', e.message);
        return conn.reply(m.chat, '⚠︎ No se pudo enviar el audio. Puede ser demasiado pesado o hubo un error en la generación del enlace.', m);
      }

    } else if (['play2', 'mp4', 'playvideo'].includes(command)) {
      try {
        const json = await (await fetch(`https://api.vreden.my.id/api/ytmp4?url=${url}`)).json();
        const result = json.result?.download?.url;

        if (!result) throw new Error('No se pudo generar el enlace de descarga del video.');

        await conn.sendMessage(
          m.chat,
          {
            video: { url: result },
            fileName: json.result.title,
            mimetype: 'video/mp4',
            caption: global.dev,
          },
          { quoted: m }
        );
      } catch (e) {
        console.error('Error al enviar el video:', e.message);
        return conn.reply(m.chat, '⚠︎ No se pudo enviar el video. Puede ser demasiado pesado o hubo un error en la generación del enlace.', m);
      }

    } else {
      return conn.reply(m.chat, '⚠︎ Comando no reconocido.', m);
    }

    user.chocolates -= 2;
    conn.reply(m.chat, `ꕥ Has utilizado 2 *Chocolates*`, m);

  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, `⚠︎ Ocurrió un error: ${error.message}`, m);
  }
};

handler.command = handler.help = ['play', 'mp3', 'playaudio', 'play2', 'mp4', 'playvideo'];
handler.tags = ['downloader'];

export default handler;

function formatViews(views) {
  if (views == null) return "No disponible";

  if (views >= 1_000_000_000) {
    return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`;
  } else if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`;
  } else if (views >= 1_000) {
    return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`;
  }
  return views.toString();
}
