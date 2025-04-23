import { ReactNode } from "react";

const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen flex flex-col items-center justify-center gap-32">
      {children}
    </div>
  );
};

export default PageContainer;
