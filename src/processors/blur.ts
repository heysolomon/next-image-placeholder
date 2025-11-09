import sharp from 'sharp'
import { ImageProcessingError } from '../types/index.js'

/**
 * Generates a low-quality image placeholder (LQIP) for blur effects
 * 
 * Creates a tiny 16x16 WebP image, base64-encoded to ~150 bytes.
 * This is the same technique used by Medium, Unsplash, and Next.js.
 * 
 * @param buffer - Image buffer
 * @param size - Thumbnail size in pixels (default: 16)
 * @param quality - WebP quality 0-100 (default: 70)
 * @returns Base64-encoded data URL suitable for Next.js Image blurDataURL
 */
export async function generateBlurPlaceholder(
    buffer: Buffer,
    size = 16,
    quality = 70
): Promise<string> {
    try {
        // Resize to tiny dimensions and compress heavily
        const placeholder = await sharp(buffer)
            .resize(size, size, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .webp({
                quality,
                effort: 0 // Fastest encoding
            })
            .toBuffer()

        // Convert to base64 data URL
        const base64 = placeholder.toString('base64')
        return `data:image/webp;base64,${base64}`

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        throw new ImageProcessingError(
            `Failed to generate blur placeholder: ${errorMessage}`,
            'PROCESSING_FAILED'
        )
    }
}

/**
 * Gets image metadata using Sharp
 */
export async function getImageMetadata(buffer: Buffer) {
    try {
        const metadata = await sharp(buffer).metadata()
        return {
            width: metadata.width || 0,
            height: metadata.height || 0,
            format: metadata.format || 'unknown'
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        throw new ImageProcessingError(
            `Failed to read image metadata: ${errorMessage}`,
            'PROCESSING_FAILED'
        )
    }
}
