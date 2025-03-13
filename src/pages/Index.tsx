
import React from 'react';
import { motion } from 'framer-motion';
import { useProductContext } from '@/contexts/ProductContext';
import ProductCard from '@/components/ProductCard';
import Layout from '@/components/Layout';
import { ArrowLeft, ShoppingBag, Truck, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { products } = useProductContext();
  const featuredProducts = products.slice(0, 3);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-6 md:px-12 bg-gradient-to-b from-secondary to-background overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center md:text-right"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              تسوق أفضل المنتجات بأفضل الأسعار
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto md:mx-0">
              اكتشف تجربة تسوق فريدة مع منتجات عالية الجودة وتوصيل سريع في جميع أنحاء ليبيا
            </p>
            <Link 
              to="/products" 
              className="btn-primary inline-flex items-center space-x-2 space-x-reverse"
            >
              <span>تسوق الآن</span>
              <ArrowLeft size={18} />
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square p-8 rounded-full bg-primary/5 border border-primary/10 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=1000" 
                alt="Featured Products" 
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-full" />
            </div>
            
            {/* Floating elements */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="glass-card absolute top-5 left-0 md:-left-8 py-3 px-4 rounded-lg"
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-primary/10 p-2 rounded-full">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">منتجات حصرية</p>
                  <p className="text-xs text-muted-foreground">أعلى جودة في السوق</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="glass-card absolute bottom-5 right-0 md:-right-8 py-3 px-4 rounded-lg"
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">توصيل سريع</p>
                  <p className="text-xs text-muted-foreground">في جميع أنحاء ليبيا</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-16 right-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-4"
            >
              منتجاتنا المميزة
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              اكتشف أحدث المنتجات ذات الجودة العالية بأفضل الأسعار في السوق
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link to="/products" className="btn-primary">
              عرض جميع المنتجات
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-6 md:px-12 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-4"
            >
              لماذا تختارنا؟
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              نقدم لك تجربة تسوق مميزة من البداية إلى النهاية
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-sm text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">منتجات حصرية</h3>
              <p className="text-muted-foreground">نقدم منتجات ذات جودة عالية تم اختيارها بعناية لتلبية احتياجاتك</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-sm text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">توصيل سريع</h3>
              <p className="text-muted-foreground">نوصل منتجاتك بسرعة وأمان إلى باب منزلك في جميع أنحاء ليبيا</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-8 rounded-xl shadow-sm text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <PhoneCall className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">خدمة عملاء ممتازة</h3>
              <p className="text-muted-foreground">فريق خدمة العملاء لدينا متاح للإجابة على جميع استفساراتك</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto bg-primary rounded-2xl overflow-hidden shadow-xl">
          <div className="relative p-8 md:p-12">
            <div className="relative z-10">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-4 text-white text-center"
              >
                ابدأ التسوق الآن
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-white/80 mb-8 text-center max-w-xl mx-auto"
              >
                استكشف مجموعتنا الواسعة من المنتجات واستمتع بتجربة تسوق مميزة
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <Link to="/products" className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-lg font-medium transition-colors inline-block">
                  تصفح المنتجات
                </Link>
              </motion.div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full transform -translate-x-1/3 translate-y-1/3" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
