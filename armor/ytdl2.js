const {
spawn,
exec,
execSync 
} = require('child_process')
const fetch = require('node-fetch')
const { JSDOM } = require('jsdom')
const path = require('path')
const util = require('util')
const fs = require('fs')
const moment = require('moment-timezone')
const time = moment().format('DD/MM HH:mm:ss')
const { color, bgcolor } = require('./color')
const { Readable, Writable } = require('stream')
const FormData = require('form-data')
const axios = require("axios")
const cheerio = require("cheerio")
const { fromBuffer } = require('file-type')
const qs = require('qs')


const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/

 async function styleText(text) {
let res = await fetch('http://qaz.wtf/u/convert.cgi?text=' + encodeURIComponent(text))
let html = await res.text()
let dom = new JSDOM(html)
let table = dom.window.document.querySelector('table').children[0].children
let obj = {}
for (let tr of table) {
let name = tr.querySelector('.aname').innerHTML
let content = tr.children[1].textContent.replace(/^\n/, '').replace(/\n$/, '')
obj[name + (obj[name] ? ' Reversed' : '')] = content
}
return obj
}
function INFOLOG(info) {
    return console.log(info)
}

function post(url, formdata) {
    INFOLOG(Object.keys(formdata).map(key => `${key}=${encodeURIComponent(formdata[key])}`).join('&'))
    return fetch(url, {
        method: 'POST',
        headers: {
            accept: "*/*",
            'accept-language': "en-US,en;q=0.9",
            'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: Object.keys(formdata).map(key => `${key}=${encodeURIComponent(formdata[key])}`).join('&')
    })
}

function ytv(url) {
    return new Promise((resolve, reject) => {
        if (ytIdRegex.test(url)) {
            let ytId = ytIdRegex.exec(url)
            url = 'https://youtu.be/' + ytId[1]
            post('https://www.y2mate.com/mates/en60/analyze/ajax', {
                url,
                q_auto: 0,
                ajax: 1
            })
                .then(res => res.json())
                .then(res => {
                    INFOLOG('Scraping...')
                    document = (new JSDOM(res.result)).window.document
                    yaha = document.querySelectorAll('td')
                    filesize = yaha[yaha.length - 20].innerHTML
                    id = /var k__id = "(.*?)"/.exec(document.body.innerHTML) || ['', '']
                    thumb = document.querySelector('img').src
                    title = document.querySelector('b').innerHTML

                    post('https://www.y2mate.com/mates/en60/convert', {
                        type: 'youtube',
                        _id: id[1],
                        v_id: ytId[1],
                        ajax: '1',
                        token: '',
                        ftype: 'mp4',
                        fquality: 360
                    })
                        .then(res => res.json())
                        .then(res => {
                            let KB = parseFloat(filesize) * (1000 * /MB$/.test(filesize))
                            resolve({
                                dl_link: /<a.+?href="(.+?)"/.exec(res.result)[1],
                                thumb,
                                title,
                                filesizeF: filesize,
                                filesize: KB
                            })
                        }).catch(reject)
                }).catch(reject)
        } else reject('URL INVALID')
    })
}

function yta(url) {
    return new Promise((resolve, reject) => {
        if (ytIdRegex.test(url)) {
            let ytId = ytIdRegex.exec(url)
            url = 'https://youtu.be/' + ytId[1]
            post('https://www.y2mate.com/mates/en60/analyze/ajax', {
                url,
                q_auto: 0,
                ajax: 1
            })
                .then(res => res.json())
                .then(res => {
                    let document = (new JSDOM(res.result)).window.document
                    let type = document.querySelectorAll('td')
                    let filesize = type[type.length - 11].innerHTML
                    let id = /var k__id = "(.*?)"/.exec(document.body.innerHTML) || ['', '']
                    let thumb = document.querySelector('img').src
                    let title = document.querySelector('b').innerHTML

                    post('https://www.y2mate.com/mates/en60/convert', {
                        type: 'youtube',
                        _id: id[1],
                        v_id: ytId[1],
                        ajax: '1',
                        token: '',
                        ftype: 'mp3',
                        fquality: 128
                    })
                        .then(res => res.json())
                        .then(res => {
                            let KB = parseFloat(filesize) * (1000 * /MB$/.test(filesize))
                            resolve({
                                dl_link: /<a.+?href="(.+?)"/.exec(res.result)[1],
                                thumb,
                                title,
                                filesizeF: filesize,
                                filesize: KB
                            })
                        }).catch(reject)
                }).catch(reject)
        } else reject('URL INVALID')
    })
}

async function ytsr(query) {
    let link = /youtube\.com\/results\?search_query=/.test(query) ? query : ('https://youtube.com/results?search_query=' + encodeURIComponent(query))
    let res = await fetch(link)
    let html = await res.text()
    let data = new Function('return ' + /var ytInitialData = (.+)/.exec(html)[1])()
    let lists = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents
    let formatList = {
        query,
        link,
        items: []
    }
    for (let list of lists) {
        let type = {
            videoRenderer: 'video',
            shelfRenderer: 'playlist',
            radioRenderer: 'live',
            channelRenderer: 'channel',
            showingResultsForRenderer: 'typo',
            horizontalCardListRenderer: 'suggestionCard',
        }[Object.keys(list)[0]] || ''
        let content = list[Object.keys(list)[0]] || {}
        if (content) {
            switch (type) {
                case 'typo':
                    formatList.correctQuery = content.correctedQuery.runs[0].text
                    break
                case 'video':
                    formatList.items.push({
                        type,
                        title: content.title.runs[0].text.replace('â€’', '‒'),
                        views: content.viewCountText.simpleText,
                        description: content.descriptionSnippet ? content.descriptionSnippet.runs[0].text.replace('Â ...', ' ...') : '',
                        duration: content.lengthText ? [content.lengthText.simpleText, content.lengthText.accessibility.accessibilityData.label] : ['', ''],
                        thumbnail: content.thumbnail.thumbnails,
                        link: 'https://youtu.be/' + content.videoId,
                        videoId: content.videoId,
                        author: {
                            name: content.ownerText.runs[0].text,
                            link: content.ownerText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url,
                            thumbnail: content.channelThumbnailWithLinkRenderer ? content.channelThumbnailWithLinkRenderer.thumbnail.thumbnails : [],
                            verified: content.ownerBadges && /BADGE_STYLE_TYPE_VERIFIED/.test(content.ownerBadges[0].metadataBadgeRenderer.style) ? /BADGE_STYLE_TYPE_VERIFIED_ARTIST/.test(content.ownerBadges[0].metadataBadgeRenderer.style) ? 'artist' : true : false
                        }
                    })
                    break
                case 'channel':
                    formatList.items.push({
                        type,
                        title: content.title ? content.title.simpleText.replace('â€’', '‒') : '',
                        description: content.descriptionSnippet ? content.descriptionSnippet.runs[0].text.replace('Â ...', ' ...') : '',
                        videoCount: content.videoCountText ? content.videoCountText.runs[0].text : '',
                        thumbnail: content.thumbnail.thumbnails,
                        subscriberCount: content.subscriberCountText ? content.subscriberCountText.simpleText.replace('Â ', ' ') : '',
                        link: 'https://youtube.com' + content.navigationEndpoint.commandMetadata.webCommandMetadata.url,
                        verified: content.ownerBadges && /BADGE_STYLE_TYPE_VERIFIED/.test(content.ownerBadges[0].metadataBadgeRenderer.style) ? /BADGE_STYLE_TYPE_VERIFIED_ARTIST/.test(content.ownerBadges[0].metadataBadgeRenderer.style) ? 'artist' : true : false
                    })
                    break
                case 'playlist':
                    formatList.items.push({
                        type,
                        title: content.title.simpleText.replace('â€’', '‒'),
                    })
                    break
            }
        }
    }
    return formatList
}

function baseURI(buffer = Buffer.from([]), metatype = 'text/plain') {
    return `data:${metatype};base64,${buffer.toString('base64')}`
}

/**
 * Writable Stream Callback
 * @callback WritableStreamCallback
 * @param {WritableStream} stream 
 */

/**
 * Convert Writable Stream to Buffer
 * @param {WritableStreamCallback} cb Callback with stream
 * @returns {Promise<Buffer>}
 */
function stream2Buffer(cb = noop) {
    return new Promise(resolve => {
        let write = new Writable()
        write.data = []
        write.write = function (chunk) {
            this.data.push(chunk)
        }
        write.on('finish', function () {
            resolve(Buffer.concat(this.data))
        })

        cb(write)
    })
}

/**
 * Convert Buffer to Readable Stream
 * @param {Buffer} buffer
 * @returns {ReadableStream}
 */
function buffer2Stream(buffer) {
    return new Readable({
        read() {
            this.push(buffer)
            this.push(null)
        }
    })
}




function ythd(url) {
    return new Promise((resolve, reject) => {
        if (ytIdRegex.test(url)) {
            let ytId = ytIdRegex.exec(url)
            url = 'https://youtu.be/' + ytId[1]
            post('https://www.y2mate.com/mates/en60/analyze/ajax', {
                url,
                q_auto: 0,
                ajax: 1
            })
                .then(res => res.json())
                .then(res => {
                    document = (new JSDOM(res.result)).window.document
                    yaha = document.querySelectorAll('td')
                    filesize = yaha[yaha.length - 23].innerHTML
                    id = /var k__id = "(.*?)"/.exec(document.body.innerHTML) || ['', '']
                    thumb = document.querySelector('img').src
                    title = document.querySelector('b').innerHTML

                    post('https://www.y2mate.com/mates/en60/convert', {
                        type: 'youtube',
                        _id: id[1],
                        v_id: ytId[1],
                        ajax: '1',
                        token: '',
                        ftype: 'mp4',
                        fquality: 720
                    })
                        .then(res => res.json())
                        .then(res => {
                            let KB = parseFloat(filesize) * (1000 * /MB$/.test(filesize))
                            resolve({
                                dl_link: /<a.+?href="(.+?)"/.exec(res.result)[1],
                                thumb,
                                title,
                                filesizeF: filesize,
                                filesize: KB
                            })
                        }).catch(reject)
                }).catch(reject)
        } else reject('URL INVALID')
    })
}       





function igdl(url_media) {
    return new Promise((resolve,reject)=>{
        url_media = url_media.replace("reel", "p")
        var url = "https://igram.io/i/"
        const requestBody = {
            url: url_media.replace("reel", "p"),
            lang_code: "en"
        }

        const config = {
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36 Edg/89.0.774.75', 
                'x-requested-with': ' XMLHttpRequest', 
                'origin': ' https://igram.io', 
                'referer': ' https://igram.io/en/dl/', 
                'sec-fetch-dest': ' empty', 
                'sec-fetch-mode': ' cors', 
                'sec-fetch-site': ' same-origin', 
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Cookie': '__cfduid=d4c2ddc2229a4d74c28b6ba25cdcd2a181618175605'
              },
        }

        axios.post(url, qs.stringify(requestBody), config).then(result => {
            let $ = cheerio.load(result.data), ig = []
            //Obter todos os links de videos da pagina carregada
            $('[data-mediatype=Video]').each((i, element) => {
                let cheerioElement = $(element)
                ig.push(cheerioElement.attr("href"))
            })
            //Obter todos os links de imagem da pagina carregada
            $('div > div.bg-white.border.rounded-sm.max-w-md > img').each((i, element) => {
                let cheerioElement = $(element)
                ig.push(cheerioElement.attr("src"))
            })

            resolve({
                results_number : ig.length,
                url_list: ig
            })
        }).catch(err=>{
            console.log(err.response)
            reject(err)
        })
    })
}
function upload (media)  {
    return new Promise(async (resolve, reject) => {
    try {
        let { ext } = await fromBuffer(media)
        console.log('Uploading image to server telegra.ph')
        let form = new FormData()
        form.append('file', media, 'tmp.' + ext)
        await fetch('https://telegra.ph/upload', {
            method: 'POST',
            body: form
        })
        .then(res => res.json())
        .then(res => {
            if (res.error) return reject(res.error)
            resolve('https://telegra.ph' + res[0].src)
        })
        .catch(err => reject(err))
    } catch (e) {
        return console.log(e)
    }
})
}


function formatDate(n, locale = 'id') {
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
/**
 * No Operation
 *  */
function noop() { }

module.exports.styleText = styleText
module.exports.baseURI = baseURI
module.exports.ytsr = ytsr
module.exports.yta = yta
module.exports.ytv = ytv
module.exports.igdl = igdl
module.exports.upload = upload
module.exports.buffer2Stream = buffer2Stream
module.exports.stream2Buffer = stream2Buffer
module.exports.noop = noop
module.exports.ythd = ythd
module.exports.formatDate = formatDate











