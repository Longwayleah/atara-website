/** GROQ queries — expand as CMS content grows */

export const productListQuery = `
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    tagline,
    "image": mainImage.asset->url
  }
`;

export const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    tagline,
    description,
    "image": mainImage.asset->url
  }
`;

export const journalListQuery = `
  *[_type == "journalPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "image": coverImage.asset->url
  }
`;
