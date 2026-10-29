# 💾 Brauzer Xotirasi: localStorage vs sessionStorage vs Cookies

Foydalanuvchi ma'lumotlarini brauzerda saqlashning 3 ta asosiy usuli bor:

---

| Xususiyat | localStorage | sessionStorage | Cookies |
| :--- | :--- | :--- | :--- |
| **Yashash muddati** | Qo'lda o'chirilmaguncha saqlanadi | Tab (oyna) yopilguncha | Belgilangan Expire vaqti tugaguncha |
| **Hajmi** | ~5-10 MB | ~5 MB | ~4 KB |
| **Serverga yuboriladimi?** | Yo'q | Yo'q | Ha (Har bir HTTP so'rov bilan yuboriladi) |
| **Xavfsizlik** | XSS hujumiga moyil | XSS hujumiga moyil | `HttpOnly` bayrog'i bilan XSS dan himoyalash mumkin |
