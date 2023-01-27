const fs = require('fs');
const votacao = JSON.parse(fs.readFileSync('./dados/duelo/votacaoduelo.json'))

const sleep = async (ms) => {
return new Promise(
resolve => setTimeout(resolve ,  ms)
)
}

const delVotoDuelo = (ID) => {
pesquisar = ID
processo = votacao.indexOf(pesquisar)
while(processo >= 0) {
votacao.splice(processo ,  1)
processo = votacao.indexOf(pesquisar)
}
fs.writeFileSync(`./dados/duelo/votacaoduelo.json` ,  JSON.stringify(votacao))
fs.unlinkSync(`./dados/duelo/votos/${ID}.json`)
fs.unlinkSync(`./dados/duelo/P_votos/${ID}.json`)
}

const addVotoDuelo = async(ID , _valor1 , _valor2 , _valor3, _valor4 , reply) => {
votacao.push(ID)
fs.writeFileSync(`./dados/duelo/P_votos/${ID}.json` , '[]')
fs.writeFileSync(`./dados/duelo/votos/${ID}.json` , '[]')
fs.writeFileSync('./dados/duelo/votacaoduelo.json' ,  JSON.stringify(votacao))
await sleep(2000)
let votos = JSON.parse(fs.readFileSync(`./dados/duelo/votos/${ID}.json`))
votos.push({
razao: _valor1 ? _valor1 : '-' ,
votos: _valor2.trim() + '@s.whatsapp.net' ,
votos2: _valor3.trim() + '@s.whatsapp.net',
duracao: _valor4
})
fs.writeFileSync(`./dados/duelo/votos/${ID}.json` ,  JSON.stringify(votos))
setTimeout( async function() {
voto = JSON.parse(fs.readFileSync(`./dados/duelo/P_votos/${ID}.json`))
let verdade = voto.filter(dds => dds.votacao == '1')
let falso = voto.filter(dds => dds.votacao == '2')
reply(`Votação encerrada.\n\nTotal de votos pro 1° Participante:  ${verdade.length}.\nTotal de votos pro 2° Participante:  ${falso.length}`)
fs.unlinkSync(`./dados/duelo/votos/${ID}.json`)
fs.unlinkSync(`./dados/duelo/P_votos/${ID}.json`)
fs.writeFileSync(`./dados/duelo/votacaoduelo.json` ,  JSON.stringify(votacao))
} ,  _valor4 * 60 * 1000)
}

module.exports = {
delVotoDuelo ,
addVotoDuelo
}
