import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-emerald-800">
      <div className="w-full max-w-md">
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white/95 backdrop-blur-xl shadow-2xl border border-green-200/50",
              headerTitle: "text-green-900",
              headerSubtitle: "text-green-700",
              socialButtonsBlockButton: "border-green-200 hover:bg-green-50",
              formButtonPrimary: "bg-green-700 hover:bg-green-800",
              footerActionLink: "text-green-700 hover:text-green-900",
            },
          }}
        />
      </div>
    </div>
  );
}
