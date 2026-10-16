# 🔄 JavaScript Event Loop: Microtasks va Macrotasks

JavaScript — **bir oqimli (single-threaded)** dasturlash tili bo'lib, bir vaqtning o'zida faqat bitta operatsiyani bajara oladi. Biroq u qanday qilib asinxron (non-blocking) ishlaydi? Bu **Event Loop** mexanizmi orqali amalga oshiriladi.

---

## 🧱 Asosiy komponentlar:

1. **Call Stack (Chaqiruvlar steki)**:
   * Hozirda bajarilayotgan funksiyalar steki (LIFO — Last In, First Out).
2. **Web APIs (Brauzer muhiti)**:
   * `setTimeout`, `fetch`, DOM hodisalari kabi brauzer taqdim etadigan asinxron imkoniyatlar.
3. **Microtask Queue (Mikrotopshiriqlar navbati)**:
   * `Promise.then/catch/finally`, `queueMicrotask`, `async/await` natijalari.
4. **Macrotask / Task Queue (Makrotopshiriqlar navbati)**:
   * `setTimeout`, `setInterval`, `setImmediate`, I/O amallari.

---

## ⚡ Ishlash ketma-ketligi (Prioritet qoidasi):

1. Call Stack'dagi barcha sinxron kodlar to'liq bajariladi.
2. Call Stack bo'shashi bilan, Event Loop **Microtask Queue**dagi barcha vazifalarni navbati bilan chaqiradi va bajaradi.
3. Microtasklar tugagach, **bitta** Macrotask olinadi va bajariladi.
4. Tsikl qaytadan takrorlanadi.

> 💡 **Qoida**: Microtasklar har doim Macrotasklardan oldin bajariladi!
