
import React from "react";
import { Product } from "@/types/grocery";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/utils/formatCurrency";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount) 
    : product.price;
    
  return (
    <div 
      className="group relative bg-white rounded-lg shadow-sm overflow-hidden border hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {product.discount > 0 && (
        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          {Math.round(product.discount * 100)}% OFF
        </div>
      )}
      
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.imageUrl || "/images/products/placeholder.svg"} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/products/placeholder.svg";
          }}
        />
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
        <p className="text-xs text-muted-foreground mb-2">{product.weight}</p>
        
        <div className="flex items-center justify-between">
          <div>
            {product.discount ? (
              <div className="flex items-center gap-1.5">
                <span className="font-semibold">{formatCurrency(discountedPrice)}</span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatCurrency(product.price)}
                </span>
              </div>
            ) : (
              <span className="font-semibold">{formatCurrency(product.price)}</span>
            )}
          </div>
          
          <Button 
            size="sm" 
            className="h-8 w-8 rounded-full p-0"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
