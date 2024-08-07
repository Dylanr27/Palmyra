import { generateSecretKey } from './generateSecret.js';

const secretKey = generateSecretKey();
console.log('Generated SECRET_KEY:', secretKey);
console.log('Set this key as SESSION_SECRET_KEY in your environment variables.');