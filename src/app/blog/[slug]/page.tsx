import { client } from "@/sanity/lib/client";
import BlogPostContent from "./BlogPostContent"; // 引入你的 client 组件

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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;  // ✅ 解 Promise
  const post = await getPost(slug);

  if (!post) {
    return <div className="p-6 text-center text-gray-500">Post not found</div>;
  }

  // ✅ 把数据传给 Client Component
  return <BlogPostContent post={post} />;
}
