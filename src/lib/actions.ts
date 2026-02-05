"use server";

import { aiRefactor, type AIRefactorInput } from "@/ai/flows/ai-refactoring-tool";

export async function refactorCodeAction(
  input: AIRefactorInput
): Promise<{ refactoredCode?: string; error?: string }> {
  try {
    const result = await aiRefactor(input);
    return { refactoredCode: result.refactoredCode };
  } catch (e) {
    console.error(e);
    const error = e instanceof Error ? e.message : "An unexpected error occurred.";
    return { error };
  }
}
