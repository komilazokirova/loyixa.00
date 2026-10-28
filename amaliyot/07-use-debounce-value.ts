import { useState, useEffect } from 'react';

/**
 * useDebounceValue Hook
 * Qidiruv maydoni (Search Input)da foydalanuvchi yozishni tugatguncha kutish uchun ishlatiladi
 */
export function useDebounceValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
