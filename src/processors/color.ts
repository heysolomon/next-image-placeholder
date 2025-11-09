import { getAverageColor } from 'fast-average-color-node'
import { ImageProcessingError } from '../types/index.js'

/**
 * Extracts the dominant color from an image
 * 
 * Uses the sqrt algorithm which provides better results than simple averaging
 * while being much faster than k-means clustering.
 * 
 * @param buffer - Image buffer
 * @param algorithm - Color extraction algorithm (default: 'sqrt')
 * @returns Hex color string (e.g., "#ff0000")
 */
export async function extractDominantColor(
    buffer: Buffer,
    algorithm: 'simple' | 'sqrt' | 'dominant' = 'sqrt'
): Promise<string> {
    try {
        const color = await getAverageColor(buffer, {
            algorithm,
            mode: 'speed'
        })

        return color.hex

    } catch (error) {
        // Return neutral gray as ultimate fallback
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        console.warn('Color extraction failed, using fallback:', errorMessage)
        return '#e5e7eb'
    }
}

/**
 * Extracts RGB values for more advanced use cases
 */
export async function extractColorRGB(
    buffer: Buffer,
    algorithm: 'simple' | 'sqrt' | 'dominant' = 'sqrt'
): Promise<{ r: number; g: number; b: number; a: number }> {
    try {
        const color = await getAverageColor(buffer, {
            algorithm,
            mode: 'speed'
        })

        return {
            r: color.value[0],
            g: color.value[1],
            b: color.value[2],
            a: color.value[3]
        }

    } catch (error) {
        // Return neutral gray RGB
        return { r: 229, g: 231, b: 235, a: 255 }
    }
}
