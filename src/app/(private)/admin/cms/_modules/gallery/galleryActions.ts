"use server";

import { db } from "@/drizzle/db";
import {
  GalleryTable,
  HomepageSectionsTable,
  InsertHomepageSection,
} from "@/drizzle/schema";
import { saveImage } from "@/lib/action-utils";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { GalleryFormSchema } from "./galleryZodSchema";

export async function editHomepageGallery(formData: FormData) {
  const _title = formData.get("title");
  const _fdImages = formData.getAll("images") as File[];
  const _fdAlts = formData.getAll("alts") as string[];

  const _images = _fdImages.map((file, index) => ({
    file,
    alt: _fdAlts[index],
  }));

  const { title, images } = GalleryFormSchema.parse({
    title: _title,
    images: _images,
  });

  const payload = { title, images }; // ????

  const processedImages = [];
  /* await Promise.all(
    images.map(async (image, index) => {
      saveImage(image.file, "homepage_banner" + index)
  })) */
  //Promise.all????
  images.forEach(async (image, index) => {
    const response = await saveImage(image.file, "homepage_banner" + index);
    if (!response.success) {
      console.error(`Failed to process image ${image.file}`);
      return;
    }
    const { filePath, blurhash } = response;
    processedImages.push({ filePath, blurhash, alt: image.alt });
  });
  // if (!response.success) return Promise.reject(response);

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

  revalidateTag("homepage_gallery");
  revalidatePath("/admin/cms/homepage");
  // revalidatePath("/");

  return { status: "success", data: insertResponse[0].data };
}

async function getGallerySection(sectionName: string) {
  const data = await db
    .select()
    .from(GalleryTable)
    .where(eq(GalleryTable.section_name, sectionName));
  //FIX_ME: join with images

  return data[0] ?? null;
}

export const cachedHomepageGallerySection = unstable_cache(
  () => getGallerySection("homepage_gallery"),
  ["homepage_gallery"],
  {
    tags: ["homepage", "homepage_gallery"],
  },
);
