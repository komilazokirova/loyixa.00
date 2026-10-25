# 📘 TypeScript: `interface` vs `type`

TypeScript'da ma'lumotlar tuzilmasini aniqlash uchun `interface` yoki `type` ishlatiladi. Ular ko'p jihatdan bir-biriga o'xshash, lekin muhim farqlari bor.

---

## ⚖️ Asosiy farqlar:

1. **Declaration Merging (Bir nomli interfeyslarni birlashtirish)**:
   * `interface` bir xil nom bilan bir necha bor e'lon qilinsa, maydonlari avtomatik birlashadi.
   * `type`da esa nomni takrorlab bo'lmaydi (xatolik beradi).

2. **Union va Primitivlar**:
   * `type` orqali Union (`type Status = 'pending' | 'success'`) va primitivlarni nomlash mumkin.
   * `interface` esa faqat Obyekt yoki Funksiya strukturalarini tasvirlaydi.

---

## 💡 Qoida:
* Obyekt shakllari va kutubxona modellariga ko'pincha **`interface`**,
* Union, Tuple va murakkab tiplar kombinatsiyasiga esa **`type`** tavsiya etiladi.
