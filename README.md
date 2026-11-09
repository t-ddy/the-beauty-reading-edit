# The Beauty Reading Edit

## Run locally
1. Install Node.js 18+.
2. `npm install`
3. `npm run dev` and open the address it prints.

## Add, edit, remove reads
Open `src/data/articles.js`. Copy a block, give it a new unique `id`, fill in the fields (use a real `originalUrl`, delete `sample: true`), save. Edit text in place. Delete a block to remove it. `featured: true` puts it in "Currently on My Reading List" (first 4, newest first). Put cover images in `public/covers/` and set `coverImage: '/covers/name.jpg'` (compress to ~1200px wide).

## Deploy with GitHub + Netlify
1. Create a GitHub repo and push this folder (add `node_modules` and `dist` to `.gitignore`).
2. In Netlify: Add new site, Import from Git, choose the repo.
3. Build command `npm run build`, publish directory `dist`. Deploy.
Every push to GitHub redeploys the site.

## Still to personalize
Social links (`social` in `src/App.jsx`), About portrait, and a real newsletter form only if you connect a service.
