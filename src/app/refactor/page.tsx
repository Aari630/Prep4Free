import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RefactorForm } from "@/components/refactor/refactor-form";

export default function RefactorPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">AI-Assisted Refactoring</CardTitle>
            <CardDescription>
              Improve your code's quality, maintainability, and readability.
              Enter your code, describe the changes you want, and let our AI
              do the heavy lifting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RefactorForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
