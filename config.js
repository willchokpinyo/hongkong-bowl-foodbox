// ============================================================
//  ไฟล์ตั้งค่าเว็บ — แก้ข้อมูลร้าน / รูป / เมนู ที่ไฟล์นี้ไฟล์เดียว
//  รูป: วางไฟล์ใน images/catering หรือ images/foodbox แล้วใส่ path ใน src
//  ถ้า src ว่าง ("") เว็บจะแสดงกล่อง placeholder แทน
// ============================================================
window.SITE = {
  shopName: "Hongkong Bowl",

  // ---- ช่องทางติดต่อ ----
  lineId: "@hongkongbowl",                            // LINE OA ID (ต้องมี @)
  phones: ["084-235-4535", "098-745-8905"],

  // ข้อความที่กรอกไว้ให้ลูกค้าตอนกดปุ่ม LINE ({tier} = ราคา, {title} = ชื่อเมนู/งาน)
  lineMessages: {
    general:     "สวัสดี สนใจสั่งอาหารกับ Hongkong Bowl",
    catering:    "สวัสดี สนใจสอบถามงาน Catering\nประเภทงาน: \nจำนวนคน: \nวันที่จัดงาน: \nสถานที่: ",
    cateringPin: "สวัสดี สนใจงาน Catering แบบ \"{title}\"\nจำนวนคน: \nวันที่จัดงาน: \nสถานที่: ",
    foodbox:     "สวัสดี สนใจสั่งข้าวกล่อง {tier}\nจำนวน: \nวันที่รับ: ",
    foodboxPin:  "สวัสดี สนใจสั่งข้าวกล่อง {tier} เมนู \"{title}\"\nจำนวน: \nวันที่รับ: ",
  },

  // ---- ข้อมูลร้าน (ที่มา: Brand Strategy + CI Manual 2026-06) ----
  // ช่องไหนเว้นว่าง ("") เว็บจะซ่อนไว้เอง
  shop: {
    tagline: "ฮ่องกงแท้ ในชามที่ใช่ — อร่อยได้ทุกวัน สนุกได้ทั้งโต๊ะ",
    about: "ร้านบะหมี่ฮ่องกงที่ทำเองทุกอย่าง ตั้งแต่ซอสยันเนื้อย่าง หมูแดง หมูกรอบ เป็ดย่าง พร้อมซอสเซี่ยงไฮ้สูตรเฉพาะของร้าน — วันนี้ส่งความอร่อยแบบเดียวกันไปถึงงานเลี้ยงและข้าวกล่องของคุณ",
    hours: "เปิดทุกวัน 11.00 – 20.30 น.",
    rating: "Google 4.3 ★",
    // เว็บนี้ (Catering / Food Box) ให้บริการเฉพาะสาขาขอนแก่น
    branches: [
      { name: "สาขาขอนแก่น", detail: "ติด ม.ขอนแก่น · ตลาด 62 Block", map: "" },   // TODO: ลิงก์ Google Maps
    ],
    socials: [
      { name: "Facebook",  url: "" },   // TODO
      { name: "Instagram", url: "" },   // TODO
      { name: "TikTok",    url: "" },   // TODO
      { name: "Grab",      url: "" },   // TODO
      { name: "LINE MAN",  url: "" },   // TODO
    ],
  },

  // ---- หน้าแรก: 2 กล่องใหญ่ ----
  home: {
    catering: { title: "CATERING", subtitle: "บูธอาหาร & บุฟเฟ่ต์สำหรับงานอีเวนต์", cover: "" },
    foodbox:  { title: "FOOD BOX", subtitle: "ข้าวกล่อง 100 – Premium", cover: "images/foodbox/100-06.jpg" },
  },

  // ---- CATERING ----
  catering: {
    headline: "ทำตามงบประมาณลูกค้า",
    lines: [
      "🍜 บูธบะหมี่ เริ่มต้น 10,000 บาท",
      "🍱 งานบุฟเฟ่ต์ ติดต่อสอบถามทางไลน์",
    ],
    items: [
      { src: "", title: "บูธบะหมี่ งานบริษัท", note: "150 ที่" }, // ตัวอย่าง — รอรูปจริง
      { src: "", title: "บุฟเฟ่ต์งานสัมมนา", note: "80 ที่" }, // ตัวอย่าง — รอรูปจริง
      { src: "", title: "บูธบะหมี่ งานแต่ง", note: "" }, // ตัวอย่าง — รอรูปจริง
      { src: "", title: "Coffee break", note: "" }, // ตัวอย่าง — รอรูปจริง
      { src: "", title: "บูธออกงาน Event", note: "" }, // ตัวอย่าง — รอรูปจริง
      { src: "", title: "บุฟเฟ่ต์งานเลี้ยงบริษัท", note: "200 ที่" }, // ตัวอย่าง — รอรูปจริง
      { src: "", title: "บูธบะหมี่ งานโรงเรียน", note: "" }, // ตัวอย่าง — รอรูปจริง
      { src: "", title: "Setup โต๊ะบุฟเฟ่ต์", note: "" }, // ตัวอย่าง — รอรูปจริง
    ],
  },

  // ---- FOOD BOX ----
  foodbox: {
    tiers: [
      { id: "100",     label: "100 บาท" },
      { id: "120",     label: "120 บาท" },
      { id: "135",     label: "135 บาท" },
      { id: "150",     label: "150 บาท" },
      { id: "premium", label: "Premium" },
    ],
    // tier ต้องตรงกับ id ด้านบน · video = คลิป (src = รูปปกคลิป) · ratio = สัดส่วนรูป กว้าง/สูง
    // title ว่างได้ — ใส่ชื่อเมนูเมื่อรู้แล้ว
    items: [
      { tier: "100", src: "images/foodbox/100-06.jpg", ratio: "3/4", title: "" },
      { tier: "100", video: "images/foodbox/100-v01.mp4", src: "images/foodbox/100-v01.jpg", ratio: "9/16", title: "" },
      { tier: "100", src: "images/foodbox/100-01.jpg", ratio: "3/4", title: "" },
      { tier: "100", src: "images/foodbox/100-02.jpg", ratio: "3/4", title: "" },
      { tier: "100", src: "images/foodbox/100-03.jpg", ratio: "3/4", title: "" },
      { tier: "100", src: "images/foodbox/100-04.jpg", ratio: "3/4", title: "" },
      { tier: "100", video: "images/foodbox/100-v02.mp4", src: "images/foodbox/100-v02.jpg", ratio: "9/16", title: "" },
      { tier: "100", src: "images/foodbox/100-05.jpg", ratio: "3/4", title: "" },
      { tier: "100", src: "images/foodbox/100-07.jpg", ratio: "1/1", title: "" },
      { tier: "100", src: "images/foodbox/100-08.jpg", ratio: "1/1", title: "" },
      { tier: "100", src: "images/foodbox/100-09.jpg", ratio: "3/4", title: "" },
      { tier: "100", src: "images/foodbox/100-10.jpg", ratio: "3/4", title: "" },
      { tier: "100", src: "images/foodbox/100-11.jpg", ratio: "3/4", title: "" },
      { tier: "100", src: "images/foodbox/100-12.jpg", ratio: "3/4", title: "" },
      { tier: "120", src: "images/foodbox/120-01.jpg", ratio: "3/4", title: "" },
      { tier: "120", video: "images/foodbox/120-v01.mp4", src: "images/foodbox/120-v01.jpg", ratio: "9/16", title: "" },
      { tier: "120", src: "images/foodbox/120-02.jpg", ratio: "3/4", title: "" },
      { tier: "120", src: "images/foodbox/120-03.jpg", ratio: "3/4", title: "" },
      { tier: "120", src: "images/foodbox/120-04.jpg", ratio: "3/4", title: "" },
      { tier: "120", src: "images/foodbox/120-05.jpg", ratio: "3/4", title: "" },
      { tier: "120", video: "images/foodbox/120-v02.mp4", src: "images/foodbox/120-v02.jpg", ratio: "9/16", title: "" },
    ],
  },
};
