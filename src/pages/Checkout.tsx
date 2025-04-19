
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/utils/formatCurrency";
import { Separator } from "@/components/ui/separator";
import { CheckoutForm } from "@/types/grocery";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, cartTotal, clearCart } = useCart();
  
  const [form, setForm] = useState<CheckoutForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: ""
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});
  
  // If cart is empty, redirect to home
  React.useEffect(() => {
    if (items.length === 0) {
      navigate("/");
    }
  }, [items, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof CheckoutForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Partial<Record<keyof CheckoutForm, string>> = {};
    
    // Required fields
    const requiredFields: (keyof CheckoutForm)[] = [
      "firstName", "lastName", "email", "phone", 
      "address1", "city", "state", "zipCode",
      "cardNumber", "cardExpiry", "cardCvc"
    ];
    
    requiredFields.forEach(field => {
      if (!form[field]) {
        newErrors[field] = "This field is required";
      }
    });
    
    // Email validation
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }
    
    // Phone validation
    if (form.phone && !/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Invalid phone number";
    }
    
    // Card number validation (simple check for length)
    if (form.cardNumber && form.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    
    // Card expiry validation (MM/YY format)
    if (form.cardExpiry && !/^\d{2}\/\d{2}$/.test(form.cardExpiry)) {
      newErrors.cardExpiry = "Use MM/YY format";
    }
    
    // CVC validation
    if (form.cardCvc && !/^\d{3,4}$/.test(form.cardCvc)) {
      newErrors.cardCvc = "Invalid CVC code";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }
    
    // Process the order
    toast.success("Processing your order...");
    
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      navigate("/order-confirmation");
    }, 1500);
  };
  
  // Calculate order summary
  const shipping = 4.99;
  const tax = cartTotal * 0.07;
  const total = cartTotal + shipping + tax;
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1 order-2 lg:order-2">
            <div className="bg-white p-6 rounded-lg border sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="max-h-80 overflow-y-auto mb-4">
                {items.map((item) => {
                  const { product, quantity } = item;
                  const discountedPrice = product.discount 
                    ? product.price * (1 - product.discount) 
                    : product.price;
                    
                  return (
                    <div key={product.id} className="flex items-center py-2">
                      <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 mr-3">
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
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {quantity} x {formatCurrency(discountedPrice)}
                        </p>
                      </div>
                      
                      <div className="text-right ml-2">
                        {formatCurrency(discountedPrice * quantity)}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (7%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Checkout Form */}
          <div className="lg:col-span-2 order-1 lg:order-1">
            <form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div className="bg-white p-6 rounded-lg border mb-6">
                <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={errors.phone ? "border-red-500" : ""}
                      placeholder="e.g. 1234567890"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Shipping Address */}
              <div className="bg-white p-6 rounded-lg border mb-6">
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address1">Address Line 1</Label>
                    <Input 
                      id="address1"
                      name="address1"
                      value={form.address1}
                      onChange={handleChange}
                      className={errors.address1 ? "border-red-500" : ""}
                    />
                    {errors.address1 && (
                      <p className="text-xs text-red-500 mt-1">{errors.address1}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="address2">Address Line 2 (Optional)</Label>
                    <Input 
                      id="address2"
                      name="address2"
                      value={form.address2}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && (
                        <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input 
                        id="state"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className={errors.state ? "border-red-500" : ""}
                      />
                      {errors.state && (
                        <p className="text-xs text-red-500 mt-1">{errors.state}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input 
                        id="zipCode"
                        name="zipCode"
                        value={form.zipCode}
                        onChange={handleChange}
                        className={errors.zipCode ? "border-red-500" : ""}
                      />
                      {errors.zipCode && (
                        <p className="text-xs text-red-500 mt-1">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="bg-white p-6 rounded-lg border mb-6">
                <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input 
                      id="cardNumber"
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      className={errors.cardNumber ? "border-red-500" : ""}
                    />
                    {errors.cardNumber && (
                      <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cardExpiry">Expiration Date</Label>
                      <Input 
                        id="cardExpiry"
                        name="cardExpiry"
                        value={form.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className={errors.cardExpiry ? "border-red-500" : ""}
                      />
                      {errors.cardExpiry && (
                        <p className="text-xs text-red-500 mt-1">{errors.cardExpiry}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="cardCvc">CVC</Label>
                      <Input 
                        id="cardCvc"
                        name="cardCvc"
                        value={form.cardCvc}
                        onChange={handleChange}
                        placeholder="123"
                        className={errors.cardCvc ? "border-red-500" : ""}
                      />
                      {errors.cardCvc && (
                        <p className="text-xs text-red-500 mt-1">{errors.cardCvc}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </Button>
                
                <Button type="submit" className="w-full md:w-auto">
                  Place Order ({formatCurrency(total)})
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
