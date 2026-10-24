# Elena Ishchenko — website

The website is plain files edited with the **Lena CMS** desktop app (macOS) and served by GitHub Pages.

```
content/            source, edited by the app
  site.json         title, description, home page, footer, address
  menu.json         menu items: pages and external links, in order
  style.css         global CSS
  pages/*.md        one markdown file per page (title in the frontmatter)
  assets/           images used by pages
docs/               generated website, served by GitHub Pages — do not edit by hand
app/                source of the desktop app
```

## Editing the website

1. Download the latest `Lena-CMS-*.dmg` from [Releases](../../releases) and drag the app to Applications.
   The app is not notarized by Apple: the first time it is blocked, open
   System Settings → Privacy & Security and click **Open Anyway**.
2. Create a [fine-grained personal access token](https://github.com/settings/personal-access-tokens/new)
   with access to this repository only and the permission **Contents: Read and write**.
3. Start the app and enter the repository URL and the token. Both are stored in the macOS Keychain.
4. Edit pages, the menu, styles and settings. Changes are saved on this Mac as you type.
5. Press **Commit**: the app rebuilds `docs/`, commits `content/` and `docs/` and pushes to GitHub.
   GitHub Pages publishes the change within about a minute.

In the page editor, type `/` for headings, lists, tables, images and dividers; select text to make it
bold or italic or to add a link. Links to other pages are written as `/page-address`. Images can be
dropped or pasted into a page.

## One-time repository setup

In **Settings → Pages**, set *Source* to **Deploy from a branch**, branch `main`, folder `/docs`.

## Developing the app

```sh
cd app
npm install
npm run dev          # run the app with hot reload
npm test             # generator and git tests
npm run dist         # build app/dist/Lena-CMS-<version>.dmg
npm run build-site   # build ../docs from ../content without the app
```

Every push to `main` that changes `app/` runs `.github/workflows/release-app.yml`,
which tests and builds the app and publishes it as a new GitHub release.
Bump `version` in `app/package.json` for a meaningful release number.

To try the app against a local git server instead of GitHub, run it with
`LENA_CMS_DEV_REMOTE=http://localhost:<port>/<repo>.git` (development builds only;
see `app/test/git-server.js` for a minimal server).
