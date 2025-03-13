
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProductContext } from '@/contexts/ProductContext';
import { useOrderContext, OrderFormData } from '@/contexts/OrderContext';
import Layout from '@/components/Layout';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(3, { message: 'الاسم مطلوب ويجب أن يتكون من 3 أحرف على الأقل' }),
  phone: z.string().min(10, { message: 'يرجى إدخال رقم هاتف صحيح' }),
  address: z.string().min(5, { message: 'العنوان مطلوب ويجب أن يتكون من 5 أحرف على الأقل' }),
  city: z.string().min(2, { message: 'المدينة مطلوبة' }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useProductContext();
  const { submitOrder, isSubmitting } = useOrderContext();
  
  const product = products.find(p => p.id === id);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      city: '',
      notes: '',
    },
  });
  
  if (!product) {
    navigate('/products');
    return null;
  }
  
  const { name, description, price, originalPrice, discount, imageUrl, category } = product;
  
  const onSubmit = async (values: FormValues) => {
    // Ensure all required fields are present in orderData
    const orderData: OrderFormData = {
      name: values.name,
      phone: values.phone,
      address: values.address,
      city: values.city,
      notes: values.notes,
      product,
    };
    
    const success = await submitOrder(orderData);
    
    if (success) {
      // Redirect to success page
      navigate('/order-success');
    }
  };
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
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
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          إتمام الطلب
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Order Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6">معلومات التوصيل</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الاسم الكامل</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل اسمك الكامل" {...field} className="input-field" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رقم الهاتف</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل رقم هاتفك" {...field} className="input-field" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>العنوان</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل عنوان التوصيل" {...field} className="input-field" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المدينة</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل اسم المدينة" {...field} className="input-field" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ملاحظات إضافية (اختياري)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="أي معلومات إضافية تريد إضافتها للطلب" 
                            {...field} 
                            className="input-field min-h-[100px]" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full py-6 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري إرسال الطلب...
                      </>
                    ) : (
                      'تأكيد الطلب'
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
          
          {/* Order Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">ملخص الطلب</h2>
              
              <div className="flex items-center space-x-4 space-x-reverse mb-6">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">{name}</h3>
                  <Badge variant="outline" className="mt-1">{category}</Badge>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">سعر المنتج</span>
                  <span>{price.toLocaleString()} د.ل</span>
                </div>
                
                {originalPrice && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">الخصم</span>
                    <span className="text-destructive">-{(originalPrice - price).toLocaleString()} د.ل</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">تكلفة التوصيل</span>
                  <span>مجاناً</span>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex justify-between font-bold">
                <span>الإجمالي</span>
                <span>{price.toLocaleString()} د.ل</span>
              </div>
              
              <div className="mt-6 bg-secondary p-4 rounded-lg text-sm">
                <p className="text-muted-foreground">
                  سيتم التواصل معك لتأكيد الطلب بعد إتمام عملية الشراء
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
