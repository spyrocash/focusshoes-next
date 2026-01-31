import { useState } from 'react';
import { Menu, X, Phone, MapPin, Clock, Award, Shield, Scissors } from 'lucide-react';
import { ProductCard } from '@/app/components/ProductCard';
import { ProductDetailModal, Product } from '@/app/components/ProductDetailModal';

const categories = [
  { id: 'all', name: 'ทั้งหมด' },
  { id: 'women', name: 'รองเท้าสตรี' },
  { id: 'officer', name: 'ข้าราชการ' },
  { id: 'nurse', name: 'พยาบาล' },
];

const products: Product[] = [
  {
    id: 1,
    name: 'รองเท้าคัชชูหนังแท้ สีดำ ส้นเตี้ย สำหรับข้าราชการ',
    category: 'ข้าราชการ',
    price: 990,
    rating: 5,
    images: [
      'https://images.unsplash.com/photo-1708242355178-d8c929b01a9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGxlYXRoZXIlMjBmbGF0cyUyMHdvbWVufGVufDF8fHx8MTc2OTg3MjkyNXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1682329782559-c8084b62733b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGxlYXRoZXIlMjBmbGF0cyUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzY5ODczNjg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1763888647863-d6d0c7383151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBzaG9lcyUyMGJsYWNrJTIwZGV0YWlsfGVufDF8fHx8MTc2OTg3MzY5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    inStock: true,
    description: 'รองเท้าคัชชูหนังแท้คุณภาพสูง ออกแบบมาเพื่อข้าราชการโดยเฉพาะ ส้นเตี้ยสวมใส่สบาย ไม่ปวดเท้าแม้ใช้งานทั้งวัน พื้นรองเท้านุ่ม รองรับการเดินยาว ทรงสวยเหมาะกับการทำงาน',
    sizes: [35, 36, 37, 38, 39, 40],
    material: 'หนังแท้ 100%',
  },
  {
    id: 2,
    name: 'รองเท้าพยาบาล หนังนิ่ม สีขาว สวมใส่สบาย ไม่ปวดเท้า',
    category: 'พยาบาล',
    price: 850,
    rating: 5,
    images: [
      'https://images.unsplash.com/photo-1768726051720-998290619ae0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXJzZSUyMG1lZGljYWwlMjBzaG9lcyUyMHdoaXRlfGVufDF8fHx8MTc2OTg3MjkyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1663151860122-4890a08dc22b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMG51cnNlJTIwc2hvZXMlMjBkZXRhaWx8ZW58MXx8fHwxNzY5ODczNjg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    inStock: true,
    description: 'รองเท้าพยาบาลหนังนิ่ม ออกแบบเพื่อการใช้งานในโรงพยาบาล สีขาวสะอาดตา สวมใส่สบายแม้ยืนทำงานนานๆ พื้นรองเท้าใช้วัสดุคุณภาพสูง กันลื่น ทนทาน',
    sizes: [35, 36, 37, 38, 39, 40, 41],
    material: 'หนังนิ่มคุณภาพ',
  },
  {
    id: 3,
    name: 'รองเท้าออฟฟิศ หนังแท้ ทรงสวย เหมาะกับการทำงาน',
    category: 'รองเท้าสตรี',
    price: 1290,
    rating: 5,
    images: [
      'https://images.unsplash.com/photo-1609559756315-17996df12f21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBvZmZpY2UlMjBzaG9lcyUyMHdvbWVufGVufDF8fHx8MTc2OTg3MjkyNHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1621665422129-a03cc387bc7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGxlYXRoZXIlMjBvZmZpY2UlMjBzaG9lc3xlbnwxfHx8fDE3Njk4NzM2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1621703730619-14efc794f8de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHNob2VzJTIwbGVhdGhlciUyMHRleHR1cmV8ZW58MXx8fHwxNzY5ODczNjkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    inStock: true,
    description: 'รองเท้าออฟฟิศสุดหรู หนังแท้นุ่ม ทรงสวยงาม เพิ่มความมั่นใจในการทำงาน ดีไซน์ทันสมัย เข้ากับชุดทำงานทุกแบบ สวมใส่สบายไม่เมื่อยเท้า',
    sizes: [35, 36, 37, 38, 39, 40],
    material: 'หนังแท้ 100%',
  },
  {
    id: 4,
    name: 'รองเท้าส้นสูง หนังแท้ เบา สบายเท้า สวยหรู',
    category: 'รองเท้าสตรี',
    price: 1490,
    rating: 5,
    images: [
      'https://images.unsplash.com/photo-1553808373-b2c5b7ddb117?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwaGVlbHMlMjBzaG9lc3xlbnwxfHx8fDE3Njk4NzI5MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1760473004054-eb0fd50ea9ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBoZWVscyUyMGVsZWdhbnQlMjB3b21lbnxlbnwxfHx8fDE3Njk4NzM2OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    inStock: true,
    description: 'รองเท้าส้นสูงหนังแท้ ออกแบบพิเศษให้เบา สวมใส่สบาย ส้นสูงแต่ไม่เมื่อยเท้า เหมาะกับงานปาร์ตี้ งานแต่งงาน หรือโอกาสพิเศษ ทรงสวยเพิ่มความมั่นใจ',
    sizes: [35, 36, 37, 38, 39],
    material: 'หนังแท้ 100%',
  },
  {
    id: 5,
    name: 'รองเท้าหุ้มส้น หนังนิ่ม พื้นเบา สวมใส่สบายตลอดวัน',
    category: 'รองเท้าสตรี',
    price: 990,
    rating: 4,
    images: [
      'https://images.unsplash.com/photo-1576133385309-203e67da8e58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21mb3J0YWJsZSUyMGxlYXRoZXIlMjBsb2FmZXJzfGVufDF8fHx8MTc2OTg3MjkyNHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1708962000105-849e984e69a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwbG9hZmVycyUyMGRldGFpbCUyMHZpZXd8ZW58MXx8fHwxNzY5ODczNjg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    inStock: true,
    description: 'รองเท้าหุ้มส้นหนังนิ่ม ทรงทันสมัย พื้นนุ่มเบา ใส่สบายตลอดวัน เหมาะกับการใช้งานประจำวัน ไปทำงาน เดินเล่น ช้อปปิ้ง คุณภาพดีราคาไม่แพง',
    sizes: [35, 36, 37, 38, 39, 40, 41],
    material: 'หนังนิ่มคุณภาพ',
  },
  {
    id: 6,
    name: 'รองเท้าคัชชู หนังแท้ ทรงคลาสสิก เหมาะกับทุกโอกาส',
    category: 'รองเท้าสตรี',
    price: 1190,
    rating: 5,
    images: [
      'https://images.unsplash.com/photo-1490243248048-8a68b3b77805?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGxlYXRoZXIlMjBzaG9lcyUyMGVsZWdhbnR8ZW58MXx8fHwxNzY5ODcyOTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1653868250450-b83e6263d427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwcHVtcHMlMjBzaG9lcyUyMGxlYXRoZXJ8ZW58MXx8fHwxNzY5ODczNjg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    inStock: false,
    description: 'รองเท้าคัชชูคลาสสิก หนังแท้คุณภาพเยี่ยม ทรงสวยเหนือกาลเวลา เข้ากับทุกสไตล์ การแต่ง เหมาะกับทั้งงานทางการและงานสบายๆ ของขวัญที่ดีสำหรับคนพิเศษ',
    sizes: [35, 36, 37, 38, 39, 40],
    material: 'หนังแท้ 100%',
  },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === categories.find(c => c.id === selectedCategory)?.name);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-rose-600 text-white sticky top-0 z-50 shadow-md">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Focus Shoes</h1>
              <p className="text-xs text-rose-100">หนังแท้ 100% ราคาโรงงาน</p>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-rose-700 rounded-lg transition-colors"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="bg-rose-700 px-4 py-3 border-t border-rose-800">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>โทร: 02-XXX-XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>กรุงเทพมหานคร</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>จันทร์-เสาร์ 9:00-18:00</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ร้านรองเท้า Focus Shoes
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            จำหน่ายรองเท้าสตรี, ข้าราชการ, พยาบาล ราคาโรงงาน
            ทั้งปลีกและส่ง หนังแท้100% สวมใส่สบาย ไม่มีปัญหาเรื่องปวดเท้า
            มีให้เลือกหลายสไตล์ สวย คุณภาพดี ที่สำคัญราคาไม่แพง
          </p>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded-lg shadow-sm text-center">
              <Shield className="w-6 h-6 text-rose-600 mx-auto mb-1" />
              <p className="text-xs text-gray-700 font-medium">หนังแท้ 100%</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm text-center">
              <Award className="w-6 h-6 text-rose-600 mx-auto mb-1" />
              <p className="text-xs text-gray-700 font-medium">ประสบการณ์ 20ปี</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm text-center">
              <Scissors className="w-6 h-6 text-rose-600 mx-auto mb-1" />
              <p className="text-xs text-gray-700 font-medium">สั่งตัดได้</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b sticky top-[69px] z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            สินค้าทั้งหมด ({filteredProducts.length})
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product} 
              image={product.images[0]}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </main>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-rose-600 to-pink-600 text-white px-4 py-8 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-2">สั่งตัดรองเท้าในแบบของคุณ</h3>
          <p className="text-rose-100 mb-4 text-sm">
            รองเท้า Focus Shoes ผลิตและจัดจำหน่ายมากว่า 20ปี
            จึงมั่นใจได้ในคุณภาพว่าดีจริง! คู่ควรสำหรับคุณ
          </p>
          <button className="bg-white text-rose-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg">
            ติดต่อสั่งซื้อ
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 px-4 py-6 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <h4 className="text-white font-semibold mb-2">Focus Shoes</h4>
          <p className="text-sm mb-3">ร้านรองเท้าหนังแท้ คุณภาพดี ราคาโรงงาน</p>
          <div className="text-sm space-y-1">
            <p>📞 โทร: 02-XXX-XXXX</p>
            <p>⏰ จันทร์-เสาร์ 9:00-18:00 น.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-400">
            <p>© 2026 Focus Shoes. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}