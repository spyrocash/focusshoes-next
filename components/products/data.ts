export type Product = {
  id: string;
  name: string;
  price: string;
  tags: string[];
  category: string;
  rating: number;
  inStock: boolean;
  color: string;
  image: string;
  images: string[];
  description: string;
  details: string[];
};

export const products: Product[] = [
  {
    id: "aurora-softstep",
    name: "Aurora Softstep",
    price: "1,490",
    tags: ["หนังแท้", "นุ่มสบาย", "ทำงาน"],
    category: "รองเท้าสตรี",
    rating: 4.9,
    inStock: true,
    color: "from-[#c82627]/25 via-[#ff5f52]/20 to-transparent",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550246140-5119ae4790bf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "หน้าโค้งรับรูปเท้า พื้นรองรับแรงกระแทก เหมาะกับวันทำงานที่ยาวนาน",
    details: [
      "หนังวัวฟอกนิ่ม ระบายอากาศ",
      "พื้น insole arch support ลดปวดส้น",
      "พื้นยางกันลื่น น้ำหนักเบา",
    ],
  },
  {
    id: "civic-loafer",
    name: "Civic Loafer",
    price: "1,290",
    tags: ["ข้าราชการ", "เรียบหรู", "ไม่บีบเท้า"],
    category: "ข้าราชการ",
    rating: 4.8,
    inStock: true,
    color: "from-[#c82627]/22 via-[#f18b7e]/15 to-transparent",
    image:
      "https://images.unsplash.com/photo-1528701800489-20be9ee1f62e?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1528701800489-20be9ee1f62e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "ดีไซน์สุภาพ หนังวัวแท้ ระบายอากาศดี ใส่ประชุมได้ทั้งวัน",
    details: [
      "ทรงหัวรองเท้าไม่บีบปลายเท้า",
      "ผิวหนังเคลือบกันคราบ",
      "รองรับส้น 1 นิ้ว ใส่เดินสบาย",
    ],
  },
  {
    id: "nurse-cloud",
    name: "Nurse Cloud",
    price: "1,190",
    tags: ["พยาบาล", "กันลื่น", "ระบายอากาศ"],
    category: "พยาบาล",
    rating: 4.9,
    inStock: true,
    color: "from-[#c82627]/18 via-[#ff9fa0]/15 to-transparent",
    image:
      "https://images.unsplash.com/photo-1549298916-d3c53e1f76f5?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1549298916-d3c53e1f76f5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "พื้นยางกันลื่น ซับแรงกดปลายเท้า ลดอาการเมื่อยขณะยืนทั้งกะ",
    details: [
      "พื้นกันลื่นโรงพยาบาล",
      "ผ้าซับระบายอากาศ ลดอับชื้น",
      "น้ำหนักเบา พื้นโฟมสองชั้น",
    ],
  },
  {
    id: "signature-tailor",
    name: "Signature Tailor",
    price: "เริ่มต้น 1,990",
    tags: ["สั่งตัด", "วัดเท้า", "เลือกสี"],
    category: "สั่งตัด",
    rating: 5,
    inStock: true,
    color: "from-[#c82627]/28 via-[#ff5f52]/18 to-transparent",
    image:
      "https://images.unsplash.com/photo-1542214179-44df3f6c2717?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1542214179-44df3f6c2717?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "บริการสั่งตัดเฉพาะคุณ เลือกความสูงส้น หนัง สี และความนุ่มตามต้องการ",
    details: [
      "วัดขนาดเท้า/สรีระ",
      "เลือกส้น 1-2.5 นิ้ว",
      "เลือกสีและผิวหนังด้าน/เงา",
    ],
  },
];
