import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, X } from "lucide-react";

export default function ProductsPage() {
  const [filters, setFilters] = useState<{
    category: string | undefined;
    search: string | undefined;
    priceRange: [number, number];
  }>({
    category: undefined,
    search: undefined,
    priceRange: [0, 3000]
  });

  const { data: products, isLoading } = useProducts({
    category: filters.category,
    search: filters.search,
    minPrice: filters.priceRange[0],
    maxPrice: filters.priceRange[1]
  });

  const CATEGORIES = ["พยาบาล", "ข้าราชการ", "สตรี", "สั่งตัด"];

  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-bold text-lg mb-4">หมวดหมู่</h3>
        <div className="space-y-2">
          <div 
            className={`cursor-pointer py-2 px-3 rounded-md transition-colors ${!filters.category ? 'bg-primary/10 text-primary font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
            onClick={() => setFilters(p => ({ ...p, category: undefined }))}
          >
            ทั้งหมด
          </div>
          {CATEGORIES.map(cat => (
            <div 
              key={cat}
              className={`cursor-pointer py-2 px-3 rounded-md transition-colors ${filters.category === cat ? 'bg-primary/10 text-primary font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
              onClick={() => setFilters(p => ({ ...p, category: cat }))}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-4">ช่วงราคา (บาท)</h3>
        <Slider 
          defaultValue={[0, 3000]} 
          max={5000} 
          step={100}
          value={filters.priceRange}
          onValueChange={(val) => setFilters(p => ({ ...p, priceRange: val as [number, number] }))}
          className="mb-4"
        />
        <div className="flex items-center justify-between text-sm font-medium text-slate-700">
          <span>฿{filters.priceRange[0]}</span>
          <span>฿{filters.priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-4">คุณสมบัติพิเศษ</h3>
        <div className="space-y-3">
          {['หนังแท้', 'พื้นนุ่ม', 'ส้นเตี้ย', 'ส้นสูง'].map(tag => (
            <div key={tag} className="flex items-center space-x-2">
              <Checkbox id={tag} />
              <label htmlFor={tag} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-slate-600">
                {tag}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={() => setFilters({ category: undefined, search: undefined, priceRange: [0, 5000] })}
      >
        ล้างตัวกรอง
      </Button>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b sticky top-0 md:relative z-30">
        <div className="container mx-auto px-6 py-4 md:py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">สินค้าทั้งหมด</h1>
              <p className="text-slate-500 text-sm mt-1">
                {isLoading ? "กำลังโหลด..." : `พบสินค้า ${products?.length || 0} รายการ`}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <Filter className="w-4 h-4 mr-2" /> ตัวกรอง
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-12">
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden md:block w-64 flex-shrink-0">
             <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
               <FilterContent />
             </div>
          </aside>

          {/* PRODUCTS GRID */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-white rounded-2xl h-[350px] animate-pulse" />
                ))}
              </div>
            ) : products && products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-slate-100">
                <div className="text-slate-300 mb-4">
                  <Filter className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">ไม่พบสินค้า</h3>
                <p className="text-slate-500">ลองปรับเปลี่ยนตัวกรองเพื่อค้นหาอีกครั้ง</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
