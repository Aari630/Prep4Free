import Link from "next/link";
import type { Problem } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const difficultyVariantMap = {
  EASY: "secondary",
  MEDIUM: "outline",
  HARD: "destructive",
} as const;

export function ProblemTable({ problems }: { problems: Problem[] }) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80%]">Title</TableHead>
            <TableHead>Difficulty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((problem) => (
            <TableRow key={problem.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/problems/${problem.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {problem.title}
                </Link>
              </TableCell>
              <TableCell>
                <Badge
                  variant={difficultyVariantMap[problem.difficulty]}
                  className={cn({
                    "text-green-600 border-green-600": problem.difficulty === 'EASY',
                    "text-yellow-600 border-yellow-600": problem.difficulty === 'MEDIUM',
                    "text-red-600 border-red-600": problem.difficulty === 'HARD',
                  })}
                >
                  {problem.difficulty}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
