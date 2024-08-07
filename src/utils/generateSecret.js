import { randomBytes } from 'crypto';

export function generateSecretKey(length = 64) {
  return randomBytes(length).toString('hex');
}