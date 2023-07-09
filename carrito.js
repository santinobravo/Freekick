const productosEnCarrito = JSON.parse(localStorage.getItem("camisetas-en-carrito"))
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled")
        contenedorCarritoProductos.classList.remove("disabled")
        contenedorCarritoAcciones.classList.remove("disabled")

        contenedorCarritoProductos.innerHTML = ""

        productosEnCarrito.forEach(camiseta => {

            const div = document.createElement("div")
            div.classList.add("carrito-producto")
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${camiseta.imagen}" alt="${camiseta.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${camiseta.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">      
                    <small>Cantidad</small>
                    <p class="cantidad">${camiseta.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${camiseta.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${camiseta.precio * camiseta.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${camiseta.id}"><i class="bi bi-trash-fill"></i></button>
            `

            contenedorCarritoProductos.append(div)
        })
        actualizarBotonesEliminar()
        actualizarTotal()

    } else {
        contenedorCarritoVacio.classList.remove("disabled")
        contenedorCarritoProductos.classList.add("disabled")
        contenedorCarritoAcciones.classList.add("disabled")
    }

}

cargarProductosCarrito()

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    });
}
function eliminarDelCarrito(e) {
    Toastify({
        text: "Camiseta eliminada",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "crimson",
            borderRadius: "20px",
            textTransform: "uppercase",
            fontSize: "10px",
            color: "black",
            fontWeight: "bolder",
        },
        onClick: function () { } // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id
    const index = productosEnCarrito.findIndex(camiseta => camiseta.id === idBoton)

    productosEnCarrito.splice(index, 1)
    cargarProductosCarrito()

    localStorage.setItem("camisetas-en-carrito", JSON.stringify(productosEnCarrito))

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("camisetas-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
    })
}


function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, camiseta) => acc + (camiseta.precio * camiseta.cantidad), 0)
    total.innerText = `$${totalCalculado}`
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Muchas gracias por su compra!',
        text: 'Pronto le llegará su pedido',
        footer: '<a href="./index.html">¿Quiere comprar algo más?</a>',
        showConfirmButton: false,
        timer: 5000
    })
    productosEnCarrito.length = 0;
    localStorage.setItem("camisetas-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");

}
