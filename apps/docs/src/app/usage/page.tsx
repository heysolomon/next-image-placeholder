import { CodeBlock } from "@/components/code-block";

export default function UsagePage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">Basic Usage</h1>
                <div className="space-y-6">
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                        Use <code>getPlaceholder</code> in a Server Component to generate the blur data.
                    </p>
                    <CodeBlock code={`import Image from "next/image";
import { getPlaceholder } from "next-image-placeholder";

export default async function Page() {
  const { base64 } = await getPlaceholder(
    "https://example.com/image.jpg"
  );

  return (
    <Image
      src="https://example.com/image.jpg"
      placeholder="blur"
      blurDataURL={base64}
      width={500}
      height={300}
      alt="Example"
    />
  );
}`} />
                </div>
            </div>
        </div>
    );
}
