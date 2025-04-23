import { Button } from "@/components/ui/button";
import Link from "next/link";

export const GlowButton = ({
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-orange-600 rounded-[0.75rem] blur opacity-80 group-hover:opacity-100 transition duration-300" />
      <Button
        className="relative p-4 h-fit text-2xl text-white rounded-[0.75rem]
    bg-gradient-to-r from-orange-500 to-orange-800"
        asChild
      >
        <Link href="/home" className="w-full h-full">
          {children}
        </Link>
      </Button>
    </div>
  );
};
