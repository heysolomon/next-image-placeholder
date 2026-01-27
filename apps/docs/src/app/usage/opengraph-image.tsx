import { generateOgImage, size, contentType } from '@/lib/og';

export const runtime = 'nodejs';
export { size, contentType };

export const alt = 'Usage Guide';

export default async function Image() {
    return generateOgImage('Basic Usage', 'Implementation Guide');
}
