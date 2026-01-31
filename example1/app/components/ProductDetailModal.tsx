import { useState, useCallback } from 'react';
import { X, Star, ShoppingCart, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  images: string[];
  inStock: boolean;
  description: string;
  sizes: number[];
  material: string;
}

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaMainApi) {
      emblaMainApi.scrollPrev();
      const newIndex = emblaMainApi.selectedScrollSnap();
      setSelectedImageIndex(newIndex);
    }
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) {
      emblaMainApi.scrollNext();
      const newIndex = emblaMainApi.selectedScrollSnap();
      setSelectedImageIndex(newIndex);
    }
  }, [emblaMainApi]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
      setSelectedImageIndex(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  if (!product) return null;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Carousel */}
        <div className="relative bg-gray-100">
          <div className="overflow-hidden" ref={emblaMainRef}>
            <div className="flex">
              {product.images.map((image, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0">
                  <div className="aspect-square">
                    <ImageWithFallback
                      src={image}
                      alt={`${product.name} - รูปที่ ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {product.images.length > 1 && (
            <>
              <button
                onClick={scrollPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-sm rounded-full">
            {selectedImageIndex + 1} / {product.images.length}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        {product.images.length > 1 && (
          <div className="px-4 py-3 bg-gray-50 border-b">
            <div className="overflow-hidden" ref={emblaThumbsRef}>
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => onThumbClick(index)}
                    className={`flex-[0_0_20%] min-w-0 rounded-lg overflow-hidden border-2 transition-all ${
                      index === selectedImageIndex
                        ? 'border-rose-600 ring-2 ring-rose-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="aspect-square">
                      <ImageWithFallback
                        src={image}
                        alt={`ภาพย่อ ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Details */}
        <div className="p-4 space-y-4">
          {/* Title and Category */}
          <div>
            <div className="text-sm text-gray-500 mb-1">{product.category}</div>
            <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.rating}.0)</span>
            <span className="text-sm text-gray-400">• 127 รีวิว</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-rose-600">
              ฿{product.price.toLocaleString()}
            </span>
            <span className="text-gray-400 line-through text-lg mb-1">
              ฿{(product.price * 1.3).toLocaleString()}
            </span>
          </div>

          {/* Material */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-gray-700">วัสดุ:</span>
            <span className="text-gray-600">{product.material}</span>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">รายละเอียดสินค้า</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">เลือกไซส์</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                    selectedSize === size
                      ? 'border-rose-600 bg-rose-50 text-rose-600'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">จำนวน</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-medium w-12 text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity >= 99}
              >
                <Plus className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-500 ml-2">
                ({product.inStock ? 'มีสินค้า' : 'สินค้าหมด'})
              </span>
            </div>
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600 font-medium">
                ขออภัย สินค้าชิ้นนี้หมดชั่วคราว
              </p>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            disabled={!product.inStock || !selectedSize}
            className="w-full bg-rose-600 text-white py-3 rounded-lg font-medium hover:bg-rose-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            {!selectedSize
              ? 'กรุณาเลือกไซส์'
              : !product.inStock
              ? 'สินค้าหมด'
              : 'เพิ่มลงตะกร้า'}
          </button>

          {/* Additional Info */}
          <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-gray-500">✓</span>
              <span className="text-gray-700">หนังแท้ 100% รับประกันคุณภาพ</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-500">✓</span>
              <span className="text-gray-700">ส่งฟรีทั่วประเทศ สั่งซื้อขั้นต่ำ 1,000 บาท</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-500">✓</span>
              <span className="text-gray-700">รับเปลี่ยนคืนสินค้าภายใน 7 วัน</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
