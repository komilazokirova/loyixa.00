/**
 * Mukammal Deep Clone funksiyasi
 * Obyekt va massivlarni xotirada to'liq yangi nusxasini yaratadi
 */
export function deepClone<T>(obj: T, hash = new WeakMap()): T {
  // Primitiv qiymatlar va funksiyalar to'g'ridan-to'g'ri qaytariladi
  if (Object(obj) !== obj || typeof obj === 'function') {
    return obj;
  }

  // Siklik bog'lanishlarni (circular references) tekshirish
  if (hash.has(obj as object)) {
    return hash.get(obj as object);
  }

  // Date va RegExp obyektlarini alohida ko'chirish
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags) as unknown as T;

  // Massiv yoki Obyekt uchun yangi nusxa
  const result = (Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj))) as T;
  hash.set(obj as object, result);

  for (const key of Object.keys(obj)) {
    (result as any)[key] = deepClone((obj as any)[key], hash);
  }

  return result;
}
