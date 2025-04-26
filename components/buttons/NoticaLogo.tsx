import { Button } from "@/components/ui/button";
import { BookLogo } from "@/components/icons/BookLogo";
import Link from "next/link";

export const NoticaLogo = () => {
  return (
    <Button
      className="bg-orange-600 hover:bg-orange-600 dark:text-foreground gap-1 select-none"
      asChild
    >
      <Link href="/">
        <BookLogo />
        Notica
      </Link>
    </Button>
  );
};
