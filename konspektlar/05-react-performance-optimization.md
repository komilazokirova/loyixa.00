# ⚡ React Performance Optimizatsiya: Qachon ishlatish kerak?

Ko'pincha yangi dasturchilar har bir funksiya va o'zgaruvchini `useCallback` yoki `useMemo` bilan o'rab chiqishadi. Bu aslida teskari natija — dastur ishlashini sekinlashtirishi mumkin.

---

## 🔍 Qachon ishlatish kerak?

1. **`React.memo`**:
   * Komponent faqat Props o'zgargandagina qayta render bo'lishi kerak bo'lsa.

2. **`useCallback`**:
   * Komponent ichidagi funksiyani `React.memo` bilan o'ralgan bolalar (child) komponentlarga prop sifatida uzatayotganda.
   * Aks holda har renderda yangi funksiya havolasi (reference) yaratilib, child baribir qayta chiziladi.

3. **`useMemo`**:
   * Qimmat (og'ir) hisob-kitob natijalarini keshlab turish uchun:
   ```tsx
   const filteredList = useMemo(() => {
     return heavyCalculation(items);
   }, [items]);
   ```
