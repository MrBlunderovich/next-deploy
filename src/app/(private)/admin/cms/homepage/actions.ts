"use server";

import { db } from "@/drizzle/db";
import {
  BasicSectionsTable,
  HomepageSectionsTable,
  InsertHomepageSection,
} from "@/drizzle/schema";
import { saveImage } from "@/lib/action-utils";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { BannerFormSchema, DescriptionFormSchema } from "./schema";

export async function editHomepageBanner(formData: FormData) {
  const _title = formData.get("title");
  const _image = formData.get("image");

  const { title, image } = BannerFormSchema.parse({
    title: _title,
    image: _image,
  });

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

//-------------------------------------------------------------------

export async function editBasicSection(
  sectionName: string,
  formData: FormData,
) {
  const _title = formData.get("title");
  const _description = formData.get("description");
  //FIX_ME: account for image

  const { title, description } = DescriptionFormSchema.parse({
    title: _title,
    description: _description,
  });

  const content = { title, description, section_name: sectionName };

  const insertResponse = await db
    .insert(BasicSectionsTable)
    .values(content)
    .onConflictDoUpdate({
      target: BasicSectionsTable.section_name,
      set: { ...content },
    })
    .returning({
      title: BasicSectionsTable.title,
      description: BasicSectionsTable.description,
    });

  revalidateTag(sectionName);
  revalidatePath("/admin/cms/homepage");
  // revalidatePath("/");

  return { status: "success", data: insertResponse[0] };
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

export async function getHomepageDescriptionSection() {
  const data = await db
    .select()
    .from(BasicSectionsTable)
    .where(eq(BasicSectionsTable.section_name, "homepage_description"));

  return data[0] ?? null;
}

export const cachedHomepageDescriptionSection = unstable_cache(
  getHomepageDescriptionSection,
  ["homepage_description"],
  {
    tags: ["homepage", "homepage_description"],
  },
);
