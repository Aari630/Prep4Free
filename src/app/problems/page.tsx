import { ProblemTable } from "@/components/problems/problem-table";
import { problems } from "@/lib/data";

export default function ProblemsPage() {
  // In a real app, this would be an API call
  const allProblems = problems;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Problems</h1>
      <ProblemTable problems={allProblems} />
    </div>
  );
}
