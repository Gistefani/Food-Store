//interface productos y cartItem

export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: string;
  stock :number;
}

export interface CartItem {
  product: Product;
  cantidad: number;
}