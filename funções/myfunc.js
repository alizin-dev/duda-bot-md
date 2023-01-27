const { proto, delay, getContentType } = require('@adiwajshing/baileys')
const chalk = require('chalk')
const fs = require('fs')
const Crypto = require('crypto')
const axios = require('axios')
const moment = require('moment-timezone')
const util = require('util')
const Jimp = require('jimp')
const cheerio = require('cheerio')
const mimetype = require('mime-types')
const { defaultMaxListeners } = require('stream')
const _level = JSON.parse(fs.readFileSync('./funções de cmd/usuarios/level.json'))


const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1000)

exports.unixTimestampSeconds = unixTimestampSeconds

exports.generateMessageTag = (epoch) => {
    let tag = (0, exports.unixTimestampSeconds)().toString();
    if (epoch)
        tag += '.--' + epoch; // attach epoch if provided
    return tag;
}

exports.processTime = (timestamp, now) => {
	return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

exports.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

exports.getBuffer = async (url, opcoes) => {
try {

opcoes ? opcoes : {}
const post = await axios({
method: "get",
url,
headers: {
    'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36', 
	'DNT': 1,
	'Upgrade-Insecure-Request': 1
},
...opcoes,
responseType: 'arraybuffer'
})

return post.data

} catch (erro) {
console.log(`Erro identificado: ${erro}`)
}
}

exports.fetchJson = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

exports.getExtension = async (type) => {
	return await mimetype.extension(type)
}

exports.getLevelingXp = (userId) => {
let position = false
Object.keys(_level).forEach((i) => {
if (_level[i].id === userId) {
position = i
}
})
if (position !== false) {
return _level[position].xp
}
}

exports.getLevelingLevel = (userId) => {
let position = false
Object.keys(_level).forEach((i) => {
if (_level[i].id === userId) {
position = i
}
})
if (position !== false) {
return _level[position].level
}
}        

exports.getLevelingId = (userId) => {
let position = false
Object.keys(_level).forEach((i) => {
if (_level[i].id === userId) {
position = i
}
})
if (position !== false) {
return _level[position].id
}
}

exports.addLevelingXp = (userId, amount) => {
let position = false
Object.keys(_level).forEach((i) => {
if (_level[i].id === userId) {
position = i
}
})
if (position !== false) {
_level[position].xp += amount
fs.writeFileSync('./funções de cmd/usuarios/level.json', JSON.stringify(_level))
}
}

exports.addLevelingLevel = (userId, amount) => {
let position = false
Object.keys(_level).forEach((i) => {
if (_level[i].id === userId) {
position = i
}
})
if (position !== false) {
_level[position].level += amount
fs.writeFileSync('./funções de cmd/usuarios/level.json', JSON.stringify(_level))
}
}

exports.addLevelingId = (userId) => {
const obj = {id: userId, xp: 1, level: 1}
_level.push(obj)
fs.writeFileSync('./funções de cmd/usuarios/level.json', JSON.stringify(_level))
}


exports.runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " DIA, " : " DIAS, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " HORA, " : " HORAS, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " MINUTO, " : " MINUTOS, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " SEGUNDO" : " SEGUNDOS") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

exports.clockString = (ms) => {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

exports.getTime = (format, date) => {
	if (date) {
		return moment(date).locale('id').format(format)
	} else {
		return moment.tz('Asia/Jakarta').locale('id').format(format)
	}
}

exports.formatDate = (n, locale = 'id') => {
	let d = new Date(n)
	return d.toLocaleDateString(locale, {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	})
}

exports.tanggal = (numer) => {
	myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
				myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum’at','Sabtu']; 
				var tgl = new Date(numer);
				var day = tgl.getDate()
				bulan = tgl.getMonth()
				var thisDay = tgl.getDay(),
				thisDay = myDays[thisDay];
				var yy = tgl.getYear()
				var year = (yy < 1000) ? yy + 1900 : yy; 
				const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
				let d = new Date
				let locale = 'id'
				let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
				let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
				
				return`${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
}


exports.Telesticker = async (url) => {
    return new Promise(async (resolve, reject) => {
        packName = url.replace("https://t.me/addstickers/", "")
        data = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`, {method: "GET",headers: {"User-Agent": "GoogleBot"}})
        const hasil = []
        for (let i = 0; i < data.data.result.stickers.length; i++) {
            fileId = data.data.result.stickers[i].thumb.file_id
            data2 = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
            result = {
            status: 200,
            url: "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + data2.data.result.file_path
            }
            hasil.push(result)
        }
    resolve(hasil)
    })
}


