let camisetas = []
fetch("./data.json")
    .then(response => response.json())
    .then(data =>{
        camisetas = data;
        cargarCamisetas(camisetas);
    })
const contenedorCamiseta = document.querySelector("#contenedorCamisetas");
let botonesAgregar = document.querySelectorAll(".botonAgregar")
const numerito = document.querySelector("#numerito")

function cargarCamisetas(camisetas) {

    camisetas.forEach(camiseta => {
        const div = document.createElement("div");
        div.classList.add("tarjeta");
        div.innerHTML = `
            <div class="cuerpo">
            <img src=${camiseta.imagen} alt="${camiseta.titulo}">
        </div>
        <div class="titulo">${camiseta.titulo} <br> $${camiseta.precio}</div>
        <div class="boton">
            <button class="botonAgregar" id=${camiseta.id} href="">Añadir al carrito</button>
        </div>
    `;
        contenedorCamiseta.append(div)

    })
    actualizarBotonesAgregar()
}



function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".botonAgregar")
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}
let productosEnCarrito
const productosEnCarritoLS = JSON.parse(localStorage.getItem("camisetas-en-carrito"))
if (productosEnCarritoLS) {
    productosEnCarrito = productosEnCarritoLS
    actualizarNumero()
} else {
    productosEnCarrito = []
}



function agregarAlCarrito(e) {
    Toastify({
        text: "Camiseta agregada",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "green",
            borderRadius: "20px",
            textTransform: "uppercase",
            fontSize: "10px"
        },
        onClick: function () { } // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id
    const productoAgregado = camisetas.find(camiseta => camiseta.id === idBoton)
    if (productosEnCarrito.some(camiseta => camiseta.id === idBoton)) {
        const agregar = productosEnCarrito.findIndex(camiseta => camiseta.id === idBoton)
        productosEnCarrito[agregar].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado)
    }
    console.log(productosEnCarrito)
    actualizarNumero()
    localStorage.setItem("camisetas-en-carrito", JSON.stringify(productosEnCarrito))
}
function actualizarNumero() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, camiseta) => acc + camiseta.cantidad, 0)
    numerito.innerText = nuevoNumerito
}
