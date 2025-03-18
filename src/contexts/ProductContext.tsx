import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '@/firebase';
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  imageUrl: string;
  category: string;
};

type ProductContextType = {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  selectedProduct: Product | null;
  selectProduct: (product: Product | null) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // 🔹 Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData: Product[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  // 🔹 Add product to Firestore
  const addProduct = async (product: Omit<Product, 'id'>) => {
    const docRef = await addDoc(collection(db, "products"), product);
    setProducts([...products, { id: docRef.id, ...product }]);
  };

  // 🔹 Remove product from Firestore
  const removeProduct = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter(product => product.id !== id));
  };




  export type ProductContextType = {
    products: Product[];
    addProduct: (product: Product) => Promise<void>;
    removeProduct: (id: string) => Promise<void>;
    fetchProducts: () => Promise<void>;
  };

  // 🔹 Update product in Firestore
  const updateProduct = async (id: string, updatedProduct: Partial<Product>) => {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, updatedProduct);
    setProducts(products.map(product => 
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
  };

  // 🔹 Select a product for viewing details
  const selectProduct = (product: Product | null) => {
    setSelectedProduct(product);
  };

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

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};


