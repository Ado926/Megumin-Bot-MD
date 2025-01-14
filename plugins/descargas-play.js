import fetch from 'node-fetch';
import yts from 'yt-search';
import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `💣 Ingresa el nombre de la música a descargar.`, m);
    }

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('No se encontraron resultados para tu búsqueda.');
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url } = videoInfo;
    const vistas = formatViews(views);
    const infoMessage = `✨ *Titulo:* ${title}\n⌛ *Duración:* ${timestamp}\n👀 *Vistas:* ${vistas}\n💡 *Canal:* ${videoInfo.author.name || 'Desconocido'}\n📆 *Publicado:* ${ago}\n⛓️ *Url:* ${url}`;
    const thumb = (await conn.getFile(thumbnail))?.data;

    const JT = {
      contextInfo: {
        externalAdReply: {
          title: packname,
          body: dev,
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

    if (command === 'play') {
      try {
        const apiUrl = `https://delirius-apiofc.vercel.app/download/ytmp3?url=${url}`;
        const response = await axios.get(apiUrl);
        const { download } = response.data.data;

        if (download && download.url) {
          await conn.sendMessage(m.chat, { audio: { url: download.url }, mimetype: "audio/mpeg" }, { quoted: m });
        } else {
          throw new Error('URL de descarga no encontrada');
        }
      } catch (error) {
        return m.reply(`🪛 *Error:* ${error.message}`);
      }
    } else if (command === 'play2' || command === 'ytmp4') {
      try {
        const apiUrl = `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`;
        const response = await axios.get(apiUrl);
        const { download } = response.data.data;

        if (download && download.url) {
          await conn.sendMessage(m.chat, {
            video: { url: download.url },
            mimetype: "video/mp4",
          }, { quoted: m });
        } else {
          throw new Error('URL de descarga no encontrada');
        }
      } catch (error) {
        return m.reply(`🪛 *Error:* ${error.message}`);
      }
    } else {
      throw "Comando no reconocido.";
    }
  } catch (error) {
    return m.reply(`🪛 *Error:* ${error.message}`);
  }
};

handler.command = handler.help = ['play', 'ytmp4', 'play2'];
handler.tags = ['downloader'];

export default handler;

function formatViews(views) {
  if (views && views >= 1000) {
    return (views / 1000).toFixed(1) + 'k (' + views.toLocaleString() + ')';
  } else if (views) {
    return views.toString();
  } else {
    return '0';
  }
}