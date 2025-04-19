
import React from "react";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatCurrency";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const { 
    items, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity,
    cartTotal,
    itemCount
  } = useCart();
  
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };
  
  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40"
          onClick={closeCart}
        />
      )}
      
      {/* Cart panel */}
      <div 
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-96 max-w-full bg-background shadow-xl transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Cart header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <h2 className="font-semibold text-lg">Your Cart ({itemCount})</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={closeCart}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close cart</span>
            </Button>
          </div>
          
          {/* Cart items */}
          <div className="flex-1 overflow-y-auto py-2">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg">Your cart is empty</h3>
                <p className="text-muted-foreground mt-1">
                  Looks like you haven't added any products yet.
                </p>
                <Button 
                  className="mt-6" 
                  onClick={() => {
                    closeCart();
                    navigate("/");
                  }}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <ul className="divide-y">
                {items.map((item) => {
                  const { product, quantity } = item;
                  const discountedPrice = product.discount 
                    ? product.price * (1 - product.discount) 
                    : product.price;
                    
                  return (
                    <li key={product.id} className="py-4 px-4">
                      <div className="flex items-start gap-3">
                        <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={product.imageUrl || "/images/products/placeholder.svg"} 
                            alt={product.name} 
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/images/products/placeholder.svg";
                            }}
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">{product.weight}</p>
                          
                          <div className="mt-1 flex items-center justify-between">
                            <div className="flex items-center border rounded-md">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 rounded-none rounded-l-md"
                                onClick={() => updateQuantity(product.id, quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">Decrease quantity</span>
                              </Button>
                              <span className="w-8 text-center text-sm">{quantity}</span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 rounded-none rounded-r-md"
                                onClick={() => updateQuantity(product.id, quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">Increase quantity</span>
                              </Button>
                            </div>
                            
                            <div className="text-right">
                              {product.discount ? (
                                <div className="flex flex-col items-end">
                                  <span className="text-sm font-medium">
                                    {formatCurrency(discountedPrice * quantity)}
                                  </span>
                                  <span className="text-xs line-through text-muted-foreground">
                                    {formatCurrency(product.price * quantity)}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-sm font-medium">
                                  {formatCurrency(product.price * quantity)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          
          {/* Cart footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
              </div>
              
              <Button className="w-full" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  closeCart();
                  navigate("/");
                }}
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
