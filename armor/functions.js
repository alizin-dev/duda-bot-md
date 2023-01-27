const fetch = require('node-fetch')
const fs = require('fs')
const axios = require('axios')
const cfonts = require('cfonts')
const spin = require('spinnies')
const Crypto = require('crypto')
const chalk = require('chalk')
const exec = require("child_process").exec
const log = console.debug
const cheerio = require('cheerio')

var corzinhas = ["red","green","yellow","blue","magenta","cyan","white","gray","redBright","greenBright","yellowBright","blueBright","magentaBright","cyanBright","whiteBright"]
const cor1 = corzinhas[Math.floor(Math.random() * (corzinhas.length))]	
const cor2 = corzinhas[Math.floor(Math.random() * (corzinhas.length))]	
const cor3 = corzinhas[Math.floor(Math.random() * (corzinhas.length))]	
const cor4 = corzinhas[Math.floor(Math.random() * (corzinhas.length))]	
const cor5 = corzinhas[Math.floor(Math.random() * (corzinhas.length))]	

const ceemde = JSON.parse(fs.readFileSync('./datab/data/totalcmd.json'))
const dindin = JSON.parse(fs.readFileSync('./datab/usuarios/dindin.json'))

const h2k = (number) => {
    var SI_POSTFIXES = ["", " K", " M", " G", " T", " P", " E"]
    var tier = Math.log10(Math.abs(number)) / 3 | 0
    if(tier == 0) return number
    var postfix = SI_POSTFIXES[tier]
    var scale = Math.pow(10, tier * 3)
    var scaled = number / scale
    var formatted = scaled.toFixed(1) + ''
    if (/\.0$/.test(formatted))
      formatted = formatted.substr(0, formatted.length - 2)
    return formatted + postfix
}

const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		});
		return res.data;
	} catch (e) {
		console.log(`Error : ${e}`);
	}
};

const randomBytes = (length) => {
    return Crypto.randomBytes(length);
};

const generateMessageID = () => {
    return randomBytes(10).toString('hex').toUpperCase();
};

const getGroupAdmins = (participants) => {
	admins = [];
	for (let i of participants) {
		i.isAdmin ? admins.push(i.jid) : '';
	}
	return admins;
};

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`;
};

/*
  
 
*/
const spinner = { 
  "interval": 150,
  "frames": [
"A",
"AQ",
"AQU",
"AQUA",
"AQUA BOT V1",
  ]}

let globalSpinner;

const getGlobalSpinner = () => {
  if(!globalSpinner) globalSpinner = new spin({ color: 'white', succeedColor: 'red', spinner});
  return globalSpinner;
}

spins = getGlobalSpinner(false)

const start = (id, text) => {
	spins.add(id, {text: text})
	}
const info = (id, text) => {
	spins.update(id, {text: text})
}
const success = (id, text) => {
	spins.succeed(id, {text: text})

	}

const close = (id, text) => {
	spins.fail(id, {text: text})
}

const banner = cfonts.render(('AQUA BOT V1'), {
    font: 'block',
    align: 'center',
    colors: [`white`],
    lineHeight: 4
  });

const banner2 = cfonts.render(('By: - AKAME - '), {
    font: 'chrome',
    align: 'center',
    colors: [`white`],
    lineHeight: 1
  });
 
const banner3 = cfonts.render((`AQUA BOT V 1.1`), {
font: 'simple',
color: 'system',
align: 'center',
colors: [`white`],
lineHeight: 0
});  
  
			
const addATM = (sender) => {
        	const obj = {id: sender, dindin : 0}
            dindin.push(obj)
            fs.writeFileSync('./datab/usuarios/dindin.json', JSON.stringify(dindin))
        }
        
        const addKoinUser = (sender, amount) => {
            let position = false
            Object.keys(dindin).forEach((i) => {
                if (dindin[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                dindin[position].dindin += amount
                fs.writeFileSync('./datab/usuarios/dindin.json', JSON.stringify(dindin))
            }
        }
       
        const checkATMuser = (sender) => {
        	let position = false
            Object.keys(dindin).forEach((i) => {
                if (dindin[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return dindin[position].dindin
            }
        }

function temporizador(segundos){
  function tempo(s){
    return (s < 10 ? '0' : '') + s;
  }
  var horas = Math.floor(segundos / (60*60));
  var minutos = Math.floor(segundos % (60*60) / 60);
  var segundos = Math.floor(segundos % 60);
  return `${tempo(horas)}:${tempo(minutos)}:${tempo(segundos)}`;
}

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
	return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

function recognize(filename, config = {}) {
  const options = getOptions(config)
  const binary = config.binary || "tesseract"

  const command = [binary, `"${filename}"`, "stdout", ...options].join(" ")
  if (config.debug) log("command", command)

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (config.debug) log(stderr)
      if (error) reject(error)
      resolve(stdout)
    })
  })
}

function getOptions(config) {
  const ocrOptions = ["tessdata-dir", "user-words", "user-patterns", "psm", "oem", "dpi"]

  return Object.entries(config)
    .map(([key, value]) => {
      if (["debug", "presets", "binary"].includes(key)) return
      if (key === "lang") return `-l ${value}`
      if (ocrOptions.includes(key)) return `--${key} ${value}`

      return `-c ${key}=${value}`
    })
    .concat(config.presets)
    .filter(Boolean)
}

const cmdadd = () => {
	ceemde[0].totalcmd += 1
	fs.writeFileSync('./datab/data/totalcmd.json', JSON.stringify(ceemde))
}

authorname = 'AQUA BOT V1'
packname = '-JR-'
  
function addMetadata(packname, author) {	
if (!packname) packname = 'AQUA BOT V1'; if (!author) author = '@AquaBot.wpp';	
author = author.replace(/[^a-zA-Z0-9]/g, '');	
let name = `${author}_${packname}`
if (fs.existsSync(`./armor/stickers/${name}.exif`)) return `./armor/stickers/${name}.exif`
const json = {	
"sticker-pack-name": packname,
"sticker-pack-publisher": author,
}
const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	
let len = JSON.stringify(json).length	
let last	
if (len > 256) {	
len = len - 256	
bytes.unshift(0x01)	
} else {	
bytes.unshift(0x00)	
}	
if (len < 16) {	
last = len.toString(16)	
last = "0" + len	
} else {	
last = len.toString(16)	
}	
const buf2 = Buffer.from(last, "hex")	
const buf3 = Buffer.from(bytes)	
const buf4 = Buffer.from(JSON.stringify(json))	
const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	
fs.writeFile(`./armor/stickers/${name}.exif`, buffer, (err) => {	
return `./armor/stickers/${name}.exif`	
})	
}


const usedCommandRecently = new Set()

chyt = `558198923680@s.whatsapp.net`

const isFiltered = (userId) => !!usedCommandRecently.has(userId)

const addFilter = (userId) => {
    usedCommandRecently.add(userId)
    setTimeout(() => usedCommandRecently.delete(userId), 2000) 
}

const daily = JSON.parse(fs.readFileSync('./datab/diario.json'))

const addLimit = (userId, _dir) => {
    const obj = { id: userId, time: Date.now() }
    _dir.push(obj)
    fs.writeFileSync('./datab/diario.json', JSON.stringify(_dir))
}

const getLimit = (userId, _dir) => {
    let position = false
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
        }
    })
    if (position !== false) {
        return _dir[position].time
    }
}  

module.exports = { getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, banner, banner2, close, addATM, addKoinUser, checkATMuser, temporizador, color, recognize, bgcolor, cmdadd, isFiltered, addFilter, addLimit, getLimit, banner3, addMetadata, chyt }
