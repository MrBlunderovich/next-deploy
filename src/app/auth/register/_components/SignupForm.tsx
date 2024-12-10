"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { createUser, signInAction } from "../../login/actions";
import { toast } from "sonner";

const FormSchema = z
  .object({
    invite: z.string().min(1, {
      message: "Required.",
    }),
    name: z.string().min(3, {
      message: "Must be 3+ chars long.",
    }),
    email: z.string().email({
      message: "Must be a valid email.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export default function SignupForm() {
  const [pending, setPending] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(false);
  // const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      invite: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true);
    try {
      console.log(data);

      const response = await createUser(data);
      const userId = response?.id;
      if (!userId) {
        console.log(response);
        throw new Error("Could not create user");
      }

      await signInAction("credentials", {
        email: data.email,
        password: data.password,
        redirectTo: "/",
      });
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="invite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invite Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordButtonWrapper
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                >
                  <Input {...field} type={hidePassword ? "password" : "text"} />
                </PasswordButtonWrapper>
              </FormControl>
              <FormDescription>6+ characters</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordButtonWrapper
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                >
                  <Input {...field} type={hidePassword ? "password" : "text"} />
                </PasswordButtonWrapper>
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
  );
}

type PasswordButtonProps = React.PropsWithChildren<{
  hidePassword: boolean;
  setHidePassword: React.Dispatch<React.SetStateAction<boolean>>;
}>;

function PasswordButtonWrapper({
  hidePassword,
  setHidePassword,
  children,
}: PasswordButtonProps) {
  return (
    <div className="relative flex items-center">
      {children}
      <Button
        className="absolute right-0"
        tabIndex={-1}
        type="button"
        variant={"link"}
        onClick={() => setHidePassword(!hidePassword)}
      >
        <Eye className={cn(hidePassword && "hidden")} />
        <EyeOff className={cn(!hidePassword && "hidden")} />
      </Button>
    </div>
  );
}
