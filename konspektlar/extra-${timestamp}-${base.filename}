# 🔒 JavaScript Closures (Yopiq muhit)

**Closure** — bu ichki funksiyaning o'zidan tashqaridagi (ota) leksik muhitdagi (Lexical Environment) o'zgaruvchilarni, hatto ota funksiya ishlab bo'lib yakunlangan bo'lsa ham, **eslab qolish** qobiliyatidir.

---

## 📝 Oddiy amaliy misol:

```javascript
function createCounter() {
  let count = 0; // Private o'zgaruvchi

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
// count o'zgaruvchisini to'g'ridan-to'g'ri tashqaridan o'zgartirib bo'lmaydi!
```

---

## 🎯 Asosiy foydasi:
1. **Data Encapsulation (Ma'lumotlarni yashirish)**: Private o'zgaruvchilar yaratish.
2. **Funksiyalarni kuryerlash (Currying)**.
3. **Callback va hodisalar boshqaruvida holatni saqlash**.
