import { generateOgImage, size, contentType } from '@/lib/og';

export const runtime = 'nodejs';
export { size, contentType };

export const alt = 'API Reference';

export default async function Image() {
    return generateOgImage('usePlaceholder', 'React Hook');
}
