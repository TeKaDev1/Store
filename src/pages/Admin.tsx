
import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProductContext } from '@/contexts/ProductContext';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
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
  name: z.string().min(3, { message: 'اسم المنتج مطلوب ويجب أن يتكون من 3 أحرف على الأقل' }),
  description: z.string().min(10, { message: 'وصف المنتج مطلوب ويجب أن يتكون من 10 أحرف على الأقل' }),
  price: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'السعر يجب أن يكون رقماً أكبر من 0',
  }),
  originalPrice: z.string().refine(val => val === '' || (!isNaN(Number(val)) && Number(val) > 0), {
    message: 'السعر الأصلي يجب أن يكون رقماً أكبر من 0',
  }).optional(),
  discount: z.string().refine(val => val === '' || (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100), {
    message: 'الخصم يجب أن يكون رقماً بين 0 و 100',
  }).optional(),
  imageUrl: z.string().url({ message: 'يرجى إدخال رابط صورة صحيح' }),
  category: z.string().min(2, { message: 'فئة المنتج مطلوبة' }),
});

type FormValues = z.infer<typeof formSchema>;

const Admin = () => {
  const { addProduct } = useProductContext();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      discount: '',
      imageUrl: '',
      category: '',
    },
  });
  
  const onSubmit = (values: FormValues) => {
    // Convert string values to numbers
    const price = Number(values.price);
    const originalPrice = values.originalPrice ? Number(values.originalPrice) : undefined;
    const discount = values.discount ? Number(values.discount) : undefined;
    
    // Add the new product
    addProduct({
      name: values.name,
      description: values.description,
      price,
      originalPrice,
      discount,
      imageUrl: values.imageUrl,
      category: values.category,
    });
    
    // Show success message
    toast.success('تمت إضافة المنتج بنجاح!');
    
    // Reset the form
    form.reset();
  };
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6 md:p-8"
        >
          <h1 className="text-2xl font-bold mb-6">إضافة منتج جديد</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم المنتج</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل اسم المنتج" {...field} className="input-field" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وصف المنتج</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="أدخل وصفاً مفصلاً للمنتج" 
                        {...field} 
                        className="input-field min-h-[100px]" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>السعر (د.ل)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="أدخل سعر المنتج" 
                          {...field} 
                          className="input-field" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="originalPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>السعر الأصلي (د.ل) (اختياري)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="أدخل السعر الأصلي" 
                          {...field} 
                          className="input-field" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نسبة الخصم (%) (اختياري)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="أدخل نسبة الخصم" 
                          {...field} 
                          className="input-field" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رابط الصورة</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="أدخل رابط صورة المنتج" 
                        {...field} 
                        className="input-field" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>فئة المنتج</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="أدخل فئة المنتج" 
                        {...field} 
                        className="input-field" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">إضافة المنتج</Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Admin;
