// Использует Web Crypto API — совместим с Edge Runtime (middleware)
const COOKIE_NAME = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 дней

async function hmac(value: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await globalThis.crypto.subtle.sign("HMAC", key, enc.encode(value));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSessionValue(password: string): Promise<string> {
  const ts = Date.now().toString();
  const sig = await hmac(ts, password);
  return `${ts}:${sig}`;
}

export async function verifySession(cookieValue: string | undefined): Promise<boolean> {
  if (!cookieValue) return false;
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;

  const colonIdx = cookieValue.indexOf(":");
  if (colonIdx === -1) return false;
  const ts = cookieValue.slice(0, colonIdx);
  const sig = cookieValue.slice(colonIdx + 1);
  if (!ts || !sig) return false;

  const expected = await hmac(ts, secret);
  if (sig !== expected) return false;

  const age = Date.now() - parseInt(ts, 10);
  return age < MAX_AGE * 1000;
}

export { COOKIE_NAME, MAX_AGE };
