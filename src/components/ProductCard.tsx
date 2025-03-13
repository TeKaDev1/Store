
import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/contexts/ProductContext';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, description, price, originalPrice, discount, imageUrl, category } = product;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5 }}
      className="product-card w-full h-full flex flex-col"
    >
      <div className="relative overflow-hidden group h-48 sm:h-64">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {discount && (
          <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
            خصم {discount}%
          </Badge>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link 
            to={`/product/${id}`}
            className="bg-white text-black px-4 py-2 rounded-md font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            عرض التفاصيل
          </Link>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
          <Badge variant="outline" className="text-xs">{category}</Badge>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">{description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="font-bold text-primary">{price.toLocaleString()} د.ل</span>
            {originalPrice && (
              <span className="text-muted-foreground text-sm line-through">
                {originalPrice.toLocaleString()} د.ل
              </span>
            )}
          </div>
          
          <Link 
            to={`/product/${id}`}
            className="text-primary hover:underline text-sm font-medium"
          >
            اطلب الآن
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
