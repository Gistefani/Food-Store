//logica de render busqueda y filtros
import {PRODUCTS,getCategorias} from "../../../data/data";
import type {Product} from "../../../types/product";
import { agregarAlCarrito } from "../cart/cart";



const contenedor = document.getElementById("contenedor-productos") as HTMLElement;
const input = document.getElementById("buscarproducto") as HTMLInputElement;
const mensaje = document.getElementById("mensaje") as HTMLElement;

const listaCategorias = document.getElementById("lista-categorias") as HTMLElement;

function renderCategorias() {
  const categorias = getCategorias();

  listaCategorias.innerHTML = "";

  // botón "Todos"
  const liTodos = document.createElement("li");
  liTodos.textContent = "Todos los productos";
  liTodos.classList.add("activo");
  liTodos.addEventListener("click", () => {
    document.querySelectorAll("#lista-categorias li").forEach(li =>li.classList.remove("activo"));
    liTodos.classList.add("activo");
    renderProductos(PRODUCTS);
  });
  listaCategorias.appendChild(liTodos);

  categorias.forEach((cat) => {
    const li = document.createElement("li");
    li.textContent = cat;

    li.addEventListener("click", () => {
      document.querySelectorAll("#lista-categorias li").forEach(li =>li.classList.remove("activo"));
      li.classList.add("activo");
      const filtrados = PRODUCTS.filter(p => p.categoria === cat);
      renderProductos(filtrados);
    });

    listaCategorias.appendChild(li);
  });
}





function renderProductos(lista: Product[]) {
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    mensaje.textContent = "No se encontraron productos";
    return;
  }

  mensaje.textContent = "";

  lista.forEach((prod) => {
    const article = document.createElement("article");
    article.classList.add("card-producto");

    article.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" class="card-img">
      <h5 class="card-categoria">${prod.categoria}</h5> 
      <h4 class="card-titulo">${prod.nombre}</h4>
      <p class="card-desc">${prod.descripcion}</p>
      <p class="card-precio">$${prod.precio}</p>
      
    `;

    const boton = document.createElement("button");
    boton.textContent = "Agregar al carrito";

    boton.addEventListener("click", () => {
      agregarAlCarrito(prod);

      boton.textContent = "¡Agregado!";
      boton.disabled = true;

    setTimeout(() => {
    boton.textContent = "Agregar al carrito";
    boton.disabled = false;
  }, 1500);
    
    
    
    
    });

    article.appendChild(boton);
    contenedor.appendChild(article);
  });
}

// Evento de búsqueda
input.addEventListener("input", () => {
  const texto = input.value.toLowerCase();

  const filtrados = PRODUCTS.filter((prod) =>
    prod.nombre.toLowerCase().includes(texto)
  );

  renderProductos(filtrados);
});

//  Render inicial
renderProductos(PRODUCTS);
renderCategorias();