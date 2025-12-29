
import { Product, Category } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    farmerId: 'f1',
    farmerName: 'Alhaji Ibrahim',
    name: 'Yellow Garri',
    category: Category.TUBERS,
    description: 'High-quality processed yellow garri from Ijebu. Perfectly dry and sour.',
    price: 1500,
    unit: 'Paint Bucket',
    quantity: 50,
    location: 'Lagos',
    imageUrl: 'https://picsum.photos/seed/garri/400/300',
    rating: 4.8
  },
  {
    id: '2',
    farmerId: 'f2',
    farmerName: 'Emeka Farmers',
    name: 'Fresh Tomatoes',
    category: Category.FRUITS,
    description: 'Basket of fresh, firm plum tomatoes direct from Jos plateau.',
    price: 12000,
    unit: 'Big Basket',
    quantity: 10,
    location: 'Abuja',
    imageUrl: 'https://picsum.photos/seed/tomatoes/400/300',
    rating: 4.5
  },
  {
    id: '3',
    farmerId: 'f3',
    farmerName: 'Olu’s Poultry',
    name: 'Organic Brown Eggs',
    category: Category.POULTRY,
    description: 'Large, farm-fresh eggs from grass-fed chickens.',
    price: 3200,
    unit: 'Crate (30 eggs)',
    quantity: 200,
    location: 'Ibadan',
    imageUrl: 'https://picsum.photos/seed/eggs/400/300',
    rating: 4.9
  },
  {
    id: '4',
    farmerId: 'f1',
    farmerName: 'Alhaji Ibrahim',
    name: 'White Yam',
    category: Category.TUBERS,
    description: 'Freshly harvested large tubers of white yam from Benue state.',
    price: 2500,
    unit: 'Large Tuber',
    quantity: 100,
    location: 'Lagos',
    imageUrl: 'https://picsum.photos/seed/yam/400/300',
    rating: 4.7
  }
];

export const NIGERIA_LOCATIONS = ['Lagos', 'Abuja', 'Ibadan', 'Kano', 'Port Harcourt', 'Enugu', 'Benin City', 'Jos'];
