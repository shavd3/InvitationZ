import { createHash } from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_session';

function sessionToken(): string {
  return createHash('sha256')
    .update(`admin:${process.env.ADMIN_PASSWORD || ''}`)
    .digest('hex');
}

export function verifyAdminPassword(password: string): boolean {
  return password === process.env.ADMIN_PASSWORD;
}

export function getSessionCookieValue(): string {
  return sessionToken();
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === sessionToken();
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
