#!/usr/bin/env node

import 'dotenv/config';
import { Command } from 'commander';
import { readFileSync } from 'fs';
import { EmpathicAIClient } from './ai-client.js';
import { MarkdownFormatter } from './formatter.js';
import { CodeReviewInput, CommentAnalysis, ReviewReport } from './types.js';

const program = new Command();

program
  .name('empathetic-code-reviewer')
  .description('Transform harsh code review comments into empathetic, educational feedback')
  .version('1.0.0')
  .argument('<input>', 'JSON file containing code snippet and review comments')
  .option('-k, --api-key <key>', 'OpenAI API key (or set OPENAI_API_KEY env var)')
  .option('-m, --model <model>', 'AI model to use (or set OPENAI_MODEL env var)')
  .action(async (inputFile: string, options) => {
    try {
      await processCodeReview(inputFile, options);
    } catch (error) {
      console.error(MarkdownFormatter.formatError(error instanceof Error ? error.message : 'Unknown error'));
      process.exit(1);
    }
  });

async function processCodeReview(inputFile: string, options: { apiKey?: string; model?: string }) {
  const apiKey = options.apiKey || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OpenAI API key is required. Use --api-key option or set OPENAI_API_KEY environment variable.');
  }

  const model = options.model || process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const inputData = readInputFile(inputFile);
  validateInput(inputData);
  const aiClient = new EmpathicAIClient(apiKey, model);
  const analyses: CommentAnalysis[] = [];
  
  console.error('🔄 Processing comments...');
  
  for (let i = 0; i < inputData.review_comments.length; i++) {
    const comment = inputData.review_comments[i];
    console.error(`   Analyzing comment ${i + 1}/${inputData.review_comments.length}`);
    
    try {
      const aiResponse = await aiClient.transformComment(inputData.code_snippet, comment);
      analyses.push({
        originalComment: comment,
        positiveRephrasing: aiResponse.positive_rephrasing,
        technicalWhy: aiResponse.technical_why,
        suggestedImprovement: aiResponse.suggested_improvement,
        codeExample: aiResponse.code_example
      });
    } catch (error) {
      throw error;
    }
  }

  console.error('🔄 Generating summary...');
  const holisticSummary = await generateHolisticSummary(aiClient, inputData, analyses, model);

  const report: ReviewReport = {
    analyses,
    holistic_summary: holisticSummary
  };

  console.log(MarkdownFormatter.formatReport(report));
  console.error('✅ Complete!');
}

function readInputFile(filePath: string): CodeReviewInput {
  try {
    const fileContent = readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      throw new Error(`File not found: ${filePath}`);
    }
    throw new Error(`Invalid JSON file: ${filePath}`);
  }
}

function validateInput(data: any): asserts data is CodeReviewInput {
  if (!data || typeof data !== 'object') {
    throw new Error('Input must be a JSON object');
  }
  
  if (!data.code_snippet || typeof data.code_snippet !== 'string') {
    throw new Error('Missing "code_snippet" field');
  }
  
  if (!data.review_comments || !Array.isArray(data.review_comments) || data.review_comments.length === 0) {
    throw new Error('Missing "review_comments" array');
  }
  
  if (!data.review_comments.every((comment: any) => typeof comment === 'string')) {
    throw new Error('All review comments must be strings');
  }
}

async function generateHolisticSummary(
  aiClient: EmpathicAIClient, 
  inputData: CodeReviewInput, 
  analyses: CommentAnalysis[],
  model: string
): Promise<string> {
  const fallbackSummary = "Overall, this shows solid programming fundamentals with great potential for optimization. Keep up the excellent work and continue applying these best practices!";
  
  try {
    const themes = analyses.map(a => a.technicalWhy).join(' | ');
    const summaryPrompt = `Provide a brief, encouraging summary (2-3 sentences) for this code review:

Improvement themes: ${themes}
Comments: ${inputData.review_comments.join(', ')}

Just the summary text:`;

    const response = await aiClient['openai'].chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: "You are an empathetic senior developer providing encouraging feedback." },
        { role: "user", content: summaryPrompt }
      ],
      temperature: 0.8,
      max_tokens: 150
    });

    return response.choices[0]?.message?.content?.trim() || fallbackSummary;
  } catch {
    return fallbackSummary;
  }
}

process.on('unhandledRejection', (reason) => {
  console.error(MarkdownFormatter.formatError(`Unhandled error: ${reason}`));
  process.exit(1);
});

program.parse();