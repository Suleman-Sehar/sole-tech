import { CaseStudy } from "@/types/portfolio";

// TODO: REPLACE WITH CMS OR DATABASE BACKED FETCH
// This is placeholder data for demonstration purposes only

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-customer-support-platform",
    title: "AI-Powered Customer Support Platform",
    category: "AI Applications",
    image: "/images/portfolio/Screenshot 2026-05-22 132031.jpg",
    overview: "Intelligent customer service automation reducing response times by 85% for a Fortune 500 retailer.",
    technologies: ["Natural Language Processing", "LLM Integration", "Node.js", "React", "PostgreSQL"],
    challenge: "A major retailer was struggling with overwhelming customer support volume, leading to long wait times and decreased customer satisfaction scores.",
    solution: "We implemented a multi-tier AI support system that handles 80% of routine inquiries automatically while intelligently escalating complex issues to human agents with full context.",
    results: [
      "85% reduction in average response time",
      "70% decrease in support costs",
      "94% customer satisfaction rating",
      "Handled 100k+ monthly conversations"
    ],
  },
  {
    slug: "autonomous-trading-agents",
    title: "Autonomous Trading Agent System",
    category: "Agentic Systems",
    image: "/images/portfolio/Animation06.gif",
    overview: "Multi-agent AI system for algorithmic trading with adaptive market strategies.",
    technologies: ["Python", "TensorFlow", "Reinforcement Learning", "Kafka", "AWS"],
    challenge: "Financial firm needed to compete with high-frequency trading firms while managing risk and regulatory compliance across multiple markets.",
    solution: "Built a distributed multi-agent system where each agent specializes in different market conditions, with a coordinator agent managing overall portfolio strategy and risk.",
    results: [
      "35% improvement in trading performance",
      "Reduced manual intervention by 90%",
      "Real-time compliance monitoring",
      "$2.5M in optimized portfolio value"
    ],
  },
  {
    slug: "document-processing-automation",
    title: "Intelligent Document Processing Pipeline",
    category: "Automation Platforms",
    image: "/images/portfolio/Animation07.gif",
    overview: "End-to-end document processing automation for legal firm handling thousands of contracts.",
    technologies: ["OCR", "Computer Vision", "FastAPI", "Docker", "Redis"],
    challenge: "Law firm was spending 200+ hours monthly on manual document review and data extraction across complex legal contracts.",
    solution: "Created an automated pipeline that extracts key clauses, identifies risks, and generates summaries while integrating with existing document management systems.",
    results: [
      "90% time reduction in document review",
      "99.5% extraction accuracy",
      "400+ documents processed daily",
      "Saved 500+ monthly staff hours"
    ],
  },
  {
    slug: "ai-resource-planning-platform",
    title: "AI Resource Planning SaaS",
    category: "SaaS Solutions",
    image: "/images/portfolio/Screenshot 2026-05-22 132135.jpg",
    overview: "Cloud-based resource optimization platform using predictive analytics for enterprise planning.",
    technologies: ["React", "Next.js", "Machine Learning", "Stripe", "Supabase"],
    challenge: "Large enterprise needed better resource allocation across hundreds of projects and teams with varying skill requirements.",
    solution: "Built a SaaS platform that predicts resource needs, identifies skill gaps, and optimizes team allocation using historical data and ML forecasts.",
    results: [
      "25% improvement in resource utilization",
      "30+ enterprise clients onboarded",
      "$1.2M in annual client savings",
      "99.9% platform uptime"
    ],
  },
  {
    slug: "healthcare-diagnosis-assistant",
    title: "Medical Diagnosis AI Assistant",
    category: "AI Applications",
    // TODO: No matching portfolio image found - placeholder kept
    image: "/images/portfolio/Screenshot 2026-05-22 132031.jpg",
    overview: "Clinical decision support system assisting doctors with diagnostic recommendations.",
    technologies: ["Computer Vision", "PyTorch", "HIPAA Compliance", "FastAPI", "FHIR"],
    challenge: "Hospital needed to reduce diagnostic errors and improve triage efficiency while maintaining strict patient privacy requirements.",
    solution: "Developed a HIPAA-compliant AI system that analyzes medical images and patient data to provide diagnostic suggestions with confidence scores.",
    results: [
      "45% reduction in diagnostic errors",
      "60% faster triage decisions",
      "Deployed across 15 medical facilities",
      "Improved patient outcomes by 22%"
    ],
  },
  {
    slug: "supply-chain-optimization",
    title: "Supply Chain Multi-Agent System",
    category: "Agentic Systems",
    // TODO: No matching portfolio image found - placeholder kept
    image: "/images/portfolio/Screenshot 2026-05-22 132135.jpg",
    overview: "Autonomous supply chain agents coordinating inventory, logistics, and demand forecasting.",
    technologies: ["Agentic AI", "IoT Integration", "Kubernetes", "Go", "MongoDB"],
    challenge: "Global manufacturer faced supply chain disruptions and inefficient inventory management costing millions annually.",
    solution: "Implemented autonomous agents for suppliers, warehouses, and logistics partners that negotiate, coordinate, and adapt to market changes in real-time.",
    results: [
      "30% inventory cost reduction",
      "50% fewer supply chain disruptions",
      "Real-time visibility across 500+ suppliers",
      "$15M annual cost savings"
    ],
  },
];