
import React from "react";
import { Category } from "@/types/grocery";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="group relative bg-white rounded-lg shadow-sm overflow-hidden border cursor-pointer"
      onClick={() => navigate(`/category/${category.id}`)}
    >
      <div className="aspect-[2/1] overflow-hidden bg-gray-100">
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
        <h3 className="text-white font-bold p-4 w-full text-center">
          {category.name}
        </h3>
      </div>
    </div>
  );
};

export default CategoryCard;
