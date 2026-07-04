export type CaseStudyCategory = "AI Applications" | "Agentic Systems" | "Automation Platforms" | "SaaS Solutions";

export interface CaseStudy {
  slug: string;
  title: string;
  category: CaseStudyCategory;
  image: string;
  overview: string;
  technologies: string[];
  challenge: string;
  solution: string;
  results: string[];
}