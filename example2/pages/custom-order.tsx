import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCustomOrderSchema, type InsertCustomOrder } from "@shared/schema";
import { useCustomOrder } from "@/hooks/use-orders";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Scissors, Ruler, PaintBucket, FileText } from "lucide-react";

export default function CustomOrderPage() {
  const { toast } = useToast();
  const { mutate, isPending } = useCustomOrder();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<InsertCustomOrder>({
    resolver: zodResolver(insertCustomOrderSchema),
    defaultValues: {
      style: "",
      color: "",
      size: "",
      width: "",
      notes: "",
      contactName: "",
      contactPhone: "",
      contactLineId: "",
    },
  });

  function onSubmit(data: InsertCustomOrder) {
    mutate(data, {
      onSuccess: () => {
        setSubmitted(true);
        toast({
          title: "ส่งคำสั่งซื้อสำเร็จ",
          description: "เราจะติดต่อกลับโดยเร็วที่สุดเพื่อยืนยันรายละเอียด",
        });
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

  if (submitted) {
    return (
      <div className="container mx-auto px-6 py-24 text-center max-w-lg">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Scissors className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold mb-4">ขอบคุณสำหรับข้อมูล</h1>
        <p className="text-slate-500 text-lg mb-8">
          ทางร้านได้รับรายละเอียดการสั่งตัดแล้ว เจ้าหน้าที่จะทำการติดต่อกลับไปที่เบอร์โทรศัพท์หรือ Line ID ที่ท่านให้ไว้ภายใน 24 ชั่วโมง
        </p>
        <Button onClick={() => window.location.href = '/'} variant="outline">กลับสู่หน้าหลัก</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">บริการสั่งตัดรองเท้า</h1>
          <p className="text-slate-500">
            เท้ากว้าง เท้าอูม หรือมีปัญหาสุขภาพเท้า? เราพร้อมตัดรองเท้าคู่ใจที่พอดีกับเท้าคุณที่สุด 
            ด้วยช่างฝีมือประสบการณ์กว่า 20 ปี
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* INFO SIDEBAR */}
          <div className="lg:col-span-1 space-y-6">
             <Card>
               <CardHeader>
                 <CardTitle className="flex items-center gap-2"><Ruler className="w-5 h-5 text-primary" /> วิธีวัดขนาดเท้า</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4 text-sm text-slate-600">
                 <p>1. วางเท้าบนกระดาษเปล่า</p>
                 <p>2. วาดเส้นรอบเท้าด้วยดินสอ (ตั้งดินสอให้ตรง 90 องศา)</p>
                 <p>3. วัดความยาวจากส้นเท้าถึงนิ้วที่ยาวที่สุด</p>
                 <p>4. วัดความกว้างส่วนที่กว้างที่สุดของเท้า</p>
                 <div className="bg-slate-100 p-3 rounded text-xs">
                   * ควรวัดช่วงบ่ายหรือเย็น เพราะเท้าจะขยายตัวเต็มที่
                 </div>
               </CardContent>
             </Card>
             <Card>
               <CardHeader>
                 <CardTitle className="flex items-center gap-2"><PaintBucket className="w-5 h-5 text-primary" /> วัสดุและสี</CardTitle>
               </CardHeader>
               <CardContent className="text-sm text-slate-600">
                 เราใช้หนังวัวแท้เกรดพรีเมียม มีให้เลือกมากกว่า 20 สี ทั้งหนังเรียบ หนังนิ่ม และหนังกลับ สามารถเลือกได้ในแบบฟอร์ม
               </CardContent>
             </Card>
          </div>

          {/* ORDER FORM */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle>แบบฟอร์มสั่งตัด</CardTitle>
                <CardDescription>กรุณากรอกข้อมูลให้ครบถ้วน</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="style"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ทรงรองเท้าที่ต้องการ</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="เลือกทรงรองเท้า" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="คัทชูหัวแหลม">คัทชูหัวแหลม</SelectItem>
                                <SelectItem value="คัทชูหัวมน">คัทชูหัวมน</SelectItem>
                                <SelectItem value="คัทชูหัวตัด">คัทชูหัวตัด</SelectItem>
                                <SelectItem value="รองเท้าพยาบาล">รองเท้าพยาบาล</SelectItem>
                                <SelectItem value="อื่นๆ">อื่นๆ (ระบุในหมายเหตุ)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>สีหนัง</FormLabel>
                            <FormControl>
                              <Input placeholder="เช่น ดำ, น้ำตาลเข้ม, ครีม" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ขนาดไซส์ (EU) หรือ ความยาว (ซม.)</FormLabel>
                            <FormControl>
                              <Input placeholder="เช่น 38 หรือ 24.5 ซม." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="width"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ความกว้างเท้า (ซม.)</FormLabel>
                            <FormControl>
                              <Input placeholder="เช่น 9.5 ซม." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>รายละเอียดเพิ่มเติม / ปัญหาเท้า</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="เช่น กระดูกโปนนิ้วโป้ง, เท้าแบน, ต้องการเสริมส้นพิเศษ" 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="border-t pt-6 mt-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-primary"/> ข้อมูลติดต่อกลับ</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="contactName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ชื่อ-นามสกุล</FormLabel>
                              <FormControl>
                                <Input placeholder="ชื่อผู้ติดต่อ" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="contactPhone"
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
                        <FormField
                          control={form.control}
                          name="contactLineId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Line ID (ถ้ามี)</FormLabel>
                              <FormControl>
                                <Input placeholder="" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button type="submit" size="lg" className="w-full h-12 text-lg font-bold" disabled={isPending}>
                        {isPending ? "กำลังส่งข้อมูล..." : "ส่งข้อมูลการสั่งตัด"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
