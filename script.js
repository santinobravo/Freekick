const USUARIO = "Santino"
const CONTRASEÑA = "234"

let usuarioPedido = prompt("Ingrese el usuario")
let contraPedida = prompt("Ingrese su contraseña")
function login(){
if ((USUARIO == usuarioPedido) && (CONTRASEÑA == contraPedida)) {
    alert("Bienvenido a Freekick, la mejor tienda de camisetas")
} else {
    alert("Su usuario o contraseña no es la correcta")
}
}
login();

function compraCamiseta(){
let nombreA = prompt("Bienvenido, ingrese su nombre aqui")
console.log(nombreA)
console.log("Como andas " + nombreA)
let precio = prompt("¿A que precio esta la camiseta que elegiste?")
precio = parseInt(precio)
console.log(precio)
var descuento = (precio - (precio * 20 / 100))
alert("Este es el precio final con el 20% de descuento por ser la primer compra $" + descuento)
console.log(descuento)
console.log("Te quedaria en $" + descuento)
}
compraCamiseta();

function turno(){
    for (let i = 1; i <= 5; i++) {
        alert("A continuación, va a tener que sacar un turno para retirar su camiseta por el local")
        let nombre = prompt("Ingrese su nombre");
        alert("Turno  N° "+i+" a nombre de: "+ nombre);
        break
    } 
}
turno()
