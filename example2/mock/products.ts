
// Mock Data for Focus Shoes
// Used for testing filter/search logic and initial seeding

export const PRODUCTS = [
  {
    slug: "nurse-shoe-classic-white",
    nameTH: "รองเท้าพยาบาล รุ่นคลาสสิค (สีขาว)",
    category: "พยาบาล",
    tags: ["ขายดี", "แนะนำ"],
    retailPrice: 890,
    wholesalePrice: 650,
    images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80", "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80"],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    widthOptions: ["ปกติ", "หน้ากว้าง"],
    colors: ["ขาว"],
    material: "หนังแท้ 100% เกรดพรีเมียม",
    comfortBadges: ["พื้นนุ่มพิเศษ", "ระบายอากาศดี"],
    stockStatus: "in_stock",
    description: "รองเท้าพยาบาลหนังแท้ ออกแบบมาเพื่อการยืนเดินตลอดวัน พื้นรองเท้านุ่มพิเศษช่วยลดแรงกระแทก ดีไซน์เรียบร้อยถูกระเบียบ"
  },
  {
    slug: "civil-servant-black-heels",
    nameTH: "รองเท้าคัทชูข้าราชการ ส้นสูง 2 นิ้ว",
    category: "ข้าราชการ",
    tags: ["สุภาพ", "เป็นทางการ"],
    retailPrice: 990,
    wholesalePrice: 750,
    images: ["https://images.unsplash.com/photo-1534653299134-96a171b61581?w=800&q=80"],
    sizes: ["35", "36", "37", "38", "39", "40"],
    widthOptions: ["ปกติ"],
    colors: ["ดำ"],
    material: "หนังวัวแท้",
    comfortBadges: ["ซับในนุ่ม", "ส้นมั่นคง"],
    stockStatus: "in_stock",
    description: "รองเท้าคัทชูสีดำสำหรับข้าราชการ ทรงสวย สุภาพ ส้นสูง 2 นิ้ว เดินง่าย ไม่เมื่อย เหมาะสำหรับใส่ออกงานหรือปฏิบัติงาน"
  },
  {
    slug: "comfort-sandal-beige",
    nameTH: "รองเท้าลำลองสุขภาพ (สีเบจ)",
    category: "สตรี",
    tags: ["ใส่สบาย", "ลำลอง"],
    retailPrice: 790,
    wholesalePrice: 550,
    images: ["https://images.unsplash.com/photo-1621996659490-6213b19b674b?w=800&q=80"],
    sizes: ["36", "37", "38", "39", "40"],
    widthOptions: ["ปกติ", "หน้ากว้างพิเศษ"],
    colors: ["เบจ", "ครีม"],
    material: "หนังนิ่ม",
    comfortBadges: ["พื้นเพื่อสุขภาพ", "น้ำหนักเบา"],
    stockStatus: "low_stock",
    description: "รองเท้าลำลองเพื่อสุขภาพ ดีไซน์สวยทันสมัย ใส่เที่ยวหรือใส่ทำงานก็ได้ พื้นรองรับสรีระเท้า ลดอาการปวดส้นเท้า"
  },
  {
    slug: "custom-oxford-men",
    nameTH: "รองเท้าสั่งตัด ทรง Oxford",
    category: "สั่งตัด",
    tags: ["พรีเมียม", "งานฝีมือ"],
    retailPrice: 2500,
    wholesalePrice: 2000,
    images: ["https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80"],
    sizes: ["สั่งตัดตามไซส์"],
    widthOptions: ["วัดเท้าจริง"],
    colors: ["ดำ", "น้ำตาลเข้ม", "แทน"],
    material: "หนัง Full Grain",
    comfortBadges: ["Custom Fit", "ทนทาน"],
    stockStatus: "pre_order",
    description: "บริการสั่งตัดรองเท้าหนังแท้ทรง Oxford เลือกหนังและสีได้ตามต้องการ ตัดเย็บโดยช่างผู้ชำนาญการกว่า 20 ปี"
  }
];

// Generate more products
const categories = ["พยาบาล", "ข้าราชการ", "สตรี"];
const adjectives = ["รุ่นพิเศษ", "รุ่นเบาสบาย", "รุ่นกันลื่น", "ทรงทันสมัย"];
  
let count = 0;
for (const cat of categories) {
  for (const adj of adjectives) {
    if (count > 20) break;
    PRODUCTS.push({
      slug: `variant-${cat}-${count}`,
      nameTH: `รองเท้า${cat} ${adj} ${count+1}`,
      category: cat,
      tags: ["ใหม่"],
      retailPrice: 800 + (count * 10),
      wholesalePrice: 600 + (count * 10),
      images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80"],
      sizes: ["36", "37", "38", "39", "40"],
      widthOptions: ["ปกติ"],
      colors: ["ดำ", "ขาว", "ครีม"],
      material: "หนังแท้",
      comfortBadges: ["นุ่ม"],
      stockStatus: "in_stock",
      description: `รองเท้า${cat} คุณภาพดี ${adj} เหมาะกับการใช้งานทุกวัน`
    });
    count++;
  }
}
