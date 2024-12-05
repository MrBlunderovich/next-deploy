import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignupForm from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex grow flex-col items-center justify-center gap-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Present yourself</CardTitle>
          <CardDescription>...please</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}
