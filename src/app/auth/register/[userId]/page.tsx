import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OTPForm from "./_components/OTPForm";

export default function SignupConfirmPage() {
  return (
    <div className="flex grow flex-col items-center justify-center gap-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Enter code</CardTitle>
          <CardDescription>from the mailbox</CardDescription>
        </CardHeader>
        <CardContent>
          <OTPForm />
        </CardContent>
      </Card>
    </div>
  );
}
