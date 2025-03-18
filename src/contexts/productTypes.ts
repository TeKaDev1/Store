// 🔹 Define the Product Type
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
  
  // 🔹 Define the Context Type
  export type ProductContextType = {
    products: Product[];
    addProduct: (product: Omit<Product, "id">) => Promise<void>;
    removeProduct: (id: string) => Promise<void>;
    updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
    selectedProduct: Product | null;
    selectProduct: (product: Product | null) => void;
  };
  