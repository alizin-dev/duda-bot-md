const axios = require('axios')
const cheerio = require('cheerio')

const mediafire = async(url) => {
const res = await axios.get(`${url.split('?dkey')[0]}`)
const $ = cheerio.load(res.data)
const array = []
const link = $('a#downloadButton').attr('href')
const peso = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '')
const nome = `${decodeURI(link.split('/')[5]).replaceAll("+", " ").replaceAll("%2B", "+").replaceAll("%26", "&")}`
const tipo = `${nome.split('.').pop()}`

array.push({
    nome, tipo, peso, link
})
return array
}


module.exports = {
    mediafire
}