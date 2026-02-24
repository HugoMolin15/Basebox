import { registry } from "@/lib/registry";
import { notFound } from "next/navigation";

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const entry = registry.find((item) => item.id === slug);
    if (!entry) notFound();

    const Component = entry.component;

    return (
        /* Adding min-h-screen and w-full here ensures the component 
           always has a container to fill, even if it uses absolute positioning.
        */
        <div className="w-full min-h-screen bg-white relative">
            <Component />
        </div>
    );
}