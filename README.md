# next-image-placeholder

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/npm/v/next-image-placeholder.svg)

Lightweight server-side blur placeholder and dominant color extraction for Next.js.

## Monorepo Structure

This project is a monorepo managed with [Turbo](https://turbo.build/) and [pnpm](https://pnpm.io/).

- **[packages/next-image-placeholder](./packages/next-image-placeholder)**: The core library package.
- **[apps/web](./apps/web)**: The documentation and demo website.

## Getting Started

To engage with this project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/heysolomon/next-image-placeholder.git
    cd next-image-placeholder
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    pnpm dev
    ```

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to get started.

## Acknowledgements

- [sharp](https://sharp.pixelplumbing.com/) - High performance Node.js image processing
- [fast-average-color-node](https://github.com/fast-average-color/fast-average-color-node) - A simple library that calculates the average color of an image

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
