import { ImageResponse } from 'next/og';
import { join } from 'path';
import { readFileSync } from 'fs';

export const runtime = 'nodejs';

export const alt = 'next-image-placeholder';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/jpg';

export default async function Image() {
    // Load background image
    const bgPath = join(process.cwd(), 'public', 'social-bg.jpg');
    const bgData = readFileSync(bgPath);
    const bgBase64 = bgData.toString('base64');
    const bgSrc = `data:image/jpeg;base64,${bgBase64}`;

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    backgroundImage: `url(${bgSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        padding: '40px 60px',
                        border: '4px solid rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(4px)',
                        maxWidth: '80%',
                        textAlign: 'center',
                    }}
                >
                    <h1
                        style={{
                            fontSize: 80,
                            fontWeight: 800,
                            color: 'white',
                            margin: 0,
                            padding: 0,
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                            marginBottom: 20,
                            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                        }}
                    >
                        next-image-placeholder
                    </h1>
                    <p
                        style={{
                            fontSize: 32,
                            color: 'rgba(255, 255, 255, 0.9)',
                            margin: 0,
                            padding: 0,
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                            fontWeight: 500,
                        }}
                    >
                        Lightweight server-side blur placeholders
                    </p>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
