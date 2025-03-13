
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const OrderSuccess = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-8 md:p-12 text-center"
        >
          <div className="mb-6 flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="h-24 w-24 text-green-500" />
            </motion.div>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            تم تقديم طلبك بنجاح!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-muted-foreground mb-8"
          >
            شكراً لطلبك! سيتم التواصل معك قريباً لتأكيد التفاصيل. يمكنك متابعة الطلب من خلال رقم الهاتف الذي قمت بإدخاله.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse"
          >
            <Link 
              to="/" 
              className="btn-primary inline-flex items-center space-x-2 space-x-reverse"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>العودة للرئيسية</span>
            </Link>
            
            <Link 
              to="/products" 
              className="text-primary underline hover:text-primary/80"
            >
              تصفح المزيد من المنتجات
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
