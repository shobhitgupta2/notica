"use client";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/app/auth/auth-client";
import { GoogleLogo } from "@/components/icons/GoogleLogo";

export default function GoogleSignInButton() {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full gap-2"
      onClick={() => {
        signInWithGoogle();
      }}
    >
      <GoogleLogo />
      Sign In with Google
    </Button>
  );
}
