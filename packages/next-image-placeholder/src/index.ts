import { generateBlurPlaceholder, getImageMetadata } from './processors/blur.js'
import { extractDominantColor, extractColorRGB } from './processors/color.js'
import { fetchImageBuffer, toBuffer } from './utils/fetch.js'
import type {
    PlaceholderOptions,
    PlaceholderResult,
    FetchOptions,
    ImageProcessingError
} from './types/index.js'

// Re-export types
export type {
    PlaceholderOptions,
    PlaceholderResult,
    FetchOptions,
    ImageProcessingError
}

/**
 * Main function: Generates both blur placeholder and dominant color
 * 
 * This is the primary function you'll use in Next.js Server Components.
 * It handles fetching (if URL provided), generates the blur placeholder,
 * and extracts the dominant color in parallel for optimal performance.
 * 
 * @param input - Image URL string or Buffer
 * @param options - Configuration options
 * @returns Object with base64 blur data and dominant color
 * 
 * @example
 * ```typescript
 * // In a Next.js Server Component
 * import { getPlaceholder } from '@yourname/next-image-placeholder'
 * 
 * const { base64, color } = await getPlaceholder('/hero.jpg')
 * 
 * <Image
 *   src="/hero.jpg"
 *   width={1200}
 *   height={600}
 *   placeholder="blur"
 *   blurDataURL={base64}
 *   style={{ backgroundColor: color }}
 *   alt="Hero"
 * />
 * ```
 */
export async function getPlaceholder(
    input: string | Buffer | ArrayBuffer,
    options: PlaceholderOptions & FetchOptions = {}
): Promise<PlaceholderResult> {
    const {
        size = 16,
        quality = 70,
        colorAlgorithm = 'sqrt',
        timeout = 30000,
        retries = 3
    } = options

    try {
        // Handle different input types
        let buffer: Buffer

        if (typeof input === 'string') {
            // Fetch from URL
            buffer = await fetchImageBuffer(input, { timeout, retries })
        } else {
            // Convert to Buffer
            buffer = toBuffer(input)
        }

        // Generate blur and extract color in parallel
        const [base64, color, metadata] = await Promise.all([
            generateBlurPlaceholder(buffer, size, quality),
            extractDominantColor(buffer, colorAlgorithm),
            getImageMetadata(buffer)
        ])

        return {
            base64,
            color,
            metadata
        }

    } catch (error) {
        // If everything fails, return just the color fallback
        console.error('Placeholder generation failed:', error)
        return {
            color: '#e5e7eb' // Neutral gray fallback
        }
    }
}

/**
 * Generates only the blur placeholder (no color extraction)
 * Use this for slightly better performance if you don't need color
 */
export async function getBlurDataURL(
    input: string | Buffer | ArrayBuffer,
    options: Omit<PlaceholderOptions, 'colorAlgorithm'> & FetchOptions = {}
): Promise<string> {
    const {
        size = 16,
        quality = 70,
        timeout = 30000,
        retries = 3
    } = options

    let buffer: Buffer

    if (typeof input === 'string') {
        buffer = await fetchImageBuffer(input, { timeout, retries })
    } else {
        buffer = toBuffer(input)
    }

    return generateBlurPlaceholder(buffer, size, quality)
}

/**
 * Extracts only the dominant color (no blur generation)
 * Use this for color-only placeholders with minimal overhead
 */
export async function getColor(
    input: string | Buffer | ArrayBuffer,
    options: Pick<PlaceholderOptions, 'colorAlgorithm'> & FetchOptions = {}
): Promise<string> {
    const {
        colorAlgorithm = 'sqrt',
        timeout = 30000,
        retries = 3
    } = options

    let buffer: Buffer

    if (typeof input === 'string') {
        buffer = await fetchImageBuffer(input, { timeout, retries })
    } else {
        buffer = toBuffer(input)
    }

    return extractDominantColor(buffer, colorAlgorithm)
}

/**
 * Gets RGB values instead of hex color
 */
export async function getColorRGB(
    input: string | Buffer | ArrayBuffer,
    options: Pick<PlaceholderOptions, 'colorAlgorithm'> & FetchOptions = {}
): Promise<{ r: number; g: number; b: number; a: number }> {
    const {
        colorAlgorithm = 'sqrt',
        timeout = 30000,
        retries = 3
    } = options

    let buffer: Buffer

    if (typeof input === 'string') {
        buffer = await fetchImageBuffer(input, { timeout, retries })
    } else {
        buffer = toBuffer(input)
    }

    return extractColorRGB(buffer, colorAlgorithm)
}
