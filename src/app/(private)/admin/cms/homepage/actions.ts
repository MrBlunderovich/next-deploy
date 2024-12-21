"use server";

import { db } from "@/drizzle/db";
import { HomepageSectionsTable, InsertHomepageSection } from "@/drizzle/schema";
import { saveImage } from "@/lib/action-utils";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

export async function editHomepageBanner(formData: FormData) {
  //FIX_ME: zod
  const title = formData.get("title");
  const image = formData.get("image");

  if (typeof title !== "string" || !(image instanceof File)) return;

  const payload = { title, image };
  console.log(payload, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>content");
  const response = await saveImage(image, "homepage_banner");
  const { fileName, filePath, blurhash } = response;
  console.log(fileName, "------------------------fileName");
  console.log(response, "------------------------saveFile_response");

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

  return data[0].content;
}

export const cachedHomepageBannerSection = unstable_cache(
  getHomepageBannerSection,
  ["homepage_banner"],
  {
    tags: ["homepage", "homepage_banner"],
  },
);
