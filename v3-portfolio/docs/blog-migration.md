# Blog migration

Posts live in `content/blog/*.mdx` and appear at `/blogs/<slug>`.
The site reads these files at build time. It does not connect to MongoDB.

## Import

Use Node.js 24 or later. Put `MONGODB_URI` in `.env`, using the database that
contains the `posts` collection. The importer only reads that collection.

```sh
pnpm import:blogs
pnpm test
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

To repeat the conversion from the local snapshot:

```sh
pnpm import:blogs .migration/posts.json
```

The snapshot stays out of Git. `.env.example` contains a placeholder URI.
The importer validates and compiles new posts before writing files. It skips
unpublished posts, keeps identical files, and stops on conflicting files or
duplicate source slugs. It never overwrites a post or changes MongoDB.

Seven source articles already exist here. `content/blog-redirects.json` maps
their source slugs to the existing versions. The importer keeps those local
versions, including their MDX components and local assets. The other 65 posts
retain their source slugs, dates, summaries, tags, category, and SEO fields.
Imported banner images keep their Cloudinary URLs and appear above the body.
Keep those Cloudinary assets available after retiring the old site.

## Retire the old site after deployment

The portfolio redirects `/blog` and `/blog/<slug>` to `/blogs` and `/blogs/<slug>`.
It also redirects the seven source slugs to the existing canonical versions.

The separate `blog.atharvdange.com` host still needs permanent redirects at its
current host. Point its index to `https://www.atharvdange.com/blogs` and each
article to its matching `/blogs/<slug>` URL, using the alias map above where
needed. Check the old site's actual URL paths before applying the rules.
Portfolio redirects cannot receive requests still routed to another host.

Check an old article URL and its banner image after deployment, then retire
the old app. This change does not alter DNS, hosting, or the source database.
