import { ShoppingCart, Star } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  inStock: boolean;
  onClick?: () => void;
}

export function ProductCard({ name, category, price, rating, image, inStock, onClick }: ProductCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-square">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-medium px-3 py-1 bg-red-600 rounded">
              สินค้าหมด
            </span>
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="text-xs text-gray-500 mb-1">{category}</div>
        <h3 className="font-medium text-sm mb-2 line-clamp-2">{name}</h3>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-xs text-gray-600 ml-1">({rating}.0)</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold text-rose-600">฿{price.toLocaleString()}</span>
          </div>
          <button 
            className="p-2 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!inStock}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}