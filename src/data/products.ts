export interface Product {
  id: string;
  name: string;
  price: number;
}

export const products: Product[] = [
  { id: "1", name: "Graphics Card", price: 2500 },
  { id: "2", name: "Motherboard", price: 600 },
  { id: "3", name: "CPU", price: 900 },
  { id: "4", name: "RAM 16GB", price: 500 },
  { id: "5", name: "RAM 8GB", price: 300 },
  { id: "6", name: "Power Supply Unit", price: 300 },
  { id: "7", name: "Cooling Fan", price: 150 },
  { id: "8", name: "PC Case", price: 300 },
];
