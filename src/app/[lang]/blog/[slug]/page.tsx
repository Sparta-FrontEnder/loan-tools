import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Navbar from "@/app/mortgage-calculator/navigation/Navbar";
import Link from "next/link";

// ===== 查询单篇文章 =====
async function getPost(slug: string, lang: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug && language == $lang][0]{
      title,
      body,
      publishedAt,
      "author": author->name,
      "mainImage": mainImage{
        asset->{
          url
        },
        alt
      },
      "categories": categories[]->title
    }`,
    { slug, lang }
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const post = await getPost(params.slug, params.lang);

  if (!post) {
    return (
      <div className="p-6 text-center text-gray-500">
        Post not found
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* 正文区域 */}
          <article className="w-full lg:w-2/3">
            <div className="max-w-3xl mx-auto">
              {/* Header 信息 */}
              <header className="mb-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                  <span>
                    {post.publishedAt
                      ? new Date(post.publishedAt).toDateString()
                      : "No date"}
                  </span>
                  {post.author && (
                    <span className="font-medium text-gray-700">
                      By {post.author}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                  {post.title}
                </h1>

                {/* 标签 */}
                {post.categories?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((cat: string) => (
                      <span
                        key={cat}
                        className="bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* 封面图 */}
              {post.mainImage?.asset?.url && (
                <div className="aspect-video w-full rounded-lg overflow-hidden mb-8">
                  <img
                    src={post.mainImage.asset.url}
                    alt={post.mainImage.alt || "Blog image"}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* 正文 */}
              <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                {post.body ? (
                  <PortableText value={post.body} />
                ) : (
                  <p>No content</p>
                )}
              </div>

              {/* CTA 区块 */}
              <div className="mt-16 bg-blue-50 p-8 rounded-xl text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Ready to Invest?
                </h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Calculate your potential mortgage payments and explore financing options to take the next step in your real estate journey.
                </p>
                <Link href={`/${params.lang}/mortgage-calculator`}>
                  <button className="px-6 py-3 text-base font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
                    Try our Mortgage Calculator
                  </button>
                </Link>
              </div>
            </div>
          </article>

          {/* 侧边栏 */}
          <aside className="w-full lg:w-1/3 lg:sticky top-24 self-start">
            <div className="space-y-8">
              {/* Related Articles (后面可以改成动态 Sanity) */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Related Articles
                </h3>
                <div className="space-y-4">
                  <a className="flex items-center gap-4 group" href="#">
                    <div className="w-24 h-16 bg-gray-200 rounded-lg"></div>
                    <div>
                      <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                        The Ultimate Guide to Stock Market Investing
                      </p>
                      <p className="text-sm text-gray-500">Investing</p>
                    </div>
                  </a>
                  <a className="flex items-center gap-4 group" href="#">
                    <div className="w-24 h-16 bg-gray-200 rounded-lg"></div>
                    <div>
                      <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                        Planning for Retirement: A Step-by-Step Approach
                      </p>
                      <p className="text-sm text-gray-500">Retirement</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
