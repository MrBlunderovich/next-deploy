"use server";

import { db } from "@/drizzle/db";
import { HomepageSectionsTable } from "@/drizzle/schema";

import { writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

async function generateBase64Thumbnail(file: File): Promise<string> {
  // Convert File to a Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Get image metadata to calculate proper dimensions
  const metadata = await sharp(buffer).metadata();
  const aspectRatio = metadata.width! / metadata.height!;

  // Determine final dimensions (maximum dimension = 10)
  let width = 10;
  let height = 10;
  if (aspectRatio > 1) {
    // Landscape image: width > height
    height = Math.round(width / aspectRatio);
  } else {
    // Portrait or square image: height >= width
    width = Math.round(height * aspectRatio);
  }

  // Resize the image while preserving aspect ratio
  const resizedBuffer = await sharp(buffer)
    .resize(width, height, { fit: "inside" })
    .toBuffer();

  // Convert resized image to base64
  const base64Thumbnail = `data:image/png;base64,${resizedBuffer.toString("base64")}`;

  return base64Thumbnail;
}

async function saveFile(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  //FIX_ME: check file extension

  const uploadsDir = path.join(process.cwd(), "public", "back_media"); // Ensure this folder exists
  //FIX_ME: sanitize file name
  const filePath = path.join(uploadsDir, file.name);

  await writeFile(filePath, buffer);

  const base64Thumbnail = await generateBase64Thumbnail(file);

  return { success: true, filePath, base64Thumbnail };
}

export async function editHomepageBanner(formData: FormData) {
  //FIX_ME: zod
  const title = formData.get("title");
  const image = formData.get("image");

  if (typeof title !== "string" || !(image instanceof File)) return;

  const content = { title, image };
  console.log(content, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>content");
  const response = await saveFile(image);
  const { filePath } = response;
  console.log(filePath, "------------------------filePath");
  console.log(response, "------------------------response");

  return;

  /* await db
      .insert(HomepageSectionsTable)
      .values({ id: 'banner', content })
      .onConflictDoUpdate({
        target: HomepageSectionsTable.id,
        set: { content },
      }); */
}
