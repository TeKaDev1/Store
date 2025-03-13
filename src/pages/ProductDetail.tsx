import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProductContext } from '@/contexts/ProductContext';
import Layout from '@/components/Layout';
import { ArrowRight, Check, Truck, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, selectProduct } = useProductContext();
  
  const product = products.find(p => p.id === id);
  
  useEffect(() => {
    if (!product) {
      navigate('/products');
      toast.error('لم يتم العثور على المنتج');
      return;
    }
    
    // Set the selected product in context
    selectProduct(product);
    
    // Cleanup
    return () => {
      selectProduct(null);
    };
  }, [product, navigate, selectProduct, toast]);
  
  if (!product) return null;
  
  const { name, description, price, originalPrice, discount, imageUrl, category } = product;
  const savings = originalPrice ? originalPrice - price : 0;
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowRight className="mr-2 h-4 w-4" />
            العودة
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl overflow-hidden shadow-md p-4 flex items-center justify-center"
          >
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full max-w-lg max-h-[500px] object-contain"
            />
          </motion.div>
          
          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <Badge variant="outline" className="self-start mb-2">{category}</Badge>
            <h1 className="text-3xl font-bold mb-2">{name}</h1>
            
            <div className="flex items-baseline mb-6">
              <span className="text-2xl font-bold text-primary mr-3">{price.toLocaleString()} د.ل</span>
              {originalPrice && (
                <>
                  <span className="text-muted-foreground line-through mr-3">
                    {originalPrice.toLocaleString()} د.ل
                  </span>
                  <Badge variant="destructive" className="text-xs">خصم {discount}%</Badge>
                </>
              )}
            </div>
            
            {savings > 0 && (
              <div className="bg-secondary p-3 rounded-lg mb-6 inline-block">
                <p className="text-sm text-primary font-medium">
                  توفير: {savings.toLocaleString()} د.ل
                </p>
              </div>
            )}
            
            <p className="text-muted-foreground mb-8">{description}</p>
            
            <Separator className="mb-8" />
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <span>ضمان الجودة 100%</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <span>توصيل سريع لجميع المناطق</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-primary/10 p-2 rounded-full">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <span>دفع آمن عند الاستلام</span>
              </div>
            </div>
            
            <Button 
              className="w-full py-6 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg"
              onClick={() => navigate(`/checkout/${id}`)}
            >
              اطلب الآن
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
