import HeaderAuth from "@/components/buttons/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./fonts/globals.css";
import { NoticaLogo } from "@/components/buttons/NoticaLogo";
import { TanstackProvider } from "@/providers/tanstack-provider";
import { Toaster } from "sonner";
import { StateProvider } from "@/providers/state-provider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Notica",
  description: "The best way to take notes",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground w-screen h-screen flex flex-col overflow-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="w-full flex justify-between items-center border-b border-b-foreground/10 h-16 gap-4 p-4">
            <NoticaLogo />
            <div className="h-full flex flex-row gap-2">
              <ThemeSwitcher />
              <HeaderAuth />
            </div>
          </nav>
          <main className="w-screen flex-1 overflow-auto">
            <div className="w-full h-full flex justify-center items-center">
              <TanstackProvider>
                <StateProvider>{children}</StateProvider>
                <Toaster />
              </TanstackProvider>
            </div>
          </main>
          <footer className="w-full flex items-center justify-center border-t text-center text-xs py-4">
            <p>Made by Shobhit Gupta © 2025</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
