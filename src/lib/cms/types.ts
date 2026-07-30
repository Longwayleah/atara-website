export interface CMSProduct {
  _id: string;
  title: string;
  slug: { current: string };
  tagline?: string;
  description?: string;
  image?: string;
}

export interface CMSJournalPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  image?: string;
}

export interface CMSPage {
  _id: string;
  title: string;
  slug: { current: string };
  sections?: unknown[];
}
