function registrar(){

let email = document.getElementById("email").value.trim()
let senha = document.getElementById("senha").value.trim()

if(email === "" || senha === ""){
alert("Preencha todos os campos")
return
}

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []

let usuarioExistente = usuarios.find(u => u.email === email)

if(usuarioExistente){
alert("Email já cadastrado")
return
}

usuarios.push({
email: email,
senha: senha
})

localStorage.setItem("usuarios", JSON.stringify(usuarios))

alert("Conta criada com sucesso!")

window.location.href = "login.html"

}



function login(){

let email = document.getElementById("email").value.trim()
let senha = document.getElementById("senha").value.trim()

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []

let usuario = usuarios.find(u => u.email === email && u.senha === senha)

if(usuario){

localStorage.setItem("usuarioLogado", email)

window.location.href = "index.html"

}else{

alert("Email ou senha incorretos")

}

}