import { CommentAnalysis, ReviewReport } from './types.js';

export class MarkdownFormatter {
  static formatReport(report: ReviewReport): string {
    let output = '# Empathetic Code Review Analysis\n\n';
    
    report.analyses.forEach((analysis, index) => {
      output += this.formatAnalysis(analysis, index + 1);
      output += '\n---\n\n';
    });

    if (report.holistic_summary) {
      output += '## Overall Summary\n\n';
      output += report.holistic_summary + '\n\n';
    }

    output += '*🤖 Generated with Empathetic Code Reviewer - Transforming Critical Feedback into Constructive Growth*';
    
    return output;
  }

  private static formatAnalysis(analysis: CommentAnalysis, index: number): string {
    let section = `### Analysis ${index}: "${analysis.originalComment}"\n\n`;
    
    section += `**✨ Positive Rephrasing:** ${analysis.positiveRephrasing}\n\n`;
    
    section += `**🔍 The 'Why':** ${analysis.technicalWhy}\n\n`;
    
    section += `**💡 Suggested Improvement:** ${analysis.suggestedImprovement}\n\n`;
    
    if (analysis.codeExample) {
      section += '**📝 Code Example:**\n';
      section += '```\n';
      section += analysis.codeExample;
      section += '\n```\n\n';
    }
    
    return section;
  }

  static formatError(error: string): string {
    return `# ❌ Error\n\n${error}\n\nPlease check your input and try again.`;
  }
}