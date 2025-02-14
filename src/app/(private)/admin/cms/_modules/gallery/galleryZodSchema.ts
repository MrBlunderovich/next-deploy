import { z } from "zod";

const ImageSchema = z.object({
  alt: z.string().optional(),
  file: z
    .any()
    .refine((file) => file instanceof File, "File is required.")
    .refine((file) => file?.size > 0, "File is required.")
    .refine(
      (file) => file?.type.startsWith("image/"),
      "Only image files are allowed.",
    ),
});

export const GalleryFormSchema = z.object({
  title: z.string().min(1, {
    message: "Required.",
  }),
  // images: ImageSchema.array().min(1, "At least one image is required"),
  images: z.array(ImageSchema).min(1, "At least one image is required"),
});
