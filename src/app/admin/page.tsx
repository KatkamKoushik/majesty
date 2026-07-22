import { auth, currentUser } from "@clerk/nextjs/server";

export default async function AdminDashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  const ownerName = user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress ?? "Owner";

  return (
    <div className="space-y-8">

      {/* ── Welcome Banner ─────────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#161618] to-[#0f0f10] p-8">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#DFB15B]/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <p className="text-[#DFB15B] text-xs tracking-[0.4em] uppercase font-bold mb-2">
            Welcome back
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif text-white mb-3">
            {ownerName} 👋
          </h1>
          <p className="text-neutral-400 text-sm max-w-lg">
            You are securely signed in to the Majesty Mandi House owner dashboard.
            This area is private and not visible to customers.
          </p>
        </div>
      </div>

      {/* ── Quick Stats Placeholder ────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "Today's Orders", value: "—", note: "Coming soon" },
          { label: "Menu Items", value: "18", note: "Active listings" },
          { label: "WhatsApp Enquiries", value: "—", note: "Coming soon" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/10 bg-[#111113] p-6 flex flex-col gap-1"
          >
            <span className="text-neutral-500 text-xs uppercase tracking-widest">
              {stat.label}
            </span>
            <span className="text-3xl font-serif text-[#DFB15B]">
              {stat.value}
            </span>
            <span className="text-neutral-600 text-xs">{stat.note}</span>
          </div>
        ))}
      </div>

      {/* ── Info Card ─────────────────────────────────────────────────── */}
      <div className="rounded-xl border border-[#DFB15B]/20 bg-[#DFB15B]/5 p-6">
        <h2 className="font-serif text-[#DFB15B] text-lg mb-2">
          Dashboard in Progress
        </h2>
        <p className="text-neutral-400 text-sm leading-relaxed">
          This is your secure admin area. Future features can include live order
          tracking, menu management, reservation control, and WhatsApp message
          logs — all protected behind your Clerk login.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Order Tracking", "Menu Editor", "Reservations", "Analytics"].map((tag) => (
            <span
              key={tag}
              className="text-[10px] tracking-widest uppercase text-[#DFB15B]/60 border border-[#DFB15B]/20 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
