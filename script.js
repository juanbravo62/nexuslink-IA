const userEmailElement = document.getElementById("userEmail");
const usuarioLogado = localStorage.getItem("usuarioLogado");

if(!usuarioLogado){
    window.location.href = "login.html";
} else {
    userEmailElement.textContent = usuarioLogado;
}

function logout(){
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
}

if(!localStorage.getItem("usuarioLogado")){
window.location.href="login.html"
}

const API_KEY = "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"

async function gerarOferta(){

const produto = document.getElementById("produto").value
const valorReal = document.getElementById("valorReal").value
const valorPromo = document.getElementById("valorPromo").value
const loja = document.getElementById("loja").value
const cupom = document.getElementById("cupom").value
const link = document.getElementById("link").value


const prompt = `
Você é um especialista em marketing para grupos de WhatsApp.

Crie textos de oferta MUITO chamativos.

REGRAS IMPORTANTES:
- Escreva como se fosse um administrador de grupo de promoções
- Use muitos emojis
- Use emojis diferentes
- Use estilo viral de grupos de ofertas
- NÃO invente outro produto
- Use exatamente os dados abaixo

Produto: ${produto}
Preço normal: ${valorReal}
Preço promoção: ${valorPromo}
Loja: ${loja}
Cupom: ${cupom}
Link: ${link}

Formato exemplo:

🚨 PROMOÇÃO RELÂMPAGO 🚨

🔥 ${produto}

💰 De R$${valorReal}
💥 Hoje por R$${valorPromo}

🏪 Loja: ${loja}

🎟 Cupom: ${cupom}

⚡ Estoque quase acabando!

👉 COMPRAR AGORA
${link}

Crie 4 versões diferentes.

Use emojis como:
🔥💥🚨⚡🛒💰🎯🎉

Separe as respostas usando ###
`;


try{

const response = await fetch("https://api.groq.com/openai/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer " + API_KEY
},

body:JSON.stringify({

model:"llama-3.3-70b-versatile",

messages:[
{
role:"user",
content:prompt
}
],

temperature:0.5,
max_tokens:700

})

})

const data = await response.json()

let texto = data.choices[0].message.content

let partes = texto.split("###")

document.getElementById("oferta1").value = partes[0] || ""
document.getElementById("previewOferta").value = partes[0] || ""
document.getElementById("oferta2").value = partes[1] || ""
document.getElementById("oferta3").value = partes[2] || ""
document.getElementById("oferta4").value = partes[3] || ""


}catch(e){

console.log(e)
alert("Erro ao gerar texto com IA")

}

}



function copiarTexto(id){

let texto = document.getElementById(id)

texto.select()
document.execCommand("copy")

alert("Texto copiado!")

}



function compartilharWhatsapp(){

let texto = document.getElementById("oferta1").value

if(!texto){

alert("Primeiro gere uma oferta")
return

}

let url = "https://wa.me/?text=" + encodeURIComponent(texto)

window.open(url,"_blank")

}

function logout(){

localStorage.removeItem("usuarioLogado")

window.location.href="login.html"

}