"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { editHomepageBanner } from "@/app/(private)/admin/cms/homepage/actions";
import { HomepageSectionContent } from "@/drizzle/schema";
import { GalleryFormSchema } from "./galleryZodSchema";
import FormWrapper from "@/components/ui/FormWrapper";
import Image from "next/image";
import { editHomepageGallery } from "./galleryActions";

export default function GalleryForm({
  sectionName,
  data,
}: {
  sectionName: string;
  data: HomepageSectionContent | null;
}) {
  const [pending, setPending] = React.useState(false);
  const form = useForm<z.infer<typeof GalleryFormSchema>>({
    resolver: zodResolver(GalleryFormSchema),
    defaultValues: {
      title: data?.title || "",
      images: [{ alt: "", file: undefined }],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: form.control,
      name: "images",
    },
  );

  async function onSubmit(data: z.infer<typeof GalleryFormSchema>) {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data.title);
    const images = data.images;
    images.forEach((image) => {
      formData.append("images", image.file);
      formData.append("alt", image.alt || "");
    });

    editHomepageGallery(formData);

    /* setPending(true);
    try {
      console.log(data);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("image", data.image);
      const response = await editHomepageBanner(formData);
      console.log(response, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>response");
    } catch (error: any) {
      if (error?.message === "NEXT_REDIRECT") {
        throw error;
      }
      console.error(error);
      console.log(error?.message);
      if (error?.message) {
        toast.error(error.message);
      }
    } finally {
      setPending(false);
    } */
  }

  return (
    <FormWrapper title={sectionName}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormLabel className="mt-4">Images:</FormLabel>

          {fields.map((field, index) => (
            <Card className="flex flex-col gap-4 p-4" key={field.id}>
              <div className="flex gap-4 *:flex-1">
                <div className="Subform">
                  <FormField
                    control={form.control}
                    name={`images.${index}.alt`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alt</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-end gap-4">
                    <FormField
                      control={form.control}
                      name={`images.${index}.file`}
                      render={({ field }) => (
                        <FormItem className="grow">
                          <FormLabel>Image</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              onChange={(event) => {
                                const file =
                                  event.target?.files?.[0] ?? undefined;
                                field.onChange(file);
                              }}
                              accept="image/*"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      //  disabled={fields.length === 1}
                      className="text-red-500"
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <Image
                    className="object-contain object-center"
                    src={data?.image?.src || "/image_placeholder.png"}
                    // placeholder="blur"
                    // blurDataURL={data?.image?.blurhash || ""}
                    alt=""
                    fill
                  />
                </div>
              </div>
            </Card>
          ))}
          <Button
            //  disabled={fields.length === 1}
            className="w-auto text-green-500"
            variant="outline"
            size="icon"
            type="button"
            onClick={() =>
              append({
                alt: "",
                //@ts-expect-error
                file: undefined,
              })
            }
          >
            +
          </Button>

          <Button type="submit" disabled={pending}>
            Submit {pending && <LoaderIcon className="animate-spin" />}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}
