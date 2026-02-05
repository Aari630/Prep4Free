"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { refactorCodeAction } from "@/lib/actions";
import { Loader, Wand2 } from "lucide-react";
import { CodeEditor } from "@/components/problems/code-editor";

const refactorSchema = z.object({
  sourceCode: z.string().min(10, "Source code must be at least 10 characters."),
  fileType: z.string().min(1, "File type is required."),
  description: z.string().min(10, "Description must be at least 10 characters."),
});

type RefactorFormInputs = z.infer<typeof refactorSchema>;

export function RefactorForm() {
  const [isRefactoring, setIsRefactoring] = useState(false);
  const [refactoredCode, setRefactoredCode] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<RefactorFormInputs>({
    resolver: zodResolver(refactorSchema),
    defaultValues: {
      sourceCode: "",
      fileType: "javascript",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<RefactorFormInputs> = async (data) => {
    setIsRefactoring(true);
    setRefactoredCode(null);
    try {
      const result = await refactorCodeAction(data);
      if (result.error) {
        throw new Error(result.error);
      }
      setRefactoredCode(result.refactoredCode || "");
      toast({
        title: "Refactoring Complete",
        description: "Your code has been successfully refactored by the AI.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        title: "Refactoring Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsRefactoring(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="sourceCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source Code</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste your code here..."
                  className="min-h-[200px] font-code"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="fileType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File Type / Language</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., javascript, python, java" {...field} />
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
                <FormLabel>Description of Changes</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 'Refactor to use async/await', 'Improve readability'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isRefactoring}>
          {isRefactoring ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Refactor Code
        </Button>
      </form>
      
      {(isRefactoring || refactoredCode) && (
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Refactored Code</h3>
            <div className="rounded-md border h-[400px] relative">
              {isRefactoring && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
                  <Loader className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              {refactoredCode && (
                  <CodeEditor 
                      language={form.getValues("fileType")}
                      value={refactoredCode}
                      onChange={() => {}}
                  />
              )}
            </div>
        </div>
      )}
    </Form>
  );
}
