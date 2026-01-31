import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWholesaleInquirySchema, type InsertWholesaleInquiry } from "@shared/schema";
import { useWholesaleInquiry } from "@/hooks/use-orders";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Building2, Truck, Users, CheckCircle } from "lucide-react";

export default function WholesalePage() {
  const { toast } = useToast();
  const { mutate, isPending } = useWholesaleInquiry();
  
  const form = useForm<InsertWholesaleInquiry>({
    resolver: zodResolver(insertWholesaleInquirySchema),
    defaultValues: {
      contactName: "",
      companyName: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(data: InsertWholesaleInquiry) {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "ส่งข้อมูลเรียบร้อย",
          description: "ทีมงานฝ่ายขายส่งจะติดต่อกลับภายใน 1 วันทำการ",
        });
        form.reset();
      },
      onError: (err) => {
        toast({
          title: "เกิดข้อผิดพลาด",
          description: err.message,
          variant: "destructive",
        });
      },
    });
  }

  return (
    <div>
       {/* HERO */}
       <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">บริการขายส่ง & ผลิตตามออเดอร์</h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
              โรงงาน Focus Shoes รับผลิตรองเท้าพยาบาล รองเท้ายูนิฟอร์ม รองเท้าแฟชั่นสตรี 
              คุณภาพส่งออก ในราคาโรงงานที่แข่งขันได้
            </p>
          </div>
       </section>

       {/* FEATURES */}
       <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center px-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                  <Building2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">กำลังการผลิตสูง</h3>
                <p className="text-slate-500">
                  รองรับออเดอร์ใหญ่ได้ทันท่วงที ด้วยทีมช่างผู้ชำนาญการและเครื่องจักรทันสมัย
                </p>
              </div>
              <div className="text-center px-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                  <Truck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">จัดส่งทั่วประเทศ</h3>
                <p className="text-slate-500">
                  มีบริการจัดส่งผ่านขนส่งเอกชน ถึงมือร้านค้าของคุณอย่างรวดเร็วและปลอดภัย
                </p>
              </div>
              <div className="text-center px-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">ราคาส่งจริงใจ</h3>
                <p className="text-slate-500">
                  ไม่มีขั้นต่ำที่ซับซ้อน เริ่มต้นง่ายสำหรับผู้เริ่มทำธุรกิจ ยิ่งสั่งมาก ยิ่งลดมาก
                </p>
              </div>
            </div>
          </div>
       </section>

       {/* INQUIRY FORM */}
       <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200">
              <h2 className="text-2xl font-bold mb-2 text-center">ขอใบเสนอราคา / สอบถามข้อมูล</h2>
              <p className="text-center text-slate-500 mb-8">กรอกข้อมูลเพื่อให้เจ้าหน้าที่ติดต่อกลับ</p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ชื่อผู้ติดต่อ</FormLabel>
                          <FormControl>
                            <Input placeholder="ชื่อ-นามสกุล" {...field} />
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
                          <FormLabel>เบอร์โทรศัพท์</FormLabel>
                          <FormControl>
                            <Input placeholder="08x-xxx-xxxx" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ชื่อร้าน / บริษัท (ถ้ามี)</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>รายละเอียดที่ต้องการสอบถาม</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="เช่น สนใจรองเท้าพยาบาลจำนวน 50 คู่, ต้องการสั่งผลิตแบรนด์ตัวเอง" 
                            className="min-h-[120px]"
                            {...field} 
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full h-12 text-lg font-bold mt-4" disabled={isPending}>
                    {isPending ? "กำลังส่งข้อมูล..." : "ส่งข้อความ"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
       </section>

       {/* FAQ (Mini) */}
       <section className="py-20 bg-white">
         <div className="container mx-auto px-6 max-w-3xl">
           <h2 className="text-2xl font-bold mb-8 text-center">คำถามที่พบบ่อย (Wholesale)</h2>
           <div className="space-y-6">
             <div className="border-b pb-6">
               <h3 className="font-bold text-lg mb-2">ขั้นต่ำในการสั่งผลิตเท่าไหร่?</h3>
               <p className="text-slate-600">สำหรับแบบมาตรฐานของโรงงาน ขั้นต่ำเพียง 12 คู่ (คละไซส์ได้) สำหรับการสั่งผลิตแบบใหม่ (OEM) ขั้นต่ำ 60 คู่ต่อแบบ</p>
             </div>
             <div className="border-b pb-6">
               <h3 className="font-bold text-lg mb-2">ระยะเวลาในการผลิตนานไหม?</h3>
               <p className="text-slate-600">ปกติใช้เวลา 14-20 วัน ขึ้นอยู่กับจำนวนและคิวงานในช่วงนั้นๆ</p>
             </div>
             <div>
               <h3 className="font-bold text-lg mb-2">สามารถตีแบรนด์ตัวเองได้ไหม?</h3>
               <p className="text-slate-600">ได้ครับ เรามีบริการปั๊มโลโก้ที่พื้นรองเท้าและกล่องรองเท้า (มีค่าบล็อกโลโก้ในครั้งแรก)</p>
             </div>
           </div>
         </div>
       </section>
    </div>
  );
}
