export interface LocalizedString {
    en: string;
    fr: string;
}

export interface LocalizedStringArray {
    en: string[];
    fr: string[];
}

export interface Project {
    id: string;
    slug: string;
    title: LocalizedString;
    type?: LocalizedString;
    role?: LocalizedString;
    period?: string;
    subject?: LocalizedString;
    description?: LocalizedString;
    technologies: string[];
    media: {
        type: 'image' | 'video';
        src: string;
        alt?: LocalizedString;
    }[];
    company?: {
        name: LocalizedString;
        logo: string;
    };
    tasks?: LocalizedStringArray;
    links?: {
        github?: string | null;
        demo?: string | null;
        isPrivate?: boolean;
    };
    duration?: string;
    year?: string;
}

export interface BlogPost {
    id: string;
    slug: string;
    title: LocalizedString;
    description: LocalizedString;
    date: string;
    tags: string[];
    coverImage: string;
    htmlFile: string;
}
