import crypto from "crypto";

const COOKIE_NAME = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function sign(value: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export function createSessionCookie(password: string): string {
  const ts = Date.now().toString();
  const sig = sign(ts, password);
  const value = `${ts}:${sig}`;
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}`;
}

export function verifySession(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;

  const [ts, sig] = cookieValue.split(":");
  if (!ts || !sig) return false;

  const expected = sign(ts, secret);
  try {
    if (!crypto.timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))) return false;
  } catch {
    return false;
  }

  const age = Date.now() - parseInt(ts, 10);
  return age < MAX_AGE * 1000;
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export { COOKIE_NAME };
