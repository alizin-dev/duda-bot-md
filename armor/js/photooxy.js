const request = require("request");
const cheerio = require("cheerio");
//LINKS DAS IMG
const tema = {
  smoky: "https://photooxy.com/logo-and-text-effects/make-smoky-neon-glow-effect-343.html",
  semiterio: "https://photooxy.com/logo-and-text-effects/text-on-scary-cemetery-gate-172.html",
  ouro: "https://photooxy.com/other-design/create-metallic-text-glow-online-188.html",
  fogo: "https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html",
  shadow: "https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html",
  romantic: "https://photooxy.com/logo-and-text-effects/romantic-messages-for-your-loved-one-391.html",
  smoke: "https://photooxy.com/other-design/create-an-easy-smoke-type-effect-390.html",
  burnPapper: "https://photooxy.com/logo-and-text-effects/write-text-on-burn-paper-388.html",
  naruto: "https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html",
  loveMsg: "https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html" ,
  msgGrass: "https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html",
  doubleHeart: "https://photooxy.com/logo-and-text-effects/love-text-effect-372.html",
  coffeCup: "https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html",
  loveText: "https://photooxy.com/logo-and-text-effects/love-text-effect-372.html",
  butterFly: "https://photooxy.com/logo-and-text-effects/butterfly-text-with-reflection-effect-183.html",
  harryPotter:
"https://photooxy.com/logo-and-text-effects/create-harry-potter-text-on-horror-background-178.html",
  smokyNeon:
"https://photooxy.com/logo-and-text-effects/create-a-wolf-metal-text-effect-365.html",
  cup:
"https://photooxy.com/logo-and-text-effects/put-text-on-the-cup-387.html", 
  coffe2:
"https://photooxy.com/logo-and-text-effects/put-your-text-on-a-coffee-cup--174.html", 
  captain:
"https://photooxy.com/captain-america-text-generator-403.html", 
   glitch:
"https://photooxy.com/logo-and-text-effects/make-tik-tok-text-effect-375.html", 
  googlesg:
"https://photooxy.com/other-design/make-google-suggestion-photos-238.html", 
 neon2:
"https://photooxy.com/logo-and-text-effects/illuminated-metallic-effect-177.html", 
 tbit:
"https://photooxy.com/logo-and-text-effects/8-bit-text-on-arcade-rift-175.html", 
 madeira:
"https://photooxy.com/logo-and-text-effects/carved-wood-effect-online-171.html", 
 wooden:
"https://photooxy.com/logo-and-text-effects/writing-on-wooden-boards-368.html", 
 gold:
"https://photooxy.com/logo-and-text-effects/create-a-crisp-chromed-text-effect-196.html"
}
//FUNCTION
async function pSmoky(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.smoky,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}

async function pGold(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.gold,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}

async function pWooden(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.wooden,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}

async function pMadeira(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.madeira,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}


async function pNeon2(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.neon2,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}

async function pAwolfMetal(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.awolfMetal,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}


async function pCup(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.cup,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}


async function pCoffe2(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.coffe2,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}


async function pHarryPotter(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.harryPotter,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}

async function pSemi(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.semiterio,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}


async function pHarryPotter(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.harryPotter,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };

 request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}

async function pFogo(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.fogo,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}

async function pOuro(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.ouro,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}

async function pShadow(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.shadow,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}

async function pRomantic(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.romantic,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}

async function pSmoke(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.smoke,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}

async function pBurnPapper(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.burnPapper,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}

async function pNaruto(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.naruto,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_2: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}

async function pLoveMsg(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.loveMsg,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}

async function pMsgGrass(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.msgGrass,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}


async function pDoubleHeart(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.doubleHeart,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}

async function pCoffeCup(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.coffeCup,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}
async function pLoveText(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.loveText,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}

async function pCaptain(text1, text2) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.captain,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, text_2: text2, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}

async function pGlitch(text1, text2) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.glitch,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, text_2: text2, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}

async function p8Bit(text1, text2) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.tbit,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, text_2: text2, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}

async function pGooglesg(text1, text2, text3) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: tema.googlesg,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, text_2: text2, text_3: text3, login: 'OK' } };
    
    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
           url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}


async function pButterfly(text1) {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST', 
      url: tema.butterFly,
      headers: { 'content-type': 'application/x-www-from-urlencoded' },
      formData: { text_1: text1, login: 'OK' } };
      
    request(options, async function (error, response, body) {
    if (error) throw new Error(error);
    const $ = cheerio.load(body)
    const result = {
         url: $('div.btn-group > a').attr('href')
    }
    resolve(result);
    });
  })
}
//MODULOS
module.exports = {
  pSmoky,
  pSemi,
  pOuro,
  pFogo,
  pShadow,
  pRomantic,
  pSmoke,
  pBurnPapper,
  pNaruto,
  pLoveMsg,
  pMsgGrass,
  pDoubleHeart,
  pCoffeCup,
  pCoffe2,
  pLoveText,
  pHarryPotter,
  pAwolfMetal,
  pCup,
  pCaptain,
  pGlitch,
  pGooglesg, 
  pButterfly, 
  pNeon2,
  p8Bit,
  pMadeira,
  pWooden, 
  pGold };
//PHOOTOXY SEM PRECISAR DE API: Créditos:/SAYO\\
