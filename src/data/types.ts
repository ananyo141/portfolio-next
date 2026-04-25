export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  tech: string[];
  github?: string;
  live?: string;
  featured: boolean;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  description: string;
  tags: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
  highlight?: boolean;
}

export interface ContactInfo {
  email: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    rss: string;
  };
}
