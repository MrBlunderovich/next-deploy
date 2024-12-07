import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignupForm from "./_components/SignupForm";
import AuthButton from "@/components/ui/auth/AuthButton.server";

export default function RegisterPage() {
  return (
    <div className="flex grow flex-col items-center justify-center gap-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>please</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
        <CardFooter>
          Already have an account?
          <AuthButton brief />
        </CardFooter>
      </Card>
    </div>
  );
}
