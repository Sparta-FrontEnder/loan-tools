import { client } from "@/sanity/lib/client";
import BlogPostContent from "./BlogPostContent";

async function getPost(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      body,
      publishedAt,
      "author": author->name,
      "mainImage": mainImage{ asset->{url}, alt },
      "categories": categories[]->title
    }`,
    { slug }
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;   // ✅ 正确，不要 await
  const post = await getPost(slug);

  if (!post) {
    return <div className="p-6 text-center text-gray-500">Post not found</div>;
  }

  return <BlogPostContent post={post} />;
}
