"use server";

import { db } from "@/drizzle/db";
import { HomepageSectionsTable, InsertHomepageSection } from "@/drizzle/schema";
import { saveImage } from "@/lib/action-utils";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { BannerFormSchema } from "./schema";

export async function editHomepageBanner(formData: FormData) {
  const _title = formData.get("title");
  const _image = formData.get("image");

  const { title, image } = BannerFormSchema.parse({
    title: _title,
    image: _image,
  });

  if (typeof title !== "string" || !(image instanceof File)) return;

  const payload = { title, image };
  const response = await saveImage(image, "homepage_banner");
  const { filePath, blurhash } = response;

  if (!response.success) return Promise.reject(response);

  const content: InsertHomepageSection["content"] = {
    title: payload.title,
    image: {
      src: filePath,
      blurhash,
      alt: "",
    },
  };

  const insertResponse = await db
    .insert(HomepageSectionsTable)
    .values({ id: "banner", content })
    .onConflictDoUpdate({
      target: HomepageSectionsTable.id,
      set: { content },
    })
    .returning({ data: HomepageSectionsTable.content });

  revalidateTag("homepage_banner");
  revalidatePath("/admin/cms/homepage");
  // revalidatePath("/");

  return { status: "success", data: insertResponse[0].data };
}

export async function getHomepageBannerSection() {
  const data = await db
    .select()
    .from(HomepageSectionsTable)
    .where(eq(HomepageSectionsTable.id, "banner"));

  return data[0]?.content ?? null;
}

export const cachedHomepageBannerSection = unstable_cache(
  getHomepageBannerSection,
  ["homepage_banner"],
  {
    tags: ["homepage", "homepage_banner"],
  },
);
