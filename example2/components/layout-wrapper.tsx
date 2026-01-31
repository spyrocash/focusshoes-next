import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingBag, Phone, Home, User, Scissors, Box, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

const NAV_LINKS = [
  { href: "/", label: "หน้าแรก", icon: Home },
  { href: "/products", label: "สินค้าทั้งหมด", icon: ShoppingBag },
  { href: "/custom-order", label: "สั่งตัด", icon: Scissors },
  { href: "/wholesale", label: "ราคาส่ง", icon: Box },
  { href: "/contact", label: "ติดต่อเรา", icon: Phone },
];

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* --- DESKTOP HEADER --- */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-white py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-primary">
            FOCUS <span className="text-foreground">SHOES</span>
          </Link>

          <nav className="flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors hover:text-primary ${location === link.href ? "text-primary" : "text-muted-foreground"}`}>
                  {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <Search className="w-5 h-5" />
            </Button>
            <Button className="rounded-full px-6 shadow-lg hover:shadow-primary/25 bg-primary text-primary-foreground hover:bg-primary/90">
              แจ้งชำระเงิน
            </Button>
          </div>
        </div>
      </header>

      {/* --- MOBILE HEADER --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b md:hidden px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-primary">
          FOCUS SHOES
        </Link>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col h-full py-6">
              <div className="text-xl font-bold mb-8 px-2 text-primary">เมนูหลัก</div>
              <nav className="flex flex-col space-y-2">
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} className={`flex items-center px-4 py-3 rounded-lg text-lg font-medium transition-colors ${location === link.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>
                      <link.icon className="w-5 h-5 mr-3" />
                      {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto">
                 <Button className="w-full bg-primary mb-2">เข้าสู่ระบบ</Button>
                 <div className="text-center text-xs text-muted-foreground">© 2024 Focus Shoes</div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 pt-16 md:pt-24 min-h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-200 py-12 pb-24 md:pb-12">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">FOCUS SHOES</h3>
            <p className="text-slate-400 mb-6 max-w-sm leading-relaxed">
              ผู้ผลิตและจำหน่ายรองเท้าหนังแท้คุณภาพสูง ประสบการณ์กว่า 20 ปี 
              รองเท้าพยาบาล รองเท้าข้าราชการ รองเท้าสตรี ตัดเย็บปราณีต ใส่สบาย ราคาโรงงาน
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">เมนู</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="/products" className="hover:text-primary transition-colors">สินค้าทั้งหมด</Link></li>
              <li><Link href="/custom-order" className="hover:text-primary transition-colors">สั่งตัดพิเศษ</Link></li>
              <li><Link href="/wholesale" className="hover:text-primary transition-colors">ขายส่ง / ตัวแทน</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">เกี่ยวกับเรา</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">ติดต่อเรา</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="flex items-start"><span className="mr-2">📍</span> 123 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กทม. 10110</li>
              <li className="flex items-center"><span className="mr-2">📞</span> 081-234-5678</li>
              <li className="flex items-center"><span className="mr-2">💬</span> Line ID: @focusshoes</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          © 2024 Focus Shoes. All rights reserved.
        </div>
      </footer>

      {/* --- MOBILE BOTTOM NAV --- */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t md:hidden flex justify-around items-center h-16 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <Link href="/" className={`flex flex-col items-center justify-center w-full h-full ${location === '/' ? 'text-primary' : 'text-slate-400'}`}>
            <Home className="w-5 h-5 mb-1" />
            <span className="text-[10px]">หน้าแรก</span>
        </Link>
        <Link href="/products" className={`flex flex-col items-center justify-center w-full h-full ${location === '/products' ? 'text-primary' : 'text-slate-400'}`}>
            <ShoppingBag className="w-5 h-5 mb-1" />
            <span className="text-[10px]">สินค้า</span>
        </Link>
        <Link href="/custom-order" className={`flex flex-col items-center justify-center w-full h-full ${location === '/custom-order' ? 'text-primary' : 'text-slate-400'}`}>
            <Scissors className="w-5 h-5 mb-1" />
            <span className="text-[10px]">สั่งตัด</span>
        </Link>
        <Link href="/contact" className={`flex flex-col items-center justify-center w-full h-full ${location === '/contact' ? 'text-primary' : 'text-slate-400'}`}>
            <Phone className="w-5 h-5 mb-1" />
            <span className="text-[10px]">ติดต่อ</span>
        </Link>
      </div>
    </div>
  );
}
