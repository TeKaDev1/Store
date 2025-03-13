
import React, { createContext, useContext, useState } from 'react';
import { Product } from './ProductContext';
import { toast } from 'sonner';
import emailjs from 'emailjs-com';

export type OrderFormData = {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
  product: Product;
};

type OrderContextType = {
  submitOrder: (formData: OrderFormData) => Promise<boolean>;
  isSubmitting: boolean;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Email and contact information
const ADMIN_EMAIL = "itzhapy@gmail.com";
const ADMIN_PHONE = "218924944337";

// EmailJS service information
const EMAILJS_SERVICE_ID = "itzhapy@gmail.com"; // Your provided service ID
const EMAILJS_TEMPLATE_ID = "template_f5rh7n9"; // Your provided template ID
const EMAILJS_USER_ID = "B6EzNeSIjQOTyWOLO"; // You need to provide your EmailJS user ID

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitOrder = async (formData: OrderFormData): Promise<boolean> => {
    setIsSubmitting(true);
    
    try {
      console.log('Order submitted:', formData);
      console.log('Sending order to email:', ADMIN_EMAIL);
      
      // Prepare the email content
      const templateParams = {
        to_email: ADMIN_EMAIL,
        from_name: formData.name,
        customer_phone: formData.phone,
        customer_address: `${formData.address}, ${formData.city}`,
        product_name: formData.product.name,
        product_price: formData.product.price,
        notes: formData.notes || "لا يوجد ملاحظات",
        reply_to: ADMIN_EMAIL,
      };
      
      // Send email using EmailJS
      // Note: You need to provide your EmailJS user ID to make this work
      if (EMAILJS_USER_ID) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_USER_ID
        );
        console.log('Email sent successfully!');
      } else {
        console.warn('EmailJS User ID is missing. Email not sent.');
      }
      
      // Create WhatsApp URL
      const productInfo = `${formData.product.name} - ${formData.product.price} د.ل`;
      const customerInfo = `${formData.name} - ${formData.phone} - ${formData.address}, ${formData.city}`;
      const whatsappMessage = `طلب جديد: ${productInfo}\nالعميل: ${customerInfo}`;
      const whatsappUrl = `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Open WhatsApp in a new tab/window
      window.open(whatsappUrl, '_blank');
      
      // Show success toast
      toast.success("تم تقديم الطلب بنجاح!", {
        description: "سيتم التواصل معك قريباً لتأكيد الطلب."
      });
      
      return true;
    } catch (error) {
      console.error('Error submitting order:', error);
      
      // Show error toast
      toast.error("حدث خطأ أثناء تقديم الطلب", {
        description: "يرجى المحاولة مرة أخرى."
      });
      
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <OrderContext.Provider value={{ submitOrder, isSubmitting }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
};
