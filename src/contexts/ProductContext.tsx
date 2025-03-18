import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "@/firebase";
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  onSnapshot 
} from "firebase/firestore";
import { Product, ProductContextType } from "./productTypes";  // ✅ Update the path here

// ✅ Create Context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// ✅ Product Provider Component
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // ✅ Fetch Products from Firestore (Real-time updates)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productsData: Product[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productsData);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // ✅ Add Product
  const addProduct = async (product: Omit<Product, "id">) => {
    await addDoc(collection(db, "products"), product);
  };

  // ✅ Remove Product
  const removeProduct = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
  };

  // ✅ Update Product
  const updateProduct = async (id: string, updatedProduct: Partial<Product>) => {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, updatedProduct);
  };

  // ✅ Select Product
  const selectProduct = (product: Product | null) => {
    setSelectedProduct(product);
  };

  // ✅ Provide Context
  return (
    <ProductContext.Provider 
      value={{ 
        products, 
        addProduct, 
        removeProduct, 
        updateProduct,
        selectedProduct,
        selectProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// ✅ Custom Hook for Using Product Context
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
