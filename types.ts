
export enum UserRole {
  FARMER = 'FARMER',
  BUYER = 'BUYER',
  ADMIN = 'ADMIN'
}

export enum Category {
  CROPS = 'Crops',
  LIVESTOCK = 'Livestock',
  TUBERS = 'Tubers',
  FRUITS = 'Fruits',
  GRAINS = 'Grains',
  POULTRY = 'Poultry'
}

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  unit: string;
  quantity: number;
  location: string;
  imageUrl: string;
  rating: number;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  location: string;
  phone: string;
  avatar?: string;
}

export interface CartItem extends Product {
  cartQuantity: number;
}

export interface Order {
  id: string;
  buyerId: string;
  farmerId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  paymentRef: string;
}

export type View = 'home' | 'marketplace' | 'farmer-dashboard' | 'checkout' | 'product-detail' | 'chat' | 'admin';
