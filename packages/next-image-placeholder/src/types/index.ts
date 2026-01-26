/**
 * Options for placeholder generation
 */
export interface PlaceholderOptions {
    /**
     * Size of the thumbnail for blur generation (in pixels)
     * @default 16
     */
    size?: number

    /**
     * Quality of the WebP compression (0-100)
     * @default 70
     */
    quality?: number

    /**
     * Color extraction algorithm
     * @default 'sqrt'
     */
    colorAlgorithm?: 'simple' | 'sqrt' | 'dominant'
}

/**
 * Result from placeholder generation
 */
export interface PlaceholderResult {
    /**
     * Base64-encoded blur placeholder data URL
     * Can be passed directly to Next.js Image blurDataURL prop
     */
    base64?: string

    /**
     * Dominant color as hex string (e.g., "#ff0000")
     * Use as fallback or background color
     */
    color: string

    /**
     * Image metadata
     */
    metadata?: {
        width: number
        height: number
        format: string
    }
}

/**
 * Options for image fetching
 */
export interface FetchOptions {
    /**
     * Request timeout in milliseconds
     * @default 30000
     */
    timeout?: number

    /**
     * Number of retry attempts
     * @default 3
     */
    retries?: number
}

/**
 * Custom error for image processing failures
 */
export class ImageProcessingError extends Error {
    constructor(
        message: string,
        public readonly code: 'FETCH_FAILED' | 'PROCESSING_FAILED' | 'INVALID_INPUT'
    ) {
        super(message)
        this.name = 'ImageProcessingError'
    }
}
