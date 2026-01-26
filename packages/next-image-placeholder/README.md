# next-image-placeholder

Lightweight server-side blur placeholder and dominant color extraction for Next.js images.

[![npm version](https://img.shields.io/npm/v/next-image-placeholder)](https://npmjs.com/package/next-image-placeholder)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/next-image-placeholder)](https://bundlephobia.com/package/next-image-placeholder)

## Features

- 🎨 **Blur Placeholders**: Generate tiny (~150 bytes) blur placeholders using LQIP technique
- 🌈 **Dominant Colors**: Extract dominant colors for instant backgrounds
- ⚡️ **Server-Side Processing**: Zero client-side JavaScript overhead for image processing
- ⚛️ **React Hook**: `usePlaceholder` hook for easy client component usage
- 🔧 **Zero Config**: Works out of the box with sensible defaults
- 📦 **Lightweight**: Minimal dependencies, tree-shakable
- ✅ **TypeScript**: Fully typed with comprehensive interfaces
- 🚀 **Next.js 13+**: Built for App Router, Server Components, and Server Actions

## Installation

```bash
npm install next-image-placeholder sharp
```

> **Note**: `sharp` is a peer dependency required for image processing. If using the React hook in client components, React 18+ is also required (already included in Next.js projects).

## Quick Start

### Basic Usage
```typescript
// app/page.tsx (Server Component)
import Image from 'next/image'
import { getPlaceholder } from 'next-image-placeholder'

export default async function Page() {
  const { base64, color } = await getPlaceholder('/hero.jpg')

  return (
    <div style={{ backgroundColor: color }}>
      <Image
        src="/hero.jpg"
        width={1200}
        height={600}
        placeholder="blur"
        blurDataURL={base64}
        alt="Hero image"
      />
    </div>
  )
}
```

### With Remote Images
```typescript
import { getPlaceholder } from 'next-image-placeholder'

const imageUrl = 'https://images.unsplash.com/photo-123/image.jpg'
const { base64, color } = await getPlaceholder(imageUrl)
```

### Color-Only Placeholder (Ultra Lightweight)
```typescript
import { getColor } from 'next-image-placeholder'

const color = await getColor('/image.jpg')

// Use as solid color background
<div style={{ backgroundColor: color }}>
  <Image src="/image.jpg" fill alt="..." />
</div>
```

### Client Components (with Server Actions)
```typescript
// 1. Create a server action (app/actions.ts)
'use server'
import { getPlaceholder } from 'next-image-placeholder'

export async function getPlaceholderAction(imageUrl: string) {
  return getPlaceholder(imageUrl)
}

// 2a. Use the component (Recommended)
'use client'
import { PlaceholderImage } from 'next-image-placeholder/react'
import { getPlaceholderAction } from './actions'

export function Gallery({ src }: { src: string }) {
  return (
    <PlaceholderImage
      src={src}
      action={getPlaceholderAction}
      width={400}
      height={300}
      alt="Gallery Image"
      className="rounded-lg"
    />
  )
}

// 2b. Or use the hook for custom control
'use client'
import Image from 'next/image'
import { usePlaceholder } from 'next-image-placeholder/react'
import { getPlaceholderAction } from './actions'

export function CustomCard({ src }: { src: string }) {
  const { data } = usePlaceholder(src, getPlaceholderAction)

  if (!data?.base64) return <Skeleton />

  return (
    <Image
      src={src}
      placeholder="blur"
      blurDataURL={data.base64}
      style={{ backgroundColor: data.color }}
      {...props}
    />
  )
}
```

## API Reference

### `getPlaceholder(input, options?)`

Generates both blur placeholder and dominant color (recommended).

**Parameters:**
- `input`: `string | Buffer | ArrayBuffer` - Image URL or buffer
- `options?`: `PlaceholderOptions` - Optional configuration

**Returns:** `Promise<PlaceholderResult>`
```typescript
interface PlaceholderResult {
  base64?: string      // Blur placeholder data URL
  color: string        // Dominant color hex (#rrggbb)
  metadata?: {
    width: number
    height: number
    format: string
  }
}
```

**Options:**
```typescript
interface PlaceholderOptions {
  size?: number              // Thumbnail size (default: 16)
  quality?: number           // WebP quality 0-100 (default: 70)
  colorAlgorithm?: 'simple' | 'sqrt' | 'dominant'  // (default: 'sqrt')
  timeout?: number           // Fetch timeout in ms (default: 30000)
  retries?: number           // Retry attempts (default: 3)
}
```

### `getBlurDataURL(input, options?)`

Generates only blur placeholder (faster if you don't need color).

**Returns:** `Promise<string>` - Base64 data URL

### `getColor(input, options?)`

Extracts only dominant color (fastest option).

**Returns:** `Promise<string>` - Hex color

### `getColorRGB(input, options?)`

Gets RGB values instead of hex.

**Returns:** `Promise<{ r: number; g: number; b: number; a: number }>`

### `usePlaceholder(imageUrl, action, options?)` (React Hook)

React hook for client components. Requires a server action to call the main functions.

**Parameters:**
- `imageUrl`: `string | null | undefined` - Image URL
- `action`: `PlaceholderAction` - Server action wrapping `getPlaceholder`
- `options?`: `PlaceholderOptions` - Optional configuration

**Returns:** `UsePlaceholderReturn`
```typescript
interface UsePlaceholderReturn {
  data: PlaceholderResult | null  // Placeholder data
  isLoading: boolean              // Loading state
  error: Error | null             // Any error
  refetch: () => void             // Manual refetch
}
```

### `<PlaceholderImage>` Component

A wrapper around `next/image` that automatically handles placeholder generation.

**Props:**
- `action`: `PlaceholderAction` - Server action (required)
- `placeholderOptions`: `PlaceholderOptions` - Optional configuration
- `fallback`: `React.ReactNode` - Element to show while loading (optional)
- ...all other `next/image` props

```tsx
<PlaceholderImage
  src="/image.jpg"
  action={getPlaceholderAction}
  width={800}
  height={600}
  alt="Image"
  fallback={<div className="bg-gray-200 w-full h-full" />}
/>
```

## Usage Examples

### With CMS Images
```typescript
const posts = await getPosts()

const postsWithPlaceholders = await Promise.all(
  posts.map(async (post) => ({
    ...post,
    placeholder: await getPlaceholder(post.featuredImage)
  }))
)
```

### With React Query / TanStack Query
```typescript
// Server action
'use server'
import { getPlaceholder } from 'next-image-placeholder'

export async function getProductWithPlaceholder(id: string) {
  const product = await getProduct(id)
  const placeholder = await getPlaceholder(product.image)
  
  return { ...product, placeholder }
}
```

### Caching with Next.js
```typescript
import { unstable_cache } from 'next/cache'
import { getPlaceholder } from 'next-image-placeholder'

const getCachedPlaceholder = unstable_cache(
  async (imageUrl: string) => getPlaceholder(imageUrl),
  ['image-placeholders'],
  { revalidate: 3600 * 24 * 7 } // Cache for 1 week
)
```

## Performance

- **Blur generation**: ~50ms per image (server-side)
- **Placeholder size**: ~150 bytes per image
- **Client bundle**: 0 bytes (server-only)
- **Memory**: Efficient with jemalloc (see production tips)

## Production Tips

### Memory Optimization

For production servers processing many images, use jemalloc to prevent memory fragmentation:
```bash
# Ubuntu/Debian
apt-get install libjemalloc2

# Run your app with jemalloc
LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so.2 node server.js
```

### Build-Time Generation

For static sites, generate placeholders at build time:
```typescript
// scripts/generate-placeholders.ts
import { getPlaceholder } from 'next-image-placeholder'
import { writeFileSync } from 'fs'

const images = ['hero.jpg', 'about.jpg', 'contact.jpg']

const placeholders = await Promise.all(
  images.map(async (img) => ({
    img,
    placeholder: await getPlaceholder(`/images/${img}`)
  }))
)

writeFileSync(
  'placeholders.json',
  JSON.stringify(placeholders, null, 2)
)
```

## TypeScript

Full TypeScript support with exported types:
```typescript
import type {
  PlaceholderOptions,
  PlaceholderResult,
  FetchOptions
} from 'next-image-placeholder'
```

## Requirements

- Node.js 18+ (for native fetch)
- Sharp ^0.34.0 (peer dependency)
- React 18+ (peer dependency, for `usePlaceholder` hook only)

## License

MIT

## Author

Solomon Akuson
