/**
 * Fetch with Retry & Exponential Backoff
 * Tarmoq uzilishlari yoki server vaqtincha javob bermagan holatlarda avtomatik qayta so'rov yuborish
 */

interface RetryOptions {
  retries?: number;
  delayMs?: number;
  backoffFactor?: number;
}

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retryOptions: RetryOptions = {}
): Promise<Response> {
  const { retries = 3, delayMs = 1000, backoffFactor = 2 } = retryOptions;

  let attempt = 0;
  let currentDelay = delayMs;

  while (attempt < retries) {
    try {
      const response = await fetch(url, options);
      if (response.ok || response.status < 500) {
        return response; // 2xx, 3xx yoki 4xx da qayta urinmaydi
      }
      throw new Error(`Server xatosi: ${response.status}`);
    } catch (err) {
      attempt++;
      if (attempt >= retries) {
        throw err;
      }
      console.warn(`So'rov muvaffaqiyatsiz bo'ldi. ${currentDelay}ms dan so'ng qayta uriniladi (urinish: ${attempt}/${retries})`);
      await new Promise(resolve => setTimeout(resolve, currentDelay));
      currentDelay *= backoffFactor;
    }
  }

  throw new Error('Maksimal urinishlar soni tugadi');
}
