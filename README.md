# STYLES TV — Static Site

This repository contains a static site (HTML/CSS/JS) ready for GitHub Pages deployment.

What I added
- GitHub Actions workflow: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
- `.nojekyll` to avoid Jekyll processing

How to deploy
1. Create a new GitHub repository and push your files to the `main` (or `master`) branch.
2. The workflow will run on push and publish the site to the `gh-pages` branch.
3. In your repository Settings → Pages, set the source to the `gh-pages` branch (root). Your site will be published at `https://<your-username>.github.io/<repo>`.

Quick commands (run from this project folder):

```powershell
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

Check Actions: go to the `Actions` tab on GitHub to watch the workflow run. After it finishes, visit the `Pages` settings to confirm the published URL.
