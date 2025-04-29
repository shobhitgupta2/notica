import { signUpAction } from "@/app/auth/actions";
import { FormMessage, Message } from "@/components/text/form-message";
import { SubmitButton } from "@/components/buttons/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import GoogleSignInButton from "@/components/buttons/GoogleSignInButton";
import { Separator } from "@/components/ui/separator";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="flex-1 flex flex-col rounded-lg min-w-96 min-h-72 border-zinc-800 border-2 p-4">
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />
          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            Sign up
          </SubmitButton>
          <div className="flex flex-row w-full justify-center items-center gap-4">
            <Separator
              orientation="horizontal"
              className="my-4 w-1/3 flex-grow"
            />
            Or
            <Separator
              orientation="horizontal"
              className="my-4 w-1/3 flex-grow"
            />
          </div>
          <GoogleSignInButton />
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
