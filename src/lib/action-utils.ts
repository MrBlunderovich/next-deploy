import sharp from "sharp";
import fs from "fs";
import path from "path";

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

function cleanUpFiles(directory: string, prefix: string): void {
  const files = fs.readdirSync(directory); // Read all files in the directory

  files.forEach((file) => {
    if (file.startsWith(prefix)) {
      const filePath = path.join(directory, file);
      fs.unlinkSync(filePath); // Delete the file
      console.log(`Deleted: ${filePath}`);
    }
  });
}

export async function saveImage(file: File, prefix: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadsDir = path.join(process.cwd(), "media"); // Ensure this folder exists
  //FIX_ME: check file extension
  const extension = path.extname(file.name);
  const fileName = `${prefix}_${Date.now()}${extension}`;
  const filePath = path.join(uploadsDir, fileName);
  const relativePath = "/" + path.relative(process.cwd(), filePath);

  /*  if (relativePath.startsWith("public")) {
    relativePath = relativePath.replace("public", "");
  } */

  cleanUpFiles(uploadsDir, prefix);

  await fs.promises.writeFile(filePath, buffer);

  const blurhash = await generateBase64Thumbnail(file);

  return { success: true, filePath: relativePath, fileName, blurhash };
}
