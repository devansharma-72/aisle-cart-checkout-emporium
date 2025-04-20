import React from "react";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/components/layout/MainLayout";
import HeroBanner from "@/components/home/HeroBanner";
import ProductCard from "@/components/products/ProductCard";
import CategoryCard from "@/components/categories/CategoryCard";
import { CATEGORIES } from "@/data/mockData";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/types/grocery";

const Index = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) throw error;
      
      return data.map(product => ({
        ...product,
        imageUrl: product.image_url,
        inStock: product.in_stock,
        discount: 0 // Add a default discount value
      })) as Product[];
    }
  });
  
  // Get featured products (those with a discount)
  const featuredProducts = products.filter(product => product.discount > 0);
  
  // Get some products from different categories
  const fruitsAndVegetables = products.filter(
    product => product.category === "fruits" || product.category === "vegetables"
  ).slice(0, 4);
  
  const dairyAndBakery = products.filter(
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
            {isLoading ? (
              <p>Loading products...</p>
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No special offers available</p>
            )}
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
            {isLoading ? (
              <p>Loading products...</p>
            ) : fruitsAndVegetables.map((product) => (
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
            {isLoading ? (
              <p>Loading products...</p>
            ) : dairyAndBakery.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
