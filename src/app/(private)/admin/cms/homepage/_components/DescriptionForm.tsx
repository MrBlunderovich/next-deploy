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
import FormWrapper from "../../../../../../components/ui/FormWrapper";
import {
  editBasicSection,
  editHomepageBanner,
} from "@/app/(private)/admin/cms/homepage/actions";
import { SelectBasicSection } from "@/drizzle/schema";
import { DescriptionFormSchema } from "../schema";
import { Textarea } from "@/components/ui/textarea";

export default function DescriptionForm({
  descriptionData,
}: {
  descriptionData: SelectBasicSection | null;
}) {
  const [pending, setPending] = React.useState(false);
  // const router = useRouter();
  const form = useForm<z.infer<typeof DescriptionFormSchema>>({
    resolver: zodResolver(DescriptionFormSchema),
    defaultValues: {
      title: descriptionData?.title || "",
      description: descriptionData?.description || "",
    },
  });

  async function onSubmit(data: z.infer<typeof DescriptionFormSchema>) {
    setPending(true);
    try {
      console.log(data);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("section_name", data.title);
      formData.append("description", data.description);
      const response = await editBasicSection("homepage_description", formData);
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
    <FormWrapper title="Description Section">
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={10} {...field} />
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
      </div>
    </FormWrapper>
  );
}
