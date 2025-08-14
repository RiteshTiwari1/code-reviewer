export interface CodeReviewInput {
  code_snippet: string;
  review_comments: string[];
}

export interface CommentAnalysis {
  originalComment: string;
  positiveRephrasing: string;
  technicalWhy: string;
  suggestedImprovement: string;
  codeExample?: string;
}

export interface ReviewReport {
  analyses: CommentAnalysis[];
  holistic_summary?: string;
}

export interface AIResponse {
  positive_rephrasing: string;
  technical_why: string;
  suggested_improvement: string;
  code_example?: string;
}