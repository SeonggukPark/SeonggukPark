import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site as siteData } from "../data/site";

export async function GET(context) {
  const posts = (await getCollection("posts", ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  return rss({
    title: `${siteData.name} 기술 기록`,
    description: siteData.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/SeonggukPark/posts/${post.id}/`
    }))
  });
}
