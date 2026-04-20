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
export interface LineaPedido {
  id: number;
  cantidad: number;
  precio_unitario: string;
  producto?: Producto;
}

export interface Pedido {
  id: number;
  total: string;
  estado: string;
  fecha_pedido: string;
  lineas?: LineaPedido[];
}
export interface Pedido {
  id: number;
  total: string;
  estado: string;
  fecha_pedido: string;
  usuario_id?: number;
  usuario?: any;
  lineas?: LineaPedido[];
}