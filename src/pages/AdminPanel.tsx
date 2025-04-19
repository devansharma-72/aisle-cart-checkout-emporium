
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/grocery";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductTable from "@/components/admin/ProductTable";
import ProductForm from "@/components/admin/ProductForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data, error } = await supabase.rpc('has_role', { role: 'admin' });
      if (error) {
        console.error('Error checking admin status:', error);
        navigate('/');
        return;
      }
      setIsAdmin(data);
      if (!data) {
        navigate('/');
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin panel.",
          variant: "destructive"
        });
      }
    };

    if (user) {
      checkAdminStatus();
      fetchProducts();
    } else {
      navigate('/auth');
    }
  }, [user, navigate]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return;
    }

    // Map database fields to our Product type
    const mappedProducts: Product[] = data.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description || '',
      price: item.price,
      imageUrl: item.image_url || '',
      category: item.category,
      inStock: item.in_stock || false,
      weight: item.weight || '',
    }));

    setProducts(mappedProducts);
    setIsLoading(false);
  };

  const handleProductSave = async (productData: Omit<Product, 'id'>, id?: string) => {
    // Map our Product type fields to database fields
    const dbData = {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      image_url: productData.imageUrl,
      category: productData.category,
      in_stock: productData.inStock,
      weight: productData.weight
    };

    if (id) {
      // Update existing product
      const { error } = await supabase
        .from('products')
        .update(dbData)
        .eq('id', id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update product",
          variant: "destructive"
        });
        return;
      }
    } else {
      // Create new product
      const { error } = await supabase
        .from('products')
        .insert([dbData]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create product",
          variant: "destructive"
        });
        return;
      }
    }

    fetchProducts();
    setShowForm(false);
    setEditingProduct(null);
    toast({
      title: "Success",
      description: `Product ${id ? 'updated' : 'created'} successfully`,
    });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
      });
      return;
    }

    fetchProducts();
    toast({
      title: "Success",
      description: "Product deleted successfully",
    });
  };

  if (!isAdmin || isLoading) {
    return null;
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2" />
          Add Product
        </Button>
      </div>

      <ProductTable 
        products={products}
        onEdit={(product) => {
          setEditingProduct(product);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <ProductForm
            product={editingProduct}
            onSave={handleProductSave}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
