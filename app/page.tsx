import { GlowButton } from "@/components/buttons/GlowButton";
import { Card } from "@/components/ui/card";

export default async function Home() {
  return (
    <div className="h-full w-full flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full text-center px-6 py-12 border-0 backdrop-blur-sm">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text ">
          Wish it, Think it, Note it.
        </h1>
        <h2 className="mt-6 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-gray-500 max-w-3xl mx-auto">
          Turn messy thoughts into structured brilliance with AI-driven note
          intelligence.
        </h2>
        <div className="mt-8">
          <GlowButton>Start your Journey</GlowButton>
        </div>
      </Card>
    </div>
  );
}
