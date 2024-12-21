"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
// import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import FormWrapper from "./FormWrapper";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { editHomepageBanner } from "@/app/(private)/admin/cms/homepage/actions";
import { HomepageSectionContent } from "@/drizzle/schema";
import { BannerFormSchema } from "../schema";

export default function BannerForm({
  bannerData,
}: {
  bannerData: HomepageSectionContent | null;
}) {
  const [pending, setPending] = React.useState(false);
  // const router = useRouter();
  const form = useForm<z.infer<typeof BannerFormSchema>>({
    resolver: zodResolver(BannerFormSchema),
    defaultValues: {
      title: bannerData?.title || "",

      image: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof BannerFormSchema>) {
    setPending(true);
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
    }
  }

  return (
    <FormWrapper title="Banner Section">
      <div className="flex gap-4">
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

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(event) => {
                        const file = event.target?.files?.[0] ?? undefined;
                        field.onChange(file);
                      }}
                      accept="image/*"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={pending}>
              Submit {pending && <LoaderIcon className="animate-spin" />}
            </Button>
          </form>
        </Form>

        <Card className="relative flex-1">
          <Image
            className="object-contain object-center"
            src={bannerData?.image?.src || "/image_placeholder.png"}
            blurDataURL={bannerData?.image?.blurhash}
            alt=""
            fill
          />
        </Card>
      </div>
    </FormWrapper>
  );
}
