import { defineConfig } from 'tsup'

export default defineConfig([
    // Main entry (Node.js/server-side)
    {
        entry: ['src/index.ts'],
        format: ['esm', 'cjs'],
        dts: true,
        sourcemap: true,
        clean: true,
        treeshake: true,
        splitting: false,
        minify: false,
        platform: 'node',
        target: 'node18',
        external: ['sharp', 'fast-average-color-node'],
        outExtension({ format }) {
            return { js: format === 'cjs' ? '.cjs' : '.mjs' }
        }
    },
    // React entry (client-side)
    {
        entry: ['src/react.ts'],
        format: ['esm', 'cjs'],
        dts: true,
        sourcemap: true,
        clean: false, // Don't clean since first config cleans
        treeshake: true,
        splitting: false,
        minify: false,
        platform: 'browser',
        target: 'es2020',
        external: ['react'],
        outExtension({ format }) {
            return { js: format === 'cjs' ? '.cjs' : '.mjs' }
        }
    }
])
