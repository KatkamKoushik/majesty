import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { menuItems } from "@/data/menu";

export async function GET(request: Request) {
  // Simple auth check to ensure only admins can trigger this migration
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  
  if (secret !== process.env.CLERK_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const results = [];
    
    for (const item of menuItems) {
      // Upsert the menu items into Vercel Postgres
      const result = await sql`
        INSERT INTO menu_items (id, name, category, prices, image, description)
        VALUES (
          ${item.id}, 
          ${item.name}, 
          ${item.category}, 
          ${JSON.stringify(item.prices)}, 
          ${item.image}, 
          ${item.description || null}
        )
        ON CONFLICT (id) DO UPDATE SET 
          name = EXCLUDED.name,
          category = EXCLUDED.category,
          prices = EXCLUDED.prices,
          image = EXCLUDED.image,
          description = EXCLUDED.description;
      `;
      results.push({ id: item.id, status: "Migrated" });
    }

    return NextResponse.json({ success: true, migrated: results.length, results });
  } catch (error: any) {
    console.error("Migration error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
