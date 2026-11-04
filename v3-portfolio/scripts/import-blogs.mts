import fs from "node:fs/promises";
import path from "node:path";
import { MongoClient } from "mongodb";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { planImport } from "./blog-migration.mts";

async function readPosts(): Promise<unknown> {
  const snapshot = process.argv[2];
  if (snapshot) return JSON.parse(await fs.readFile(snapshot, "utf8")) as unknown;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Set MONGODB_URI in .env before importing");
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
  try {
    await client.connect();
    return await client.db().collection("posts").find({}, {
      projection: {
        _id: 0, title: 1, slug: 1, summary: 1, content: 1, publishedDate: 1,
        updatedAt: 1, isPublished: 1, category: 1, tags: 1, bannerImage: 1,
        seoTitle: 1, seoDescription: 1, seoKeywords: 1,
      },
    }).toArray();
  } catch {
    throw new Error("Could not read MongoDB. Check the URI, network access, and Atlas IP allowlist.");
  } finally {
    await client.close();
  }
}

async function main(): Promise<void> {
  const directory = path.join(process.cwd(), "content/blog");
  const existing = new Map<string, string>();
  for (const file of await fs.readdir(directory)) {
    if (file.endsWith(".mdx")) {
      existing.set(file.slice(0, -4), await fs.readFile(path.join(directory, file), "utf8"));
    }
  }
  const aliases: Record<string, string> = JSON.parse(
    await fs.readFile("content/blog-redirects.json", "utf8"),
  );
  const planned = planImport(await readPosts(), existing, aliases);
  for (const post of planned) {
    try {
      await serialize(matter(post.mdx).content, { mdxOptions: { remarkPlugins: [remarkGfm] } });
    } catch {
      throw new Error(`MDX compilation failed for ${post.slug}; no posts were written`);
    }
  }
  for (const post of planned) {
    await fs.writeFile(path.join(directory, `${post.slug}.mdx`), post.mdx, { flag: "wx" });
  }
  console.log(`Imported ${planned.length} posts. Existing posts preserved; MongoDB unchanged.`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Blog import failed");
  process.exitCode = 1;
});
