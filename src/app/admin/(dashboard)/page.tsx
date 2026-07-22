import { auth, currentUser } from "@clerk/nextjs/server";
import { fetchMenuItems } from "@/actions/menu";
import MenuEditor from "@/components/admin/MenuEditor";

export const dynamic = "force-dynamic"; // Ensure admin always fetches fresh data

export default async function AdminDashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();
  const ownerName = user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress ?? "Owner";

  // Fetch items from the database
  const res = await fetchMenuItems();
  const items = res.success ? res.items : [];

  return (
    <div className="space-y-8">
      {/* ── Welcome Banner ─────────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#161618] to-[#0f0f10] p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#DFB15B]/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <p className="text-[#DFB15B] text-xs tracking-[0.4em] uppercase font-bold mb-2">Welcome back</p>
          <h1 className="text-3xl sm:text-4xl font-serif text-white mb-3">{ownerName} 👋</h1>
          <p className="text-neutral-400 text-sm max-w-lg">
            You are securely signed in to the Majesty Mandi House owner dashboard.
          </p>
        </div>
      </div>

      {/* ── Menu Editor ────────────────────────────────────────────────── */}
      <MenuEditor initialItems={items} />

    </div>
  );
}
