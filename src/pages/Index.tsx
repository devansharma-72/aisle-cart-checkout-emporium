
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import HeroBanner from "@/components/home/HeroBanner";
import ProductCard from "@/components/products/ProductCard";
import CategoryCard from "@/components/categories/CategoryCard";
import { PRODUCTS, CATEGORIES } from "@/data/mockData";

const Index = () => {
  // Get featured products (those with a discount)
  const featuredProducts = PRODUCTS.filter(product => product.discount > 0);
  
  // Get some products from different categories
  const fruitsAndVegetables = PRODUCTS.filter(
    product => product.category === "fruits" || product.category === "vegetables"
  ).slice(0, 4);
  
  const dairyAndBakery = PRODUCTS.filter(
    product => product.category === "dairy" || product.category === "bakery"
  ).slice(0, 4);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <HeroBanner />
        
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <a href="/categories" className="text-primary hover:underline">
              View All
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
        
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Special Offers</h2>
            <a href="/offers" className="text-primary hover:underline">
              View All
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Fresh Fruits & Vegetables</h2>
            <a href="/category/fruits" className="text-primary hover:underline">
              View All
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fruitsAndVegetables.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Dairy & Bakery</h2>
            <a href="/category/dairy" className="text-primary hover:underline">
              View All
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {dairyAndBakery.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
