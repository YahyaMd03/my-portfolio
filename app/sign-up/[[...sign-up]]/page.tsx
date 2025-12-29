import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Join the Skill Universe
          </h1>
          <p className="text-zinc-400">
            Create an account to explore technologies and best practices
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-[#0f0f15] border border-white/10",
              headerTitle: "text-white",
              headerSubtitle: "text-zinc-400",
              socialButtonsBlockButton:
                "bg-white/5 border border-white/10 text-white hover:bg-white/10",
              formButtonPrimary:
                "bg-linear-to-r from-violet-600 to-fuchsia-600 hover:opacity-90",
              formFieldInput:
                "bg-white/5 border-white/10 text-white placeholder:text-zinc-500",
              formFieldLabel: "text-zinc-300",
              footerActionLink: "text-violet-400 hover:text-violet-300",
            },
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
        />
      </div>
    </div>
  );
}

