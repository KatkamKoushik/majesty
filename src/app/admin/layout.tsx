import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  // Server-side auth guard — double-checks authentication even if middleware
  // passes (defence-in-depth). Redirects unauthenticated users to login.
  const { userId } = await auth();
  if (!userId) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
      {/* ── Admin Top Bar ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#DFB15B] animate-pulse" />
            <span className="font-serif text-[#DFB15B] text-lg tracking-widest uppercase">
              Majesty
            </span>
            <span className="hidden sm:block text-white/30 text-xs tracking-[0.3em] uppercase border border-white/10 px-2 py-0.5 rounded-full">
              Admin
            </span>
          </div>

          {/* Right side — UserButton provides sign-out and account management */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-white/40 text-xs">
              Owner Dashboard
            </span>
            {/*
              <UserButton> is Clerk's pre-built avatar + dropdown.
              Clicking it shows "Sign out", "Manage account", etc.
              afterSignOutUrl sends the owner back to the public homepage.
            */}
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                variables: {
                  colorPrimary: "#DFB15B",
                },
              }}
            />
          </div>
        </div>
      </header>

      {/* ── Page Content ──────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  );
}
