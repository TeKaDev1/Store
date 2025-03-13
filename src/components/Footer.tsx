
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-primary-foreground pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">متجر ليبيا</h3>
            <p className="text-primary-foreground/80 text-sm">
              نقدم أفضل المنتجات بأفضل الأسعار. نلتزم بتقديم تجربة تسوق فريدة ومميزة لعملائنا.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">تواصل معنا</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Phone size={16} />
                <span>218911396826</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Mail size={16} />
                <span>itzhapy@gmail.com</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">تابعنا</h3>
            <div className="flex space-x-4 space-x-reverse">
              <a href="https://www.facebook.com" className="hover:text-white/80 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
             
            </div>
          </motion.div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-6 text-center text-sm text-primary-foreground/60">
          <p>© {currentYear} متجر ليبيا. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
