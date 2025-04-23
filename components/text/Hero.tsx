interface HeroElementProps {
  children: string;
}

interface HeroProps {
  children: React.ReactNode;
}

export const HeroTitle = ({ children }: HeroElementProps) => {
  return (
    <h1 className="text-[6rem] bg-clip-text text-foreground select-none">
      {children}
    </h1>
  );
};

export const HeroDescription = ({ children }: HeroElementProps) => {
  return (
    <h1 className="text-[2rem] text-foreground select-none">{children}</h1>
  );
};

export const Hero = ({ children }: HeroProps) => {
  return <div className="text-center pt-[4rem]">{children}</div>;
};
