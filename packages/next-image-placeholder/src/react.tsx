

import { useState, useEffect, useCallback, useRef, useTransition } from 'react'
import Image from 'next/image'
import type { ImageProps } from 'next/image'
import type { PlaceholderResult, PlaceholderOptions } from './types/index.js'

/**
 * Server action type that client components pass to the hook.
 */
export type PlaceholderAction = (
    imageUrl: string,
    options?: PlaceholderOptions
) => Promise<PlaceholderResult>

/**
 * Hook return type
 */
export interface UsePlaceholderReturn {
    data: PlaceholderResult | null
    isLoading: boolean
    error: Error | null
    refetch: () => void
}

/**
 * Simple in-memory cache for placeholder results
 */
const cache = new Map<string, PlaceholderResult>()

/**
 * Standard React hook
 * Use this when you want to handle loading states manually.
 */
export function usePlaceholder(
    imageUrl: string | null | undefined,
    action: PlaceholderAction,
    options?: PlaceholderOptions
): UsePlaceholderReturn {
    // Check cache synchronously for initial state
    const [data, setData] = useState<PlaceholderResult | null>(() => {
        if (imageUrl) {
            const cached = cache.get(imageUrl)
            if (cached) return cached
        }
        return null
    })
    const [error, setError] = useState<Error | null>(null)
    const [isPending, startTransition] = useTransition()

    const currentUrlRef = useRef(imageUrl)
    currentUrlRef.current = imageUrl

    const fetchPlaceholder = useCallback((url: string, skipCache = false) => {
        if (!skipCache) {
            const cached = cache.get(url)
            if (cached) {
                setData(cached)
                return
            }
        }

        setError(null)

        startTransition(async () => {
            try {
                const result = await action(url, options)
                if (currentUrlRef.current === url) {
                    cache.set(url, result)
                    setData(result)
                }
            } catch (err) {
                if (currentUrlRef.current === url) {
                    setError(err instanceof Error ? err : new Error('Failed to generate placeholder'))
                }
            }
        })
    }, [action, options])

    useEffect(() => {
        if (!imageUrl) {
            setData(null)
            setError(null)
            return
        }

        const cached = cache.get(imageUrl)
        if (cached) {
            setData(cached)
            return
        }

        fetchPlaceholder(imageUrl)
    }, [imageUrl, fetchPlaceholder])

    const refetch = useCallback(() => {
        if (imageUrl) {
            fetchPlaceholder(imageUrl, true)
        }
    }, [imageUrl, fetchPlaceholder])

    const isLoading = isPending || (!!imageUrl && !data && !error)

    return { data, isLoading, error, refetch }
}

/**
 * Props for the PlaceholderImage component
 */
export interface PlaceholderImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
    /** The server action to generate the placeholder */
    action: PlaceholderAction
    /** Placeholder generation options */
    placeholderOptions?: PlaceholderOptions
    /** Fallback to show while loading (defaults to empty) */
    fallback?: React.ReactNode
}

/**
 * A wrapper around next/image that handles placeholder generation automatically.
 * 
 * It waits for the placeholder to be generated before rendering the Image component,
 * preventing the race condition where the image loads before the blur data is ready.
 */
export function PlaceholderImage({
    src,
    action,
    placeholderOptions,
    fallback = null,
    style,
    ...props
}: PlaceholderImageProps) {
    // We assume src is a string for placeholder generation
    // If it's a StaticImport object, Next.js handles blurDataURL automatically anyway,
    // so this component is primarily for string URLs (remote/dynamic images).
    const imageUrl = typeof src === 'string' ? src : undefined

    // If src is not a string (e.g. static import), we can render Image directly,
    // but the type doesn't easily allow strictly checking that at runtime for generation.
    // However, getPlaceholder expects a string or buffer.

    const { data } = usePlaceholder(imageUrl, action, placeholderOptions)

    // For string URLs, we wait for data
    if (imageUrl && !data?.base64) {
        return <>{fallback} </>
    }

    // If it's a static import (imageUrl is undefined), we pass through.
    // Next.js handles blur for static imports automatically if configured.
    // But if the user used this component, they likely want our generation.
    // Our library is mostly for remote images or dynamic paths where Next.js auto-blur doesn't work.

    return (
        <Image
            src={src}
            {...props}
            placeholder={data?.base64 ? "blur" : undefined}
            blurDataURL={data?.base64}
            style={{
                ...style,
                backgroundColor: data?.color
            }}
        />
    )
}

/**
 * Clears the placeholder cache.
 */
export function clearPlaceholderCache(): void {
    cache.clear()
}

export type { PlaceholderResult, PlaceholderOptions }
