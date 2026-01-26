// Example: Basic usage in a Next.js Server Component
import { getPlaceholder, getColor, getBlurDataURL } from '../src/index.js'

async function examples() {
    console.log('Running examples...\n')

    // Example 1: Full placeholder with both blur and color
    console.log('1. Full placeholder generation:')
    const full = await getPlaceholder('./test/fixtures/test.jpg')
    console.log('  Blur data URL length:', full.base64?.length, 'bytes')
    console.log('  Dominant color:', full.color)
    console.log('  Dimensions:', `${full.metadata?.width}x${full.metadata?.height}`)
    console.log()

    // Example 2: Blur only (faster)
    console.log('2. Blur only:')
    const blur = await getBlurDataURL('./test/fixtures/test.jpg')
    console.log('  Data URL:', blur.substring(0, 80) + '...')
    console.log()

    // Example 3: Color only (fastest)
    console.log('3. Color only:')
    const color = await getColor('./test/fixtures/test.jpg')
    console.log('  Hex color:', color)
    console.log()

    // Example 4: Custom options
    console.log('4. Custom options (small size, high quality):')
    const custom = await getPlaceholder('./test/fixtures/test.jpg', {
        size: 8,
        quality: 90,
        colorAlgorithm: 'dominant'
    })
    console.log('  Blur data length:', custom.base64?.length, 'bytes')
    console.log('  Color:', custom.color)
    console.log()

    console.log('✅ All examples completed!')
}

examples().catch(console.error)
