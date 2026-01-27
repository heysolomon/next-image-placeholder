import { generateOgImage, size, contentType } from '@/lib/og';

export const runtime = 'nodejs';
export { size, contentType };

export const alt = 'next-image-placeholder documentation';

export default async function Image() {
    return generateOgImage('Documentation', 'next-image-placeholder');
}
