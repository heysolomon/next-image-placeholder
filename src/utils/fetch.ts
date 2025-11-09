import { readFile } from 'fs/promises'
import { ImageProcessingError } from '../types/index.js'

/**
 * Checks if a string is a URL or a file path
 */
function isUrl(input: string): boolean {
    try {
        const url = new URL(input)
        return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
        return false
    }
}

/**
 * Fetches an image from a URL or reads from local file system
 */
export async function fetchImageBuffer(
    input: string,
    options: { timeout?: number; retries?: number } = {}
): Promise<Buffer> {
    // Check if it's a local file path
    if (!isUrl(input)) {
        try {
            return await readFile(input)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            throw new ImageProcessingError(
                `Failed to read local file: ${errorMessage}`,
                'FETCH_FAILED'
            )
        }
    }

    // Handle HTTP(S) URLs
    const { timeout = 30000, retries = 3 } = options

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), timeout)

            const response = await fetch(input, {
                signal: controller.signal,
                headers: {
                    'Accept': 'image/*',
                    'User-Agent': 'next-image-placeholder/0.0.1'
                }
            })

            clearTimeout(timeoutId)

            if (!response.ok) {
                throw new ImageProcessingError(
                    `HTTP ${response.status}: ${response.statusText}`,
                    'FETCH_FAILED'
                )
            }

            const contentType = response.headers.get('content-type')
            if (!contentType?.startsWith('image/')) {
                throw new ImageProcessingError(
                    `Invalid content type: ${contentType}`,
                    'INVALID_INPUT'
                )
            }

            const arrayBuffer = await response.arrayBuffer()
            return Buffer.from(arrayBuffer)

        } catch (error) {
            if (error instanceof ImageProcessingError) {
                throw error
            }

            if (error instanceof Error && error.name === 'AbortError') {
                if (attempt === retries) {
                    throw new ImageProcessingError(
                        'Request timeout',
                        'FETCH_FAILED'
                    )
                }
            } else {
                if (attempt === retries) {
                    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
                    throw new ImageProcessingError(
                        `Failed to fetch image: ${errorMessage}`,
                        'FETCH_FAILED'
                    )
                }
            }

            // Exponential backoff
            await new Promise(resolve =>
                setTimeout(resolve, 1000 * Math.pow(2, attempt))
            )
        }
    }

    throw new ImageProcessingError('Max retries exceeded', 'FETCH_FAILED')
}

/**
 * Validates and converts input to Buffer
 */
export function toBuffer(input: string | Buffer | ArrayBuffer): Buffer {
    if (Buffer.isBuffer(input)) {
        return input
    }

    if (input instanceof ArrayBuffer) {
        return Buffer.from(input)
    }

    if (typeof input === 'string') {
        throw new ImageProcessingError(
            'String input should be handled by caller using fetchImageBuffer',
            'INVALID_INPUT'
        )
    }

    throw new ImageProcessingError(
        'Input must be a Buffer, ArrayBuffer, or URL string',
        'INVALID_INPUT'
    )
}
