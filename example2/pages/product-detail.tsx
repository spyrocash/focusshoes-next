import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useProduct } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShoppingBag, Heart, ShieldCheck, Ruler, Truck, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetailPage() {
  const [, params] = useRoute("/products/:slug");
  const slug = params?.slug || "";
  const { data: product, isLoading } = useProduct(slug);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-12 md:py-20 animate-pulse">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="aspect-square bg-slate-200 rounded-3xl" />
          <div className="space-y-4">
            <div className="h-8 bg-slate-200 w-3/4 rounded" />
            <div className="h-4 bg-slate-200 w-1/2 rounded" />
            <div className="h-24 bg-slate-200 w-full rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">ไม่พบสินค้านี้</h1>
        <Link href="/products"><Button>กลับไปหน้าสินค้า</Button></Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(product.retailPrice);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-8 md:py-16">
        {/* BREADCRUMB */}
        <div className="text-sm text-slate-500 mb-8">
           <Link href="/" className="hover:text-primary">หน้าแรก</Link> / 
           <Link href="/products" className="hover:text-primary mx-1">สินค้า</Link> / 
           <span className="text-slate-900 mx-1">{product.nameTH}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* IMAGES */}
          <div className="space-y-4">
            <motion.div 
              key={selectedImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="aspect-square bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 relative group"
            >
              <img 
                src={product.images[selectedImageIndex]} 
                alt={product.nameTH} 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${selectedImageIndex === idx ? 'border-primary' : 'border-transparent hover:border-slate-200'}`}
                  onClick={() => setSelectedImageIndex(idx)}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <div className="mb-6">
              <Badge variant="secondary" className="mb-3">{product.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 leading-tight">{product.nameTH}</h1>
              <div className="text-2xl md:text-3xl font-bold text-primary mt-4">{formattedPrice}</div>
            </div>

            <div className="space-y-6">
              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold text-slate-900">เลือกขนาด (EU)</div>
                  <Button variant="link" className="text-primary p-0 h-auto text-sm">ตารางไซส์</Button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`h-12 rounded-lg border flex items-center justify-center font-medium transition-all ${
                        selectedSize === size 
                          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25' 
                          : 'bg-white text-slate-600 border-slate-200 hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button className="flex-1 h-14 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  สั่งซื้อสินค้า
                </Button>
                <Button size="icon" variant="outline" className="h-14 w-14 rounded-full border-2">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {/* Short Description */}
              <p className="text-slate-600 leading-relaxed text-lg">
                {product.description || "รองเท้าคุณภาพสูง ผลิตจากหนังแท้ 100% สวมใส่สบาย ออกแบบมาเพื่อรองรับสรีระเท้าโดยเฉพาะ เหมาะสำหรับการยืนเดินนานๆ"}
              </p>
              
              {/* Features List */}
              <div className="grid grid-cols-2 gap-4 py-4">
                 <div className="flex items-start gap-3">
                   <ShieldCheck className="w-5 h-5 text-primary mt-1" />
                   <div className="text-sm">
                     <div className="font-semibold">รับประกัน 6 เดือน</div>
                     <div className="text-slate-500">ซ่อมฟรีหากมีปัญหา</div>
                   </div>
                 </div>
                 <div className="flex items-start gap-3">
                   <Ruler className="w-5 h-5 text-primary mt-1" />
                   <div className="text-sm">
                     <div className="font-semibold">ตรงไซส์มาตรฐาน</div>
                     <div className="text-slate-500">ไม่ต้องเผื่อไซส์</div>
                   </div>
                 </div>
                 <div className="flex items-start gap-3">
                   <Truck className="w-5 h-5 text-primary mt-1" />
                   <div className="text-sm">
                     <div className="font-semibold">ส่งฟรีทั่วไทย</div>
                     <div className="text-slate-500">เมื่อซื้อครบ 1000 บาท</div>
                   </div>
                 </div>
                 <div className="flex items-start gap-3">
                   <RotateCcw className="w-5 h-5 text-primary mt-1" />
                   <div className="text-sm">
                     <div className="font-semibold">เปลี่ยนไซส์ได้</div>
                     <div className="text-slate-500">ภายใน 7 วัน</div>
                   </div>
                 </div>
              </div>

              {/* Accordion Details */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>รายละเอียดวัสดุ</AccordionTrigger>
                  <AccordionContent>
                    {product.material} - หนังวัวแท้เกรดพรีเมียม ซับในหนังลูกวัว พื้นยางพาราธรรมชาติกันลื่น
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>การดูแลรักษา</AccordionTrigger>
                  <AccordionContent>
                    ใช้ผ้าสะอาดเช็ดฝุ่น และใช้น้ำยาขัดเงาหนังแท้เพื่อยืดอายุการใช้งาน หลีกเลี่ยงการเก็บในที่ชื้น
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
