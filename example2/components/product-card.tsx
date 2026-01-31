import { Link } from "wouter";
import { type Product } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.images[0];
  const formattedPrice = new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(product.retailPrice);

  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {product.comfortBadges?.map(badge => (
              <Badge key={badge} variant="secondary" className="bg-white/90 backdrop-blur-sm text-xs font-normal text-slate-800 shadow-sm">
                {badge}
              </Badge>
            ))}
          </div>
          {product.stockStatus !== 'in_stock' && (
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
               <span className="bg-black text-white px-3 py-1 text-sm font-bold uppercase tracking-wider rounded">สินค้าหมด</span>
             </div>
          )}
          <img 
            src={imageUrl} 
            alt={product.nameTH} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <div className="text-xs text-muted-foreground mb-1">{product.category}</div>
          <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-1 mb-1">
            {product.nameTH}
          </h3>
          <div className="mt-auto pt-3 flex items-center justify-between">
            <div className="text-lg font-bold text-primary">{formattedPrice}</div>
            <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary hover:text-white transition-colors">
              <ShoppingBag className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
