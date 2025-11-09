import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import {
    getPlaceholder,
    getBlurDataURL,
    getColor,
    getColorRGB
} from '../src/index.js'

describe('Image Placeholder Generation', () => {
    const testImagePath = join(__dirname, 'fixtures', 'test.jpg')
    const testImageBuffer = readFileSync(testImagePath)

    describe('getPlaceholder', () => {
        it('generates both blur and color from buffer', async () => {
            const result = await getPlaceholder(testImageBuffer)

            expect(result.base64).toMatch(/^data:image\/webp;base64,/)
            expect(result.color).toMatch(/^#[0-9a-f]{6}$/i)
            expect(result.metadata).toBeDefined()
            expect(result.metadata?.width).toBeGreaterThan(0)
        })

        it('generates with custom options', async () => {
            const result = await getPlaceholder(testImageBuffer, {
                size: 8,
                quality: 50,
                colorAlgorithm: 'simple'
            })

            expect(result.base64).toBeDefined()
            expect(result.color).toBeDefined()
        })

        it('handles ArrayBuffer input', async () => {
            const arrayBuffer = testImageBuffer.buffer.slice(
                testImageBuffer.byteOffset,
                testImageBuffer.byteOffset + testImageBuffer.byteLength
            )

            const result = await getPlaceholder(arrayBuffer)
            expect(result.base64).toBeDefined()
        })
    })

    describe('getBlurDataURL', () => {
        it('generates blur placeholder only', async () => {
            const base64 = await getBlurDataURL(testImageBuffer)

            expect(base64).toMatch(/^data:image\/webp;base64,/)
            expect(base64.length).toBeLessThan(500) // Should be tiny
        })

        it('respects size parameter', async () => {
            const small = await getBlurDataURL(testImageBuffer, { size: 8 })
            const large = await getBlurDataURL(testImageBuffer, { size: 32 })

            // Larger size should produce longer string
            expect(large.length).toBeGreaterThan(small.length)
        })
    })

    describe('getColor', () => {
        it('extracts hex color', async () => {
            const color = await getColor(testImageBuffer)

            expect(color).toMatch(/^#[0-9a-f]{6}$/i)
        })

        it('handles different algorithms', async () => {
            const simple = await getColor(testImageBuffer, { colorAlgorithm: 'simple' })
            const sqrt = await getColor(testImageBuffer, { colorAlgorithm: 'sqrt' })

            expect(simple).toMatch(/^#[0-9a-f]{6}$/i)
            expect(sqrt).toMatch(/^#[0-9a-f]{6}$/i)
            // Different algorithms may produce different colors
        })
    })

    describe('getColorRGB', () => {
        it('extracts RGB values', async () => {
            const rgb = await getColorRGB(testImageBuffer)

            expect(rgb.r).toBeGreaterThanOrEqual(0)
            expect(rgb.r).toBeLessThanOrEqual(255)
            expect(rgb.g).toBeGreaterThanOrEqual(0)
            expect(rgb.g).toBeLessThanOrEqual(255)
            expect(rgb.b).toBeGreaterThanOrEqual(0)
            expect(rgb.b).toBeLessThanOrEqual(255)
            expect(rgb.a).toBeGreaterThanOrEqual(0)
            expect(rgb.a).toBeLessThanOrEqual(255)
        })
    })

    describe('Error Handling', () => {
        it('handles invalid input gracefully', async () => {
            const invalidBuffer = Buffer.from('not an image')

            const result = await getPlaceholder(invalidBuffer)
            // Should return fallback color
            expect(result.color).toBe('#e5e7eb')
        })
    })
})
