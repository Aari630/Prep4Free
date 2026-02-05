'use server';

/**
 * @fileOverview An AI-powered code refactoring tool.
 *
 * - aiRefactor - A function that handles the code refactoring process.
 * - AIRefactorInput - The input type for the aiRefactor function.
 * - AIRefactorOutput - The return type for the aiRefactor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIRefactorInputSchema = z.object({
  sourceCode: z
    .string()
    .describe('The source code to be refactored.'),
  fileType: z.string().describe('The file type of the source code.'),
  description: z.string().describe('The description of the intended changes.'),
});
export type AIRefactorInput = z.infer<typeof AIRefactorInputSchema>;

const AIRefactorOutputSchema = z.object({
  refactoredCode: z.string().describe('The refactored source code.'),
});
export type AIRefactorOutput = z.infer<typeof AIRefactorOutputSchema>;

export async function aiRefactor(input: AIRefactorInput): Promise<AIRefactorOutput> {
  return aiRefactorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiRefactorPrompt',
  input: {schema: AIRefactorInputSchema},
  output: {schema: AIRefactorOutputSchema},
  prompt: `You are an AI-powered code refactoring tool. You will receive source code, its file type, and a description of the intended changes. Your goal is to refactor the code to improve its quality, maintainability, and readability, while ensuring it functions as intended. 

Source Code:
\`\`\`{{{fileType}}}
{{{sourceCode}}}
\`\`\`

Description of changes:
{{{description}}}

Refactored Code:`, 
});

const aiRefactorFlow = ai.defineFlow(
  {
    name: 'aiRefactorFlow',
    inputSchema: AIRefactorInputSchema,
    outputSchema: AIRefactorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
