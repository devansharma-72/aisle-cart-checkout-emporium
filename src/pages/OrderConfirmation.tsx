
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const orderNumber = React.useMemo(() => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }, []);

  // Redirect to home if user refreshes or directly visits this page
  useEffect(() => {
    const hasOrderCompleted = sessionStorage.getItem("orderCompleted");
    
    if (!hasOrderCompleted) {
      sessionStorage.setItem("orderCompleted", "true");
    }
    
    return () => {
      sessionStorage.removeItem("orderCompleted");
    };
  }, []);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg border text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
          
          <p className="text-muted-foreground mb-6">
            Your order has been placed successfully. We've received your order and will begin processing it right away.
          </p>
          
          <div className="bg-muted p-4 rounded-md mb-6">
            <h2 className="font-bold">Order Number:</h2>
            <p className="text-2xl font-mono">{orderNumber}</p>
          </div>
          
          <p className="mb-6">
            A confirmation email has been sent to your email address with all the details of your order.
          </p>
          
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Estimated delivery: <span className="font-medium text-foreground">2-3 business days</span>
            </p>
          </div>
          
          <div className="mt-8 space-y-4">
            <Button className="w-full" onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderConfirmation;
