
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroBanner: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative bg-grocery-100 rounded-lg overflow-hidden">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-8 lg:mb-0">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Fresh Groceries <br />
              <span className="text-grocery-600">Delivered to Your Door</span>
            </h1>
            <p className="mt-4 max-w-md text-lg text-gray-700">
              Shop our wide selection of fresh produce, dairy, meat, and pantry staples. 
              Enjoy speedy delivery and the freshest quality.
            </p>
            <div className="mt-6 flex space-x-4">
              <Button onClick={() => navigate("/category/fruits")}>
                Shop Now
              </Button>
              <Button variant="outline" onClick={() => navigate("/categories")}>
                View Categories
              </Button>
            </div>
          </div>
          
          <div className="relative text-center lg:text-right">
            <div className="absolute inset-0 flex items-center justify-center lg:justify-end opacity-30">
              <div className="bg-grocery-200 rounded-full h-60 w-60 lg:h-80 lg:w-80"></div>
            </div>
            <img 
              src="/images/products/banner-fruits.jpg" 
              alt="Fresh fruits and vegetables"
              className="relative z-10 max-h-80 inline-block object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/products/placeholder.svg";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
