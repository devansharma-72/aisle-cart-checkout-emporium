
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ProductCard from "@/components/products/ProductCard";
import { CATEGORIES } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/types/grocery";

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  // Find the category
  const category = CATEGORIES.find(cat => cat.id === categoryId);
  
  // Get products in this category from Supabase
  const { data: categoryProducts = [], isLoading } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', categoryId);
      
      if (error) throw error;
      
      return data.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description || '',
        price: product.price,
        imageUrl: product.image_url || '',
        category: product.category,
        inStock: product.in_stock,
        weight: product.weight || '',
        discount: 0 // Default discount value
      })) as Product[];
    },
    enabled: !!categoryId,
  });
  
  if (!category) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="mb-6">The category you are looking for does not exist.</p>
          <Button onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="text-sm"
            onClick={() => navigate("/categories")}
          >
            &larr; All Categories
          </Button>
        </div>
        
        <div className="relative h-40 md:h-60 rounded-lg overflow-hidden mb-8">
          <img
            src={category.imageUrl || "/images/categories/placeholder.svg"}
            alt={category.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/categories/placeholder.svg";
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {category.name}
            </h1>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="text-center">
              <p>Loading products...</p>
            </div>
          </div>
        ) : categoryProducts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium mb-2">No products found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find any products in this category.
            </p>
            <Button onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">
                {categoryProducts.length} Products
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select className="text-sm border rounded-md p-1">
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
