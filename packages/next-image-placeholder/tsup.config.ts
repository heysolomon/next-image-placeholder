import { defineConfig } from 'tsup'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

async function addUseClientDirective(param: { output: string[] }) {
    const files = ['react.cjs', 'react.mjs']

    for (const file of files) {
        try {
            const filePath = join(process.cwd(), 'dist', file)
            const content = await readFile(filePath, 'utf-8')
            if (!content.includes('"use client"')) {
                await writeFile(filePath, '"use client";\n' + content)
                console.log(`Examples: injected "use client" into ${file}`)
            }
        } catch (err) {
            // Ignore if file doesn't exist yet
        }
    }
}

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
        entry: ['src/react.tsx'],
        format: ['esm', 'cjs'],
        dts: true,
        sourcemap: true,
        clean: false, // Don't clean since first config cleans
        treeshake: true,
        splitting: false,
        minify: false,
        platform: 'browser',
        target: 'es2020',
        external: ['react', 'next', 'next/image'],
        outExtension({ format }) {
            return { js: format === 'cjs' ? '.cjs' : '.mjs' }
        },
        async onSuccess() {
            await addUseClientDirective({ output: [] })
        }
    }
])
