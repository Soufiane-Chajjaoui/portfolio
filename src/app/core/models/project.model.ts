export interface Translation {
  en: string;
  fr: string;
}

export interface Media {
  type: 'image' | 'video';
  src: string;
  alt?: Translation;
}

export interface Project {
  id: string;
  slug: string;
  title: Translation;
  type?: Translation;
  role: Translation;
  period: string;
  subject: Translation;
  technologies: string[];
  media: Media[];
  description?: Translation;
  detailsUrl?: string;
  externalLink?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: Translation;
  description: Translation;
  date: string;
  tags: string[];
  coverImage: string;
  htmlFile: string;
  author?: string;
  readingTime?: number;
}

export interface SiteConfig {
  siteName: string;
  siteDescription: Translation;
  siteUrl: string;
  author: {
    name: string;
    email: string;
  };
  social?: {
    github?: string;
    linkedin?: string;
  };
}
