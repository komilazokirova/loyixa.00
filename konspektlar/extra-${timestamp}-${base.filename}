# ⚛️ React `useEffect` Hook va Cleanup mexanizmi

React funksional komponentlarida yon ta'sirlarni (side-effects: API chaqiruvlari, obuna bo'lish, DOM manipulyatsiyasi) boshqarish uchun `useEffect` ishlatiladi.

---

## 📌 Bog'liqliklar massivi (Dependency Array) qoidalari:

1. **Massiv berilmasa**:
   ```tsx
   useEffect(() => {
     // Har bir render bo'lganda ishlaydi
   });
   ```

2. **Bo'sh massiv (`[]`)**:
   ```tsx
   useEffect(() => {
     // Faqat komponent ilk bor ekranga chizilganda (Mount) 1 marta ishlaydi
   }, []);
   ```

3. **Qiymatlar berilgan massiv (`[userId, count]`)**:
   ```tsx
   useEffect(() => {
     // userId yoki count o'zgarganda ishlaydi
   }, [userId, count]);
   ```

---

## 🧹 Cleanup (Tozalash) funksiyasi nega kerak?

Komponent DOM'dan o'chirilganda (Unmount) yoki useEffect qayta ishga tushishidan oldin xotira oqishini (memory leak) oldini olish uchun cleanup qaytariladi:

```tsx
useEffect(() => {
  const handleResize = () => console.log(window.innerWidth);
  window.addEventListener('resize', handleResize);

  // Cleanup:
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```
