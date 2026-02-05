export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type SubmissionStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'ACCEPTED'
  | 'WRONG_ANSWER'
  | 'TIME_LIMIT_EXCEEDED'
  | 'COMPILATION_ERROR'
  | 'RUNTIME_ERROR';

export interface Language {
  id: number;
  name: string;
  monacoId: string;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface Problem {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: Difficulty;
  boilerplateCode: string;
  testCases: TestCase[];
}

export interface Submission {
  id: string;
  sourceCode: string;
  status: SubmissionStatus;
  stdout?: string | null;
  stderr?: string | null;
  executionTime?: number | null;
  memoryUsed?: number | null;
  judge0Token: string;
  createdAt: string;
  userId: string;
  problemId: string;
  language: Language;
}
