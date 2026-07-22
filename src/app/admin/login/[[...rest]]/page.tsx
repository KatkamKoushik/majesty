import { SignIn } from "@clerk/nextjs";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-4">
      {/* Ambient golden glow behind the card */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#DFB15B]/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Branding */}
        <div className="text-center mb-2">
          <p className="text-[#DFB15B] text-xs tracking-[0.4em] uppercase font-bold mb-1">
            Owner Portal
          </p>
          <h1 className="text-white font-serif text-3xl tracking-wide">
            Majesty Admin
          </h1>
        </div>

        {/*
          Clerk's pre-built <SignIn> component.
          After sign-in, Clerk redirects to NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin
          No custom password logic — Clerk handles everything.
        */}
        <SignIn
          fallbackRedirectUrl="/admin"
          appearance={{
            variables: {
              colorPrimary: "#DFB15B",
              colorBackground: "#111111",
              colorForeground: "#ffffff",
              colorMutedForeground: "#a3a3a3",
              colorInput: "#1a1a1a",
              colorInputForeground: "#ffffff",
              borderRadius: "0.75rem",
            },
            elements: {
              card: "shadow-[0_0_60px_rgba(223,177,91,0.08)] border border-white/10",
              headerTitle: "font-serif text-white",
              socialButtonsBlockButton: "border border-white/10 bg-white/5 hover:bg-white/10",
              formButtonPrimary: "bg-[#DFB15B] hover:bg-[#F3A833] text-black font-bold",
              footerActionLink: "text-[#DFB15B] hover:text-[#F3A833]",
            },
          }}
        />
      </div>
    </div>
  );
}
