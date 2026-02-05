import { ProblemView } from "@/components/problems/problem-view";
import { problems, languages } from "@/lib/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return problems.map((problem) => ({
    slug: problem.slug,
  }));
}

export default function ProblemPage({ params }: { params: { slug: string } }) {
  const problem = problems.find((p) => p.slug === params.slug);

  if (!problem) {
    notFound();
  }

  return <ProblemView problem={problem} languages={languages} />;
}
