export const portfolioData = {
  about: {
    title: 'Software Engineer / AI Engineer',
    summary: 'Arvinth designs dependable AI, data, and backend systems that turn ambitious ideas into useful products.',
  },
  skills: {
    primary: ['Python', 'Java', 'React', 'FastAPI', 'Spring Boot', 'PostgreSQL', 'Docker'],
    ai: ['RAG', 'LLMs', 'Data Engineering', 'Computer Vision'],
  },
  projects: [
    { name: 'Synova', type: 'AI insurance platform', stack: ['React', 'FastAPI', 'RAG', 'pgvector'], description: 'Contextual insurance discovery paired with live provider data and human-friendly answers.' },
    { name: 'Canopy', type: 'Wildlife intelligence', stack: ['Python', 'Vision AI', 'Data'], description: 'Field-observation tools that turn environmental data into timely signals.' },
  ],
  experience: [
    { year: '2023', title: 'Engineering foundation', detail: 'Built a strong base in software, data, and product thinking.' },
    { year: '2025', title: 'Data & AI projects', detail: 'Delivered applied analytics and AI systems for real constraints.' },
    { year: 'NOW', title: 'Software Engineer', detail: 'Exploring dependable systems and intelligent interfaces.' },
  ],
  education: { summary: 'Continuous learning across software engineering, AI, and data systems.' },
  achievements: { summary: 'A growing body of production-minded AI and software projects.' },
} as const;

export type PortfolioTopic = keyof typeof portfolioData;

export function answerPortfolioQuestion(question: string) {
  const q = question.toLowerCase();
  if (q.includes('skill') || q.includes('tech')) return `Arvinth works with ${portfolioData.skills.primary.join(', ')}, with a focus on ${portfolioData.skills.ai.join(', ')}.`;
  if (q.includes('project') || q.includes('synova') || q.includes('canopy')) return `${portfolioData.projects[0].name} is ${portfolioData.projects[0].description} ${portfolioData.projects[1].name} builds ${portfolioData.projects[1].description.toLowerCase()}`;
  if (q.includes('experience') || q.includes('work')) return portfolioData.experience.map((item) => `${item.year}: ${item.title}.`).join(' ');
  if (q.includes('education') || q.includes('study')) return portfolioData.education.summary;
  return portfolioData.about.summary;
}
