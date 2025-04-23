import { Button } from "@/components/ui/button";
import Link from "next/link";

export const GlowButton = ({
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="relative group inline-block">
      <div className="absolute -inset-0.5 bg-orange-600 rounded-lg blur opacity-80 group-hover:opacity-100 transition duration-300" />
      <Button
        className="relative px-8 py-6 text-2xl font-semibold bg-gradient-to-r from-orange-400 to-orange-800 text-white rounded-lg shadow-lg h-fit w-full"
        size="lg"
      >
        <Link href="/home">{children}</Link>
      </Button>
    </div>
  );
};
