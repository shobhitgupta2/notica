import PageContainer from "@/components/containers/PageContainer";
import { Hero, HeroDescription, HeroTitle } from "@/components/text/Hero";
import { GlowButton } from "@/components/buttons/GlowButton";

export default async function Home() {
  return (
    <PageContainer>
      <div className="w-screen flex flex-col justify-center items-center">
        <HeroTitle>Wish it, Think it, Note it.</HeroTitle>
        <HeroDescription>
          Turn messy thoughts into structured brilliance with AI-driven note
          intelligence.
        </HeroDescription>
      </div>
      <GlowButton>Start your Journey</GlowButton>
    </PageContainer>
  );
}
