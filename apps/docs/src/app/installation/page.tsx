import { InstallTabs } from "@/components/install-tabs";

export default function InstallationPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-4" id="installation">Installation</h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                    Install the package using your favorite package manager.
                </p>
                <InstallTabs />
            </div>
        </div>
    );
}
