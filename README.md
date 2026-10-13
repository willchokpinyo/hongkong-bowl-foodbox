# Hongkong Bowl — เว็บ Catering & Food Box

เปิดดู: ดับเบิลคลิก `index.html` ได้เลย (ไม่ต้องติดตั้งอะไร)

## แก้ข้อมูล
ทุกอย่างอยู่ใน `config.js` ไฟล์เดียว
- `lineId`, `phones` — ช่องทางติดต่อ
- `lineMessages` — ข้อความที่กรอกไว้ให้ลูกค้าตอนกดปุ่ม LINE
- `catering.items` — รูปผลงาน catering
- `foodbox.items` — เมนูข้าวกล่อง (`tier` = 100 / 120 / 135 / 150 / premium)

## ใส่รูป
1. วางรูปใน `images/catering/` หรือ `images/foodbox/`
2. ใส่ path ใน `src` เช่น `{ tier: "100", src: "images/foodbox/moodaeng.jpg", title: "ข้าวหมูแดง" }`

## ลิงก์ตรงแต่ละหน้า (เอาไปใส่ใน LINE / IG bio ได้)
- `index.html#/catering`
- `index.html#/foodbox/120`
