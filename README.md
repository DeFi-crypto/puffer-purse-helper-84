# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/4f01dace-2e0e-4772-907c-102ca9fd5056

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4f01dace-2e0e-4772-907c-102ca9fd5056) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/4f01dace-2e0e-4772-907c-102ca9fd5056) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## SEO setup

The canonical domain is **https://minnyapparel.com**. Everything SEO-related is driven from one file, `src/lib/site.ts`:

- `PAGES`: each page's title, description and whether it is indexed. Add a page here when you add a route in `src/App.tsx`.
- `COMPANY_PROFILES`: official profile URLs (the `sameAs` list in the structured data). Add LinkedIn, Crunchbase, etc. as they go live.
- `FOUNDER`: fill in the name, bio, headshot and profiles to switch on the `/founder` page, the founder sentence on `/about`, and the Person markup. Nothing founder-related is published while the name is empty.

`vite build` prerenders every page to static HTML (`scripts/prerender-plugin.ts`) with its own title, canonical tag and JSON-LD, and writes `sitemap.xml` and a real `404.html`. `public/_redirects` sends `minnyapparel.netlify.app` to the real domain and has no catch-all, so unknown URLs return a true 404.
