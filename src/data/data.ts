//productos y getCategorias

import type { Product } from "../types/product";


export const PRODUCTS: Product[]= [ 
   { 
       id: 1, 
       nombre: "Hamburguesa Doble", 
       descripcion: "Doble carne, cheddar y bacon", 
       precio: 25000, 
       imagen: "/assets/Hamburgesa-doble.jpg", 
       categoria: "Hamburguesas", 
       stock :12,
   }, 
   { 
       id: 2, 
       nombre: "Pizza Muzzarella", 
       descripcion: "Salsa casera y orégano", 
       precio: 18000, 
       imagen: "/assets/Pizza-Margarita.jpg", 
       categoria: "Pizzas",
       stock :10,
   }, 
   {
        id: 3, 
       nombre: "Hamburguesa simple", 
       descripcion: "hamburgesa, tomate, lechuga y papas", 
       precio: 19000, 
       imagen: "/assets/Hamburguesa-simple.jpg", 
       categoria: "Hamburguesas",
       stock :15,
    },
    {
        id: 4, 
       nombre: "Pizza Peperoni", 
       descripcion: "Salsa casera con peperoni", 
       precio: 20000, 
       imagen: "/assets/pizza-peperoni.jpg", 
       categoria: "Pizzas",
       stock :8,
   },  
   {
    id: 5,
    nombre: "Coca Cola",
    descripcion: "Gaseosa 500ml bien fría",
    precio: 3000,
    imagen: "/assets/cocacola.jpg",
    categoria: "Bebidas",
    stock :30,
  },
  {
    id: 6,
    nombre: "Limonada",
    descripcion: "Limonada casera con menta y hielo",
    precio: 3500,
    imagen: "/assets/limonada.jpg",
    categoria: "Bebidas",
    stock :6,
  },
  {
    id: 7,
    nombre: "Brownie",
    descripcion: "Brownie de chocolate con helado",
    precio: 6000,
    imagen: "/assets/brownie.jpg",
    categoria: "Postres",
    stock :9,
  },
  {
    id: 8,
    nombre: "Cheesecake",
    descripcion: "Cheesecake de frutos rojos",
    precio: 7000,
    imagen: "/assets/cheesecake.jpg",
    categoria: "Postres",
    stock :6,
  },

  // Empanadas
  {
    id: 9,
    nombre: "Empanada de Carne",
    descripcion: "Empanada criolla de carne cortada a cuchillo",
    precio: 2500,
    imagen: "/assets/empanada2.jpg",
    categoria: "Empanadas",
    stock :60,
  },
  {
    id: 10,
    nombre: "Empanada de Jamón y Queso",
    descripcion: "Empanada rellena de jamón y queso cremoso",
    precio: 2500,
    imagen: "/assets/empanada1.jpg",
    categoria: "Empanadas",
    stock :60,
  },

  // Ensaladas
  {
    id: 11,
    nombre: "Ensalada César",
    descripcion: "Lechuga, pollo grillado, crutones y aderezo césar",
    precio: 8000,
    imagen: "/assets/ensalada-cesar.jpg",
    categoria: "Ensaladas",
    stock :10,
  },
  {
    id: 12,
    nombre: "Ensalada Griega",
    descripcion: "Tomate, pepino, aceitunas y queso feta",
    precio: 7500,
    imagen: "/assets/ensalada-griega.jpg",
    categoria: "Ensaladas",
    stock :10,
  },






]; 
export function getCategorias(): string[] {
  const categorias = PRODUCTS.map(p => p.categoria);
  return [...new Set(categorias)];
}