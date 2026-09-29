export type KudmaliScriptType = 'devanagari' | 'roman' | 'bengali';

export type GeetCategory = 
  | 'Jhumur' 
  | 'Karam Geet' 
  | 'Sohrai / Bandna' 
  | 'Tusu Geet' 
  | 'Biha Geet' 
  | 'Sarhul / Baha' 
  | 'Domkach';

export interface KudmaliWordMeaning {
  word: string;
  transliteration: string;
  devanagari: string;
  bengali: string;
  englishMeaning: string;
  hindiMeaning: string;
  culturalNote?: string;
  exampleUsage?: string;
}

export interface GeetVerse {
  id: string;
  devanagari: [string, string];
  roman: [string, string];
  bengali: [string, string];
  meaning?: string;
}

export interface KudmaliGeet {
  id: string;
  title: {
    devanagari: string;
    roman: string;
    bengali: string;
  };
  poet: {
    devanagari: string;
    roman: string;
    bengali: string;
  };
  category: GeetCategory;
  taalOrSur: string; // e.g., 'Bhaduria Jhumur', 'Dahar Sur', 'Khemta', 'Lagani'
  region: string; // e.g., 'Purulia / Manbhum', 'Ranchi / Chotanagpur', 'Mayurbhanj'
  tags: string[];
  isFeatured?: boolean;
  isDailyGeet?: boolean;
  verses: GeetVerse[];
  culturalContext?: string;
  highlightWords?: Record<string, KudmaliWordMeaning>;
}

export interface KudmaliArticle {
  id: string;
  title: string;
  kudmaliTitle?: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  readTime: string;
  category: 'Festivals & Rituals' | 'Music & Mandar' | 'Language & Lipi' | 'History & Kudmi Heritage';
  excerpt: string;
  sections: Array<{
    heading: string;
    body: string;
    quote?: string;
  }>;
  tags: string[];
}

export interface KudmaliBlog {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  readTime: string;
  summary: string;
  content: string[];
  tags: string[];
  likes: number;
}

export interface KudmaliIcon {
  id: string;
  name: {
    devanagari: string;
    roman: string;
    bengali: string;
  };
  title: string; // e.g., 'Mahan Jhumuria', 'Kudmali Kobi'
  era: string;
  region: string;
  bio: string;
  contribution: string;
  famousGeetLine: {
    devanagari: string;
    roman: string;
    bengali: string;
  };
}

export interface Submission {
  id: string;
  title: string;
  authorName: string;
  type: 'geet' | 'article' | 'blog' | 'writing';
  category: string;
  script: KudmaliScriptType;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export type WritingType = 'poem' | 'story' | 'reflection' | 'essay';

export interface KudmaliWriting {
  id: string;
  title: string;
  kudmaliTitle?: string;
  type: WritingType;
  author: string;
  date: string;
  readTime: string;
  featuredImage?: string;
  originalText: string;
  romanTransliteration?: string;
  hindiTranslation?: string;
  englishTranslation?: string;
  culturalContext?: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface CulturalTopic {
  id: string;
  title: string;
  kudmaliTitle?: string;
  category: 'Festivals' | 'Traditions' | 'Dance & Music' | 'Food' | 'Attire' | 'Language & Lipi' | 'Sacred Spaces';
  image: string;
  summary: string;
  fullArticle: string[];
  keyHighlights: string[];
  relatedSongs?: string[];
  tags: string[];
}

export interface FestivalItem {
  id: string;
  name: string;
  kudmaliName: string;
  season: string;
  month: string;
  significance: string;
  image: string;
  history: string;
  traditionalPractices: string[];
  associatedSongs: Array<{
    title: string;
    description: string;
  }>;
  culturalWisdom: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Festivals' | 'Village Life' | 'Music & Instruments' | 'Art & Craft' | 'Ceremonies' | 'Nature';
  imageUrl: string;
  caption: string;
  location: string;
  credit?: string;
}

export interface TimelineMilestone {
  id: string;
  period: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Language' | 'Folk Songs' | 'Festivals' | 'Traditions' | 'Modern Revival';
  culturalNote: string;
}

export type AppView = 
  | 'home'
  | 'writings'
  | 'geet' 
  | 'culture'
  | 'festivals'
  | 'articles' 
  | 'blogs' 
  | 'gallery'
  | 'timeline'
  | 'poets' 
  | 'about'
  | 'submit' 
  | 'admin' 
  | 'login';
