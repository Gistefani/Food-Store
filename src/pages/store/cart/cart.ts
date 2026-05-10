//logica de renders cantidades y total
import type { Product,CartItem } from "../../../types/product";

const CART_KEY = "carrito";

export function getCarrito(): CartItem[] {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
}

function saveCarrito(carrito: CartItem[]): void {
    localStorage.setItem(CART_KEY, JSON.stringify(carrito));
}

export function agregarAlCarrito(product: Product): void {
    const carrito = getCarrito();
    const itemExistente = carrito.find(item => item.product.id === product.id);

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({ product, cantidad: 1 });
    }

    saveCarrito(carrito);
}

export function calcularTotal(carrito: CartItem[]): number {
    return carrito.reduce((acc, item) => acc + item.product.precio * item.cantidad, 0);
}

export function actualizarCantidad(id: number, nuevaCantidad: number): void {
    const carrito = getCarrito();
    const item = carrito.find(item => item.product.id === id);

    if (!item) return;

    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(id);
        return;
    }

    if (nuevaCantidad > item.product.stock) {
        alert(`Stock máximo disponible: ${item.product.stock}`);
        return;
    }

    item.cantidad = nuevaCantidad;
    saveCarrito(carrito);
}

export function eliminarDelCarrito(id: number): void {
    const carrito = getCarrito().filter(item => item.product.id !== id);
    saveCarrito(carrito);
}

const listaCarrito = document.getElementById("lista-carrito") as HTMLElement;
const mensajeCarrito = document.getElementById("mensaje-carrito") as HTMLElement;
const totalCarrito = document.getElementById("total-carrito") as HTMLElement;

function crearItemCarrito(item: CartItem): HTMLElement {
    const card = document.createElement("div");
    card.classList.add("cart-card");

    const img = document.createElement("img");
    img.src = item.product.imagen;
    img.alt = item.product.nombre;
    img.classList.add("cart-item-img");

    const nombre = document.createElement("span");
    nombre.classList.add("cart-nombre");
    nombre.textContent = item.product.nombre;

    const precio = document.createElement("span");
    precio.classList.add("cart-precio");
    precio.textContent = `$${item.product.precio * item.cantidad}`;

    const controles = document.createElement("div");
    controles.classList.add("cart-controles");

    const btnRestar = document.createElement("button");
    btnRestar.textContent = "-";
    btnRestar.classList.add("btn-restar");

    const cantidad = document.createElement("span");
    cantidad.textContent = `${item.cantidad}`;

    const btnSumar = document.createElement("button");
    btnSumar.textContent = "+";
    btnSumar.classList.add("btn-sumar");

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("btn-eliminar");

    btnRestar.addEventListener("click", () => {
        actualizarCantidad(item.product.id, item.cantidad - 1);
        renderCarrito();
    });

    btnSumar.addEventListener("click", () => {
        actualizarCantidad(item.product.id, item.cantidad + 1);
        renderCarrito();
    });

    btnEliminar.addEventListener("click", () => {
        eliminarDelCarrito(item.product.id);
        renderCarrito();
    });

    controles.appendChild(btnRestar);
    controles.appendChild(cantidad);
    controles.appendChild(btnSumar);
    controles.appendChild(btnEliminar);

    card.appendChild(img);
    card.appendChild(nombre);
    card.appendChild(precio);
    card.appendChild(controles);

    return card;
}

function renderCarrito(): void {
    const carrito = getCarrito();
    const imgCarritoVacio = document.getElementById("img-carrito-vacio") as HTMLElement;

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        mensajeCarrito.textContent = "Tu carrito está vacío";
        imgCarritoVacio.classList.add("visible");
        totalCarrito.textContent = "";
        return;
    }

    imgCarritoVacio.classList.remove("visible");
    mensajeCarrito.textContent = "";

    carrito.forEach((item) => {
        const card = crearItemCarrito(item);
        listaCarrito.appendChild(card);
    });

    const total = calcularTotal(carrito);
    totalCarrito.textContent = `Total: $${total}`;
}

if (listaCarrito) {
    renderCarrito();
}
