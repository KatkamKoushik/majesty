"use server";

import { sql } from "@vercel/postgres";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { MenuItem } from "@/types";

export async function addMenuItem(formData: FormData) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const pricesRaw = formData.get("prices") as string; // Expecting JSON string like '{"Regular": 240}'
  const description = formData.get("description") as string | null;
  const imageFile = formData.get("image") as File;

  if (!name || !category || !pricesRaw || !imageFile || imageFile.size === 0) {
    throw new Error("Missing required fields");
  }

  try {
    let prices;
    try {
      prices = JSON.parse(pricesRaw);
    } catch (e) {
      throw new Error("Prices must be a valid JSON string");
    }

    // Generate a unique ID
    const id = `item-${Date.now()}`;

    // Upload image to Vercel Blob
    const blob = await put(`dishes/${id}-${imageFile.name}`, imageFile, {
      access: "public",
    });

    // Insert into Postgres
    await sql`
      INSERT INTO menu_items (id, name, category, prices, image, description)
      VALUES (${id}, ${name}, ${category}, ${JSON.stringify(prices)}, ${blob.url}, ${description || null})
    `;

    // Revalidate paths to update the public menu instantly
    revalidatePath("/");
    revalidatePath("/physical-menu");

    return { success: true, id };
  } catch (error: any) {
    console.error("Error adding menu item:", error);
    return { error: error.message };
  }
}

export async function editMenuItem(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const pricesRaw = formData.get("prices") as string;
  const description = formData.get("description") as string | null;
  const imageFile = formData.get("image") as File | null;
  const existingImageUrl = formData.get("existingImageUrl") as string;

  if (!id || !name || !category || !pricesRaw) {
    throw new Error("Missing required fields");
  }

  try {
    let prices;
    try {
      prices = JSON.parse(pricesRaw);
    } catch (e) {
      throw new Error("Prices must be a valid JSON string");
    }

    let imageUrl = existingImageUrl;

    // If a new image was uploaded, upload it to Vercel Blob
    if (imageFile && imageFile.size > 0) {
      const blob = await put(`dishes/${id}-${imageFile.name}`, imageFile, {
        access: "public",
      });
      imageUrl = blob.url;
    }

    // Update Postgres
    await sql`
      UPDATE menu_items 
      SET 
        name = ${name}, 
        category = ${category}, 
        prices = ${JSON.stringify(prices)}, 
        image = ${imageUrl}, 
        description = ${description || null},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `;

    // Revalidate paths
    revalidatePath("/");
    revalidatePath("/physical-menu");

    return { success: true };
  } catch (error: any) {
    console.error("Error editing menu item:", error);
    return { error: error.message };
  }
}

export async function deleteMenuItem(id: string) {
  try {
    await sql`DELETE FROM menu_items WHERE id = ${id}`;
    
    // Revalidate paths
    revalidatePath("/");
    revalidatePath("/physical-menu");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting menu item:", error);
    return { error: error.message };
  }
}

export async function fetchMenuItems() {
  try {
    const { rows } = await sql`
      SELECT id, name, category, prices, image, description 
      FROM menu_items 
      ORDER BY created_at DESC
    `;
    return { success: true, items: rows as MenuItem[] };
  } catch (error: any) {
    console.error("Error fetching menu items:", error);
    return { error: error.message };
  }
}
