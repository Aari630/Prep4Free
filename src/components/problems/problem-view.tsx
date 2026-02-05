"use client";

import React, { useState } from "react";
import type { Problem, Language, SubmissionStatus } from "@/lib/types";
import { CodeEditor } from "./code-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle2,
  XCircle,
  Loader,
  AlertTriangle,
  Clock,
  HardDrive,
} from "lucide-react";
import { Badge } from "../ui/badge";

type SubmissionResult = {
  status: SubmissionStatus;
  output: string | null;
  executionTime: number | null;
  memoryUsed: number | null;
};

export function ProblemView({
  problem,
  languages,
}: {
  problem: Problem;
  languages: Language[];
}) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    languages[0]
  );
  const [code, setCode] = useState(problem.boilerplateCode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);

  const { toast } = useToast();

  const handleLanguageChange = (languageId: string) => {
    const lang = languages.find((l) => l.id.toString() === languageId);
    if (lang) {
      setSelectedLanguage(lang);
    }
  };

  const pollSubmission = async (token: string): Promise<SubmissionResult> => {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        try {
          // This is a mock API call that simulates polling Judge0
          const statuses: SubmissionStatus[] = ["PROCESSING", "PROCESSING", "ACCEPTED", "WRONG_ANSWER"];
          const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
          
          const isProcessing = randomStatus === "PROCESSING"; // Mock processing state

          if (!isProcessing) {
             clearInterval(interval);
            const mockResult = {
              status: randomStatus,
              output: randomStatus === 'ACCEPTED' ? "All test cases passed!" : "Test case #3 failed: Expected 6, got 5",
              executionTime: Math.random() * 2,
              memoryUsed: Math.random() * 5000 + 1000,
            }
            resolve(mockResult);
          } else {
             setSubmissionResult({ status: 'PROCESSING', output: null, executionTime: null, memoryUsed: null });
          }
        } catch (error) {
          clearInterval(interval);
          reject(error);
        }
      }, 2000);
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionResult({ status: 'PENDING', output: null, executionTime: null, memoryUsed: null });

    try {
       // This is a mock API call to initiate the submission
      const submissionToken = `token-${Date.now()}`;
      
      toast({
        title: "Submission Received",
        description: "Your code is being evaluated. Please wait.",
      });

      const result = await pollSubmission(submissionToken);
      setSubmissionResult(result);
      
      toast({
        title: `Submission ${result.status.replace('_', ' ')}`,
        variant: result.status === 'ACCEPTED' ? 'default' : 'destructive',
        className: result.status === 'ACCEPTED' ? 'bg-green-600/10 border-green-600' : ''
      });

    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setSubmissionResult(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ResultIcon = () => {
    if (!submissionResult) return null;
    switch (submissionResult.status) {
      case "PENDING":
      case "PROCESSING":
        return <Loader className="h-6 w-6 animate-spin text-blue-500" />;
      case "ACCEPTED":
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case "WRONG_ANSWER":
        return <XCircle className="h-6 w-6 text-red-500" />;
      case "TIME_LIMIT_EXCEEDED":
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case "COMPILATION_ERROR":
      case "RUNTIME_ERROR":
        return <AlertTriangle className="h-6 w-6 text-orange-500" />;
      default:
        return null;
    }
  };
  
  const statusTextMap: Record<SubmissionStatus, string> = {
    PENDING: "Pending...",
    PROCESSING: "Processing...",
    ACCEPTED: "Accepted",
    WRONG_ANSWER: "Wrong Answer",
    TIME_LIMIT_EXCEEDED: "Time Limit Exceeded",
    COMPILATION_ERROR: "Compilation Error",
    RUNTIME_ERROR: "Runtime Error",
  };
  
  const statusColorMap: Record<SubmissionStatus, string> = {
    PENDING: "text-blue-500",
    PROCESSING: "text-blue-500",
    ACCEPTED: "text-green-500",
    WRONG_ANSWER: "text-red-500",
    TIME_LIMIT_EXCEEDED: "text-yellow-500",
    COMPILATION_ERROR: "text-orange-500",
    RUNTIME_ERROR: "text-orange-500",
  };

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      {/* Left Panel: Problem Description */}
      <Card className="overflow-y-auto">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <Badge
                variant={problem.difficulty === 'EASY' ? 'secondary' : problem.difficulty === 'MEDIUM' ? 'outline' : 'destructive'}
                className={problem.difficulty === 'EASY' ? 'text-green-600 border-green-600' : problem.difficulty === 'MEDIUM' ? 'text-yellow-600 border-yellow-600' : 'text-red-600 border-red-600'}
            >
                {problem.difficulty}
            </Badge>
          </div>
          <div className="prose prose-invert max-w-none font-body">
            <pre className="whitespace-pre-wrap font-body text-sm">{problem.description}</pre>
          </div>
        </CardContent>
      </Card>

      {/* Right Panel: Code Editor and Submission */}
      <div className="flex flex-col gap-4">
        <div className="flex-1 flex flex-col min-h-0">
          <Card className="flex-1 flex flex-col">
            <div className="p-2 border-b">
              <Select
                value={selectedLanguage.id.toString()}
                onValueChange={handleLanguageChange}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.id} value={lang.id.toString()}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 relative">
              <CodeEditor
                language={selectedLanguage.monacoId}
                value={code}
                onChange={(value) => setCode(value || "")}
              />
            </div>
          </Card>
        </div>
        <div className="flex flex-col gap-4">
          <Card>
            <CardContent className="p-4">
                {submissionResult ? (
                    <div className="flex items-center gap-4">
                        <ResultIcon />
                        <div className="flex-1">
                            <p className={`font-bold text-lg ${statusColorMap[submissionResult.status]}`}>
                                {statusTextMap[submissionResult.status]}
                            </p>
                            {submissionResult.status !== 'PENDING' && submissionResult.status !== 'PROCESSING' && (
                                <>
                                    <p className="text-sm text-muted-foreground">{submissionResult.output}</p>
                                    <div className="flex items-center gap-4 text-sm mt-2 text-muted-foreground">
                                        {submissionResult.executionTime != null && (
                                            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {submissionResult.executionTime.toFixed(2)}s</span>
                                        )}
                                        {submissionResult.memoryUsed != null && (
                                            <span className="flex items-center gap-1"><HardDrive className="h-4 w-4" /> {(submissionResult.memoryUsed / 1024).toFixed(2)} MB</span>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-muted-foreground text-sm">Submit your code to see the results.</p>
                )}
            </CardContent>
          </Card>
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Run Code
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
