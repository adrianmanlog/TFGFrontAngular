export interface Categoria {
  id: number;
  nombre: string;
  icono?: string;
  descripcion?: string;
}

export interface Marca {
  id: number;
  nombre: string;
}

export interface Producto {
  id: number;
  categoria_id: number;
  marca_id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  stock: number;
  imagen_url?: string;
  destacado: boolean;
  categoria?: Categoria; 
  marca?: Marca;
}
export interface CartItem {
  producto: Producto;
  cantidad: number;
}