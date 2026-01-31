import { Link } from "wouter";
import { useProducts } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { ArrowRight, CheckCircle2, Factory, ShieldCheck, Heart, Scissors } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: products, isLoading } = useProducts();
  
  // Take first 4 products as featured
  const featuredProducts = products?.slice(0, 4) || [];

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-white pt-12 pb-20 md:py-32">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                สินค้าคุณภาพจากโรงงานโดยตรง
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                ก้าวสบาย... <br/>
                <span className="text-primary">ในทุกช่วงเวลา</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                ร้านรองเท้า Focus Shoes จำหน่ายรองเท้าสตรี ข้าราชการ พยาบาล 
                คัดสรรหนังแท้คุณภาพเยี่ยม ตัดเย็บปราณีต ใส่สบายตลอดวัน 
                ในราคาโรงงานที่คุณสัมผัสได้
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                    ดูสินค้าทั้งหมด
                  </Button>
                </Link>
                <Link href="/custom-order">
                  <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base border-2 hover:bg-slate-50">
                    สั่งตัดพิเศษ
                  </Button>
                </Link>
              </div>
              
              <div className="mt-12 flex items-center gap-8 text-sm font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span>รับประกันคุณภาพ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Factory className="w-5 h-5 text-primary" />
                  <span>ราคาโรงงาน</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="relative order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              {/* Image from Unsplash: Elegant leather shoes showcase */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent z-10 pointer-events-none" />
                <img 
                  src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop" 
                  alt="Shoes Hero" 
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3"
              >
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">หนังแท้ 100%</div>
                  <div className="text-xs text-slate-500">คัดเกรดพรีเมียม</div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">หมวดหมู่สินค้าแนะนำ</h2>
            <p className="text-slate-500">ตอบโจทย์ทุกอาชีพ ทุกไลฟ์สไตล์</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "รองเท้าพยาบาล", img: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&auto=format&fit=crop", href: "/products?category=พยาบาล" },
              { title: "รองเท้าข้าราชการ", img: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&auto=format&fit=crop", href: "/products?category=ข้าราชการ" },
              { title: "รองเท้าคัทชู", img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&auto=format&fit=crop", href: "/products?category=สตรี" },
              { title: "รองเท้าเพื่อสุขภาพ", img: "https://images.unsplash.com/photo-1534653299134-96a171b61581?w=600&auto=format&fit=crop", href: "/products?tags=comfort" },
            ].map((cat) => (
              <Link key={cat.title} href={cat.href} className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md cursor-pointer">
                <img 
                  src={cat.img} 
                  alt={cat.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-lg group-hover:translate-x-1 transition-transform">{cat.title}</h3>
                  <div className="w-8 h-1 bg-primary mt-2 group-hover:w-16 transition-all duration-300"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">สินค้าขายดี</h2>
              <p className="text-slate-500">รุ่นยอดนิยมที่ลูกค้าไว้วางใจ</p>
            </div>
            <Link href="/products">
              <Button variant="ghost" className="hidden md:flex items-center group">
                ดูทั้งหมด <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white rounded-2xl h-[350px] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/products">
              <Button variant="outline" className="w-full">ดูสินค้าทั้งหมด</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Factory className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">โรงงานผลิตเอง</h3>
              <p className="text-slate-500 leading-relaxed">
                เรามีโรงงานผลิตรองเท้าของตัวเอง ประสบการณ์กว่า 20 ปี ควบคุมคุณภาพทุกขั้นตอน
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">ใส่ใจสุขภาพเท้า</h3>
              <p className="text-slate-500 leading-relaxed">
                ออกแบบโดยคำนึงถึงสรีระเท้า พื้นรองเท้าหนานุ่ม ซัพพอร์ตเท้าได้ดีเยี่ยม
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Scissors className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">สั่งตัดตามขนาด</h3>
              <p className="text-slate-500 leading-relaxed">
                เท้ากว้าง เท้าอูม หรือไซส์พิเศษ เราสามารถปรับแก้ทรงให้พอดีกับเท้าคุณได้
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA SECTION */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">สนใจสั่งผลิตจำนวนมาก?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            เรารับผลิตรองเท้าพยาบาล รองเท้ายูนิฟอร์ม สำหรับหน่วยงาน องค์กร ในราคาส่งพิเศษ พร้อมบริการติดโลโก้
          </p>
          <Link href="/wholesale">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8 h-14 font-bold text-lg">
              ขอใบเสนอราคา
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
