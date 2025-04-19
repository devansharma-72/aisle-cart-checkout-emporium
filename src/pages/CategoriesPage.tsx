
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { CATEGORIES } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

const CategoriesPage = () => {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">All Categories</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <div 
              key={category.id}
              className="group relative bg-white rounded-lg shadow-sm overflow-hidden border cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/category/${category.id}`)}
            >
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img 
                  src={category.imageUrl || "/images/categories/placeholder.svg"} 
                  alt={category.name} 
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/categories/placeholder.svg";
                  }}
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <h3 className="text-white font-bold p-6 w-full text-xl">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default CategoriesPage;
