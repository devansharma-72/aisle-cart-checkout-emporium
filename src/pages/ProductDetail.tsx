
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { PRODUCTS } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatCurrency";
import { useCart } from "@/contexts/CartContext";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = React.useState(1);
  
  // Find the product by ID
  const product = PRODUCTS.find((p) => p.id === productId);
  
  // Get related products (same category)
  const relatedProducts = product 
    ? PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4) 
    : [];
  
  // Handle quantity changes
  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you are looking for does not exist.</p>
          <Button onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount) 
    : product.price;
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="text-sm"
            onClick={() => navigate(-1)}
          >
            &larr; Back
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden border p-4">
            <div className="aspect-square w-full max-w-md mx-auto">
              <img 
                src={product.imageUrl || "/images/products/placeholder.svg"} 
                alt={product.name} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/products/placeholder.svg";
                }}
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-4">
            {product.discount > 0 && (
              <div className="inline-block bg-red-500 text-white text-xs font-bold px-3 py-1 rounded">
                {Math.round(product.discount * 100)}% OFF
              </div>
            )}
            
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            <div className="flex items-baseline gap-2">
              {product.discount ? (
                <>
                  <span className="text-2xl font-bold">{formatCurrency(discountedPrice)}</span>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatCurrency(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold">{formatCurrency(product.price)}</span>
              )}
              <span className="text-sm text-muted-foreground">/ {product.weight}</span>
            </div>
            
            <p className="text-muted-foreground">{product.description}</p>
            
            <div className="py-2">
              <p className="text-sm text-muted-foreground mb-1">Category: <span className="text-foreground">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span></p>
              <p className="text-sm text-muted-foreground">Availability: <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span></p>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-none rounded-l-md"
                  onClick={decreaseQuantity}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-none rounded-r-md"
                  onClick={increaseQuantity}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
              
              <Button 
                className="flex-1 md:flex-none md:min-w-[200px]"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
