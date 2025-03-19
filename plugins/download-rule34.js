/*
• @David-Chian
- https://github.com/David-Chian
*/

import { googleImage } from '@bochilteam/scraper';
import baileys from '@whiskeysockets/baileys';

async function sendAlbumMessage(jid, medias, options = {}) {
    if (typeof jid !== "string") throw new TypeError(`jid must be string, received: ${jid}`);
    if (medias.length < 2) throw new RangeError("Se necesitan al menos 2 imágenes para un álbum");

    const caption = options.text || options.caption || "";
    const delay = !isNaN(options.delay) ? options.delay : 500;
    delete options.text;
    delete options.caption;
    delete options.delay;

    const album = baileys.generateWAMessageFromContent(
        jid,
        { messageContextInfo: {}, albumMessage: { expectedImageCount: medias.length } },
        {}
    );

    await conn.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id });

    for (let i = 0; i < medias.length; i++) {
        const { type, data } = medias[i];
        const img = await baileys.generateWAMessage(
            album.key.remoteJid,
            { [type]: data, ...(i === 0 ? { caption } : {}) },
            { upload: conn.waUploadToServer }
        );
        img.message.messageContextInfo = {
            messageAssociation: { associationType: 1, parentMessageKey: album.key },
        };
        await conn.relayMessage(img.key.remoteJid, img.message, { messageId: img.key.id });
        await baileys.delay(delay);
    }
    return album;
}

const megumin = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `*💜 Uso Correcto: ${usedPrefix + command} Kotori*`, m);

    await m.react('⏳');
    conn.reply(m.chat, '💜 *Descargando su imagen...*', m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: wm,
previewType: 0, thumbnail: icons,
sourceUrl: channel }}})

    try {
        const res = await googleImage(text);
        const images = [];

        for (let i = 0; i < 10; i++) {
            const image = await res.getRandom();
            if (image) images.push({ type: "image", data: { url: image } });
        }

        if (images.length < 2) return conn.reply(m.chat, '❌ No se encontraron suficientes imágenes para un álbum.', m);

        const caption = `💜 *Resultados de búsqueda para:* ${text}`;
        await sendAlbumMessage(m.chat, images, { caption, quoted: m });

        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('❌');
        conn.reply(m.chat, '⚠️ Hubo un error al obtener las imágenes.', m);
    }
};

megumin.help = ['imagen <query>'];
megumin.tags = ['buscador', 'tools', 'descargas'];
megumin.command = /^(gimage|image|imagen)$/i;
megumin.register = true;

export default megumin;

import fetch from 'node-fetch';
import baileys from '@whiskeysockets/baileys';
import fs from 'fs/promises';
import path from 'path';

const dbFilePath = path.resolve('./sentUrls.json');

const readDb = async () => {
  try {
    const data = await fs.readFile(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return {};
    }
    throw err;
  }
};

const writeDb = async (data) => {
  try {
    await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    throw err;
  }
};

const cleanDb = async () => {
  const db = await readDb();
  const now = Date.now();
  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

  for (const [url, timestamp] of Object.entries(db)) {
    if (now - timestamp > THIRTY_DAYS) {
      delete db[url];
    }
  }

  await writeDb(db);
};

async function sendAlbumMessage(jid, medias, options = {}) {
  if (medias.length < 2) {
    throw new RangeError("Se necesitan al menos 2 medios para enviar un álbum.");
  }

  const caption = options.text || options.caption || "";
  const delay = !isNaN(options.delay) ? options.delay : 500;
  delete options.text;
  delete options.caption;
  delete options.delay;

  const album = baileys.generateWAMessageFromContent(
    jid,
    {
      messageContextInfo: {},
      albumMessage: {
        expectedImageCount: medias.filter(media => media.type === "image").length,
        expectedVideoCount: medias.filter(media => media.type === "video").length,
        ...(options.quoted
          ? {
              contextInfo: {
                remoteJid: options.quoted.key.remoteJid,
                fromMe: options.quoted.key.fromMe,
                stanzaId: options.quoted.key.id,
                participant: options.quoted.key.participant || options.quoted.key.remoteJid,
                quotedMessage: options.quoted.message,
              },
            }
          : {}),
      },
    },
    {}
  );

  await conn.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id });

  for (let i = 0; i < medias.length; i++) {
    const { type, data } = medias[i];
    const mediaMessage = await baileys.generateWAMessage(
      album.key.remoteJid,
      { [type]: data, ...(i === 0 ? { caption } : {}) },
      { upload: conn.waUploadToServer }
    );
    mediaMessage.message.messageContextInfo = {
      messageAssociation: { associationType: 1, parentMessageKey: album.key },
    };
    await conn.relayMessage(mediaMessage.key.remoteJid, mediaMessage.message, { messageId: mediaMessage.key.id });
    await baileys.delay(delay);
  }

  return album;
}

const handler = async (m, { conn, text }) => {
  if (!db.data.chats[m.chat].nsfw && m.isGroup) return m.reply('🚩 *¡Estos comandos están desactivados!*');
  if (!text) throw 'Por favor, proporciona un texto';

  try {
    conn.reply(m.chat, '🔥  *ENVIANDO SUS RESULTADOS..*', m);
    await cleanDb();
    conn.sendPresenceUpdate('composing', m.chat);

    const apiUrl = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${encodeURIComponent(text)}&json=1`;
    const response = await fetch(apiUrl);

    if (!response.ok) throw new Error('Error en la solicitud a la API');

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('No se encontraron imágenes');

    const db = await readDb();
    const newMedia = data.filter(post => !db[post.file_url]);

    if (newMedia.length === 0) throw new Error('No se encontraron nuevas imágenes para mostrar');

    const mediaToSend = newMedia
      .sort(() => 0.5 - Math.random())
      .slice(0, 10)
      .map(post => ({
        type: post.file_url.endsWith('.mp4') ? "video" : "image",
        data: { url: post.file_url }
      }));

    if (mediaToSend.length < 2) throw new Error('No se encontraron suficientes medios para enviar un álbum');

    await sendAlbumMessage(m.chat, mediaToSend, { caption: `✨ Resultados de: ${text}`, quoted: m });

    mediaToSend.forEach(media => {
      db[media.data.url] = Date.now();
    });

    await writeDb(db);

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `❌️ *OCURRIÓ UN ERROR:* ${error.message}`, m);
  }
};

handler.help = ['rule34'];
handler.tags = ['ai'];
handler.group = true;
handler.register = true;
handler.command = ['rule34', 'rule'];

export default handler;