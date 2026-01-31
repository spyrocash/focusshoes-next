import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="bg-slate-50 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">ติดต่อเรา</h1>
        <p className="text-slate-500">ร้าน Focus Shoes ยินดีให้บริการ</p>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          {/* INFO */}
          <div>
            <h2 className="text-2xl font-bold mb-8">ช่องทางการติดต่อ</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">ที่อยู่ร้าน / โรงงาน</h3>
                  <p className="text-slate-600 leading-relaxed">
                    123/45 ซอยสุขุมวิท 71 แขวงคลองตันเหนือ <br/>
                    เขตวัฒนา กรุงเทพมหานคร 10110
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">เบอร์โทรศัพท์</h3>
                  <p className="text-slate-600">081-234-5678 (ฝ่ายขาย)</p>
                  <p className="text-slate-600">02-123-4567 (สำนักงาน)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.17 6 13.92 6c1.32 0 2.7.24 2.7.24v2.97h-1.52c-1.47 0-1.93.91-1.93 1.84V12h3.32l-.53 3h-2.79v6.8C18.56 20.87 22 16.84 22 12z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Social Media</h3>
                  <p className="text-slate-600">Facebook: Focus Shoes Official</p>
                  <p className="text-slate-600">Line: @focusshoes</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">เวลาทำการ</h3>
                  <p className="text-slate-600">จันทร์ - เสาร์: 8.30 - 17.30 น.</p>
                  <p className="text-slate-600">หยุดวันอาทิตย์</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
               <Button className="w-full h-12 text-lg rounded-full" onClick={() => window.open('https://line.me/ti/p/@focusshoes')}>
                 แอดไลน์สอบถามเลย
               </Button>
            </div>
          </div>

          {/* MAP */}
          <div className="h-[400px] md:h-full bg-slate-100 rounded-3xl overflow-hidden shadow-inner relative">
            {/* Using a static map image or iframe placeholder */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.834035659795!2d100.5898!3d13.7298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQzJzQ3LjMiTiAxMDDCsDM1JzIzLjMiRQ!5e0!3m2!1sen!2sth!4v1620000000000!5m2!1sen!2sth" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
