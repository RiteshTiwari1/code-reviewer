import OpenAI from 'openai';
import { AIResponse } from './types.js';

export class EmpathicAIClient {
  private openai: OpenAI;
  private model: string;

  constructor(apiKey: string, model?: string) {
    this.openai = new OpenAI({ apiKey });
    this.model = model || process.env.OPENAI_MODEL || 'gpt-4o-mini';
  }

  async transformComment(
    codeSnippet: string, 
    harshComment: string
  ): Promise<AIResponse> {
    const prompt = this.buildPrompt(codeSnippet, harshComment);
    
    try {
      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: "system", content: "You are an empathetic senior developer transforming harsh code review comments into constructive feedback." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 800
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from AI');
      }

      return this.parseAIResponse(content);
    } catch (error) {
      throw new Error('Failed to get AI response');
    }
  }

  private buildPrompt(codeSnippet: string, harshComment: string): string {
    return `Given this code snippet:
\`\`\`
${codeSnippet}
\`\`\`

Transform this harsh comment: "${harshComment}"

Respond in this format:

POSITIVE_REPHRASING: [Encouraging version of the feedback]
TECHNICAL_WHY: [Explain the underlying principle/best practice]
SUGGESTED_IMPROVEMENT: [Specific actionable advice]
CODE_EXAMPLE: [Concrete code example if applicable]

Be empathetic, educational, and professional.`;
  }

  private parseAIResponse(content: string): AIResponse {
    const positiveMatch = content.match(/POSITIVE_REPHRASING:\s*(.*?)(?=\n\n|\nTECHNICAL_WHY:|$)/s);
    const whyMatch = content.match(/TECHNICAL_WHY:\s*(.*?)(?=\n\n|\nSUGGESTED_IMPROVEMENT:|$)/s);
    const improvementMatch = content.match(/SUGGESTED_IMPROVEMENT:\s*(.*?)(?=\n\n|\nCODE_EXAMPLE:|$)/s);
    const codeMatch = content.match(/CODE_EXAMPLE:\s*(.*?)$/s);

    return {
      positive_rephrasing: positiveMatch?.[1]?.trim() || 'Great work! Here\'s a suggestion for improvement.',
      technical_why: whyMatch?.[1]?.trim() || 'This follows good software development practices.',
      suggested_improvement: improvementMatch?.[1]?.trim() || 'Consider applying standard best practices.',
      code_example: codeMatch?.[1]?.trim()
    };
  }
}