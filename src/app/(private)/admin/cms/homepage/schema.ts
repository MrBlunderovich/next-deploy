import { z } from "zod";

export const BannerFormSchema = z.object({
  title: z.string().min(1, {
    message: "Required.",
  }),
  image: z
    .any()
    .refine((file) => file instanceof File, "File is required.")
    .refine((file) => file?.size > 0, "File is required.")
    .refine(
      (file) => file?.type.startsWith("image/"),
      "Only image files are allowed.",
    ),
});
