
import { Category, Product } from "../types/grocery";

export const CATEGORIES: Category[] = [
  {
    id: "fruits",
    name: "Fruits",
    imageUrl: "/images/categories/fruits.jpg"
  },
  {
    id: "vegetables",
    name: "Vegetables",
    imageUrl: "/images/categories/vegetables.jpg"
  },
  {
    id: "dairy",
    name: "Dairy & Eggs",
    imageUrl: "/images/categories/dairy.jpg"
  },
  {
    id: "bakery",
    name: "Bakery",
    imageUrl: "/images/categories/bakery.jpg"
  },
  {
    id: "meat",
    name: "Meat & Seafood",
    imageUrl: "/images/categories/meat.jpg"
  },
  {
    id: "beverages",
    name: "Beverages",
    imageUrl: "/images/categories/beverages.jpg"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "apple-red",
    name: "Red Apple",
    description: "Fresh and crisp red apples, perfect for snacking or baking.",
    price: 1.49,
    imageUrl: "/images/products/apple.jpg",
    category: "fruits",
    inStock: true,
    weight: "1 lb",
    discount: 0
  },
  {
    id: "banana-organic",
    name: "Organic Bananas",
    description: "Sweet and ripe organic bananas.",
    price: 0.79,
    imageUrl: "/images/products/banana.jpg",
    category: "fruits",
    inStock: true,
    weight: "1 lb",
    discount: 0
  },
  {
    id: "orange-navel",
    name: "Navel Oranges",
    description: "Juicy navel oranges, rich in vitamin C.",
    price: 1.29,
    imageUrl: "/images/products/orange.jpg",
    category: "fruits",
    inStock: true,
    weight: "1 lb",
    discount: 0.10
  },
  {
    id: "spinach-fresh",
    name: "Fresh Spinach",
    description: "Nutrient-rich fresh spinach leaves.",
    price: 2.99,
    imageUrl: "/images/products/spinach.jpg",
    category: "vegetables",
    inStock: true,
    weight: "10 oz",
    discount: 0
  },
  {
    id: "carrot-organic",
    name: "Organic Carrots",
    description: "Sweet and crunchy organic carrots.",
    price: 1.99,
    imageUrl: "/images/products/carrot.jpg",
    category: "vegetables",
    inStock: true,
    weight: "1 lb",
    discount: 0
  },
  {
    id: "broccoli-crown",
    name: "Broccoli Crown",
    description: "Fresh broccoli crown, perfect for steaming or roasting.",
    price: 2.49,
    imageUrl: "/images/products/broccoli.jpg",
    category: "vegetables",
    inStock: true,
    weight: "1 lb",
    discount: 0.15
  },
  {
    id: "milk-whole",
    name: "Whole Milk",
    description: "Fresh whole milk from local dairy farms.",
    price: 3.49,
    imageUrl: "/images/products/milk.jpg",
    category: "dairy",
    inStock: true,
    weight: "1 gallon",
    discount: 0
  },
  {
    id: "eggs-large",
    name: "Large Eggs",
    description: "Farm-fresh large eggs.",
    price: 2.99,
    imageUrl: "/images/products/eggs.jpg",
    category: "dairy",
    inStock: true,
    weight: "12 count",
    discount: 0
  },
  {
    id: "cheese-cheddar",
    name: "Cheddar Cheese",
    description: "Sharp cheddar cheese, aged to perfection.",
    price: 4.99,
    imageUrl: "/images/products/cheese.jpg",
    category: "dairy",
    inStock: true,
    weight: "8 oz",
    discount: 0
  },
  {
    id: "bread-wheat",
    name: "Wheat Bread",
    description: "Freshly baked whole wheat bread.",
    price: 3.29,
    imageUrl: "/images/products/bread.jpg",
    category: "bakery",
    inStock: true,
    weight: "24 oz",
    discount: 0
  },
  {
    id: "muffin-blueberry",
    name: "Blueberry Muffins",
    description: "Delicious blueberry muffins baked daily.",
    price: 4.99,
    imageUrl: "/images/products/muffin.jpg",
    category: "bakery",
    inStock: true,
    weight: "4 count",
    discount: 0.20
  },
  {
    id: "chicken-breast",
    name: "Chicken Breast",
    description: "Boneless, skinless chicken breast fillets.",
    price: 5.99,
    imageUrl: "/images/products/chicken.jpg",
    category: "meat",
    inStock: true,
    weight: "1 lb",
    discount: 0
  },
  {
    id: "salmon-fillet",
    name: "Salmon Fillet",
    description: "Wild-caught salmon fillets, rich in omega-3.",
    price: 9.99,
    imageUrl: "/images/products/salmon.jpg",
    category: "meat",
    inStock: true,
    weight: "0.75 lb",
    discount: 0
  },
  {
    id: "ground-beef",
    name: "Ground Beef",
    description: "Lean ground beef, perfect for burgers.",
    price: 4.99,
    imageUrl: "/images/products/beef.jpg",
    category: "meat",
    inStock: true,
    weight: "1 lb",
    discount: 0.10
  },
  {
    id: "water-bottle",
    name: "Spring Water",
    description: "Refreshing natural spring water.",
    price: 0.99,
    imageUrl: "/images/products/water.jpg",
    category: "beverages",
    inStock: true,
    weight: "16.9 fl oz",
    discount: 0
  },
  {
    id: "coffee-premium",
    name: "Premium Coffee",
    description: "Rich and aromatic premium coffee beans.",
    price: 8.99,
    imageUrl: "/images/products/coffee.jpg",
    category: "beverages",
    inStock: true,
    weight: "12 oz",
    discount: 0
  },
  {
    id: "orange-juice",
    name: "Orange Juice",
    description: "100% pure freshly squeezed orange juice.",
    price: 3.99,
    imageUrl: "/images/products/orange-juice.jpg",
    category: "beverages",
    inStock: true,
    weight: "52 fl oz",
    discount: 0.15
  }
];
