const fs = require('fs');
const simih = JSON.parse(fs.readFileSync('./funções de cmd/grupos/simi.json'));


exports.insert = async(type, m) => {
let keyword = (type == 'conversation') ? m.message.conversation : (type == 'extendedTextMessage') ? m.message.extendedTextMessage.contextInfo.quotedMessage.conversation : ''
  
if (keyword.length > 40) return
if (keyword == '') return
  
async function check(key) {
let found = false
Object.keys(simih).forEach(i => {
if (simih[i].msg == key)
found = i
})
return found ? simih[found] : false
}
   
const verify = await check(keyword.toLowerCase())
if (type == 'conversation') {
if (verify) return 
simih.push({msg: m.message.conversation.toLowerCase(), messages: []})
fs.writeFileSync('./funções de cmd/grupos/simi.json', JSON.stringify(simih, null, 4))
} else if (type == 'extendedTextMessage') {
if (verify) {
verify.messages.push(m.message.extendedTextMessage.text.toLowerCase())
fs.writeFileSync('./funções de cmd/grupos/simi.json', JSON.stringify(simih, null, 4))
} else {
simih.push({msg: keyword.toLowerCase(), messages: [m.message.extendedTextMessage.text.toLowerCase()]})
fs.writeFileSync('./funções de cmd/grupos/simi.json', JSON.stringify(simih, null, 4))
}
}
}

exports.response = async(key) => {
let position = false
Object.keys(simih).forEach(i => {
if (simih[i].msg == key.toLowerCase())
position = i
})
return position ? simih[position].messages[Math.floor(Math.random() * simih[position].messages.length)] : false
}