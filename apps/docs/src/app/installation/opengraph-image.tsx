import { generateOgImage, size, contentType } from '@/lib/og';

export const runtime = 'nodejs';
export { size, contentType };

export const alt = 'Installation Guide';

export default async function Image() {
    return generateOgImage('Installation', 'Getting Started');
}
