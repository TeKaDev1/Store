
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for our product data
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
  addProduct: (product: Omit<Product, 'id'>) => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  selectedProduct: Product | null;
  selectProduct: (product: Product | null) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with some sample products
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [
      {
        id: '1',
        name: 'هاتف ذكي XYZ',
        description: 'هاتف ذكي متطور مع كاميرا عالية الدقة وبطارية طويلة العمر',
        price: 1200,
        originalPrice: 1500,
        discount: 20,
        imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000',
        category: 'إلكترونيات',
      },
      {
        id: '2',
        name: 'سماعات لاسلكية',
        description: 'سماعات لاسلكية مع إلغاء الضوضاء وجودة صوت ممتازة',
        price: 300,
        originalPrice: 350,
        discount: 15,
        imageUrl: 'https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=1000',
        category: 'إلكترونيات',
      },
      {
        id: '3',
        name: 'ساعة ذكية',
        description: 'ساعة ذكية مع متتبع للياقة البدنية وشاشة عالية الجودة',
        price: 500,
        imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000',
        category: 'إلكترونيات',
      },
    ];
  });
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Add a new product
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Math.random().toString(36).substring(2, 9),
    };
    setProducts([...products, newProduct]);
  };

  // Remove a product
  const removeProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // Update a product
  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(
      products.map(product => 
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  // Select a product for viewing details
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
