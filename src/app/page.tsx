import { fetchMenuItems } from "@/actions/menu";
import { HomePageClient } from "@/components/HomePageClient";
import { menuItems as fallbackMenu } from "@/data/menu";
import { MenuItem } from "@/types";

export const revalidate = 60; // Cache the page for 60 seconds

export default async function Home() {
  let items: MenuItem[] = [];
  try {
    const res = await fetchMenuItems();
    if (res.success && res.items) {
      items = res.items;
    }
  } catch (error) {
    console.error("Failed to fetch from DB, falling back to static menu:", error);
  }

  // If the DB is empty or fails, use the hardcoded menu
  if (items.length === 0) {
    items = fallbackMenu;
  }

  return <HomePageClient initialMenuItems={items} />;
}
