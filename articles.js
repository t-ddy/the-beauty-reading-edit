// ADD, EDIT OR REMOVE RECOMMENDATIONS HERE. The site updates automatically.
// - Add: copy one block, give it a new unique id, fill in every field.
// - Edit: change the text in place.  - Remove: delete the whole { ... } block.
// category must be one of the names in `categories` below.
// coverImage: a URL or a file in /public (e.g. "/covers/my-read.jpg"). Leave "" for a placeholder.
// originalUrl: the real Substack link. Leave "" until you have it (shows no link).
// sample: true marks placeholder content. Delete this line on real entries.

export const categories = ['Skincare', 'Makeup', 'Beauty Culture', 'Beauty Trends', 'Personal Care', 'Lifestyle']

const base = {
  author: 'Author name', publication: 'Publication name', originalUrl: '', coverImage: '',
  whyRecommend: 'Sample note: write a sentence or two on why this read stayed with you.', sample: true,
}

export const articles = [
  { ...base, id: 1, title: 'Sample read: A skincare routine, reconsidered', category: 'Skincare', dateAdded: '2026-11-08', featured: true,
    shortDescription: 'Sample description. Summarize the article in your own words, in a sentence or two.' },
  { ...base, id: 2, title: 'Sample read: The history of a lipstick shade', category: 'Makeup', dateAdded: '2026-11-07', featured: true,
    shortDescription: 'Sample description. Summarize the article in your own words, in a sentence or two.' },
  { ...base, id: 3, title: 'Sample read: Who decides what beautiful means', category: 'Beauty Culture', dateAdded: '2026-11-06', featured: true,
    shortDescription: 'Sample description. Summarize the article in your own words, in a sentence or two.' },
  { ...base, id: 4, title: 'Sample read: Notes on a viral beauty trend', category: 'Beauty Trends', dateAdded: '2026-11-05', featured: true,
    shortDescription: 'Sample description. Summarize the article in your own words, in a sentence or two.' },
  { ...base, id: 5, title: 'Sample read: Slow mornings and small rituals', category: 'Personal Care', dateAdded: '2026-11-04', featured: false,
    shortDescription: 'Sample description. Summarize the article in your own words, in a sentence or two.' },
  { ...base, id: 6, title: 'Sample read: Getting dressed as a creative act', category: 'Lifestyle', dateAdded: '2026-11-03', featured: false,
    shortDescription: 'Sample description. Summarize the article in your own words, in a sentence or two.' },
]