exports.jsonformat = (string) => {
    return JSON.stringify(string, null, 2)
}

function format(...args) {
	return util.format(...args)
}

exports.logic = (check, inp, out) => {
	if (inp.length !== out.length) throw new Error('Input and Output must have same length')
	for (let i in inp)
		if (util.isDeepStrictEqual(check, inp[i])) return out[i]
	return null
}

exports.generateProfilePicture = async (buffer) => {
	const jimp = await Jimp.read(buffer)
	const min = jimp.getWidth()
	const max = jimp.getHeight()
	const cropped = jimp.crop(0, 0, min, max)
	return {
		img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
		preview: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)
	}
}

exports.bytesToSize = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


exports.getSizeMedia = (path) => {
    return new Promise((resolve, reject) => {
        if (/http/.test(path)) {
            axios.get(path)
            .then((res) => {
                let length = parseInt(res.headers['content-length'])
                let size = exports.bytesToSize(length, 3)
                if(!isNaN(length)) resolve(size)
            })
        } else if (Buffer.isBuffer(path)) {
            let length = Buffer.byteLength(path)
            let size = exports.bytesToSize(length, 3)
            if(!isNaN(length)) resolve(size)
        } else {
            reject('error gatau apah')
        }
    })
}

exports.parseMention = (text = '') => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}


exports.getGroupAdmins = (participants) => {
admins = []
for (let i of participants) {
if(i.admin == 'admin') admins.push(i.id)
if(i.admin == 'superadmin') admins.push(i.id)
}
return admins
}

/**
 * Serialize Message
 * @param {WAConnection} conn 
 * @param {Object} m 
 * @param {store} store 
 */
exports.smsg = (conn, m, store) => {
    if (!m) return m
    let M = proto.WebMessageInfo
    if (m.key) {
        m.id = m.key.id
        m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
        m.chat = m.key.remoteJid
        m.fromMe = m.key.fromMe
        m.isGroup = m.chat.endsWith('@g.us')
        m.sender = conn.decodeJid(m.fromMe && conn.user.id || m.participant || m.key.participant || m.chat || '')
        if (m.isGroup) m.participant = conn.decodeJid(m.key.participant) || ''
    }
    if (m.message) {
         const altpdf = Object.keys(m.message)
        m.mtype = Object.keys(m.message)[0] == 'senderKeyDistributionMessage' ? Object.keys(m.message)[2] : (Object.keys(m.message)[0] == 'messageContextInfo') ? Object.keys(m.message)[1] : Object.keys(m.message)[0]
        m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype])
        let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null
        m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
        if (m.quoted) {
            let type = getContentType(quoted)
			m.quoted = m.quoted[type]
            if (['productMessage'].includes(type)) {
				type = getContentType(m.quoted)
				m.quoted = m.quoted[type]
			}
            if (typeof m.quoted === 'string') m.quoted = {
				text: m.quoted
			}
            m.quoted.mtype = type
            m.quoted.id = m.msg.contextInfo.stanzaId
			m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
            m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
			m.quoted.sender = conn.decodeJid(m.msg.contextInfo.participant)
			m.quoted.fromMe = m.quoted.sender === (conn.user && conn.user.id)
            m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
			m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
            m.getQuotedObj = m.getQuotedMessage = async () => {
			if (!m.quoted.id) return false
			let q = await store.loadMessage(m.chat, m.quoted.id, conn)
 			return exports.smsg(conn, q, store)
            }
            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    remoteJid: m.quoted.chat,
                    fromMe: m.quoted.fromMe,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {})
            })

            /**
             * 
             * @returns 
             */
            m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key })

	   /**
		* 
		* @param {*} jid 
		* @param {*} forceForward 
		* @param {*} options 
		* @returns 
	   */
            m.quoted.copyNForward = (jid, forceForward = false, options = {}) => conn.copyNForward(jid, vM, forceForward, options)

            /**
              *
              * @returns
            */
            m.quoted.download = () => conn.downloadMediaMessage(m.quoted)
        }
    }

    m.reply = (text, chatId = m.chat, options = {}) => Buffer.isBuffer(text) ? conn.sendMedia(chatId, text, 'file', '', m, { ...options }) : conn.sendText(chatId, text, m, { ...options })
    /**
	* Copy this message
	*/
	m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)))

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} forceForward 
	 * @param {*} options 
	 * @returns 
	 */
	m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => conn.copyNForward(jid, m, forceForward, options)

    return m
}


