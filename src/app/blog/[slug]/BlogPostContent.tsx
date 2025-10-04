"use client";

import { useState } from "react";
import { PortableText } from "@portabletext/react";
import Navbar from "@/app/mortgage-calculator/navigation/Navbar";
import Link from "next/link";

export default function BlogPostContent({ post }: { post: any }) {
  const [lang, setLang] = useState<"en" | "zh">("en");

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* 正文区域 */}
          <article className="w-full lg:w-2/3">
            <div className="max-w-3xl mx-auto">
              {/* 语言切换按钮 */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setLang("en")}
                  className={`px-4 py-2 rounded-l-lg border ${
                    lang === "en" ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLang("zh")}
                  className={`px-4 py-2 rounded-r-lg border ${
                    lang === "zh" ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  中文
                </button>
              </div>

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
                  {post.title?.[lang] || post.title?.en}
                </h1>

                {/* 分类标签 */}
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
                {post.body?.[lang] ? (
                  <PortableText value={post.body[lang]} />
                ) : (
                  <p>No content</p>
                )}
              </div>

              {/* CTA 区块 */}
              <div className="mt-16 bg-blue-50 p-8 rounded-xl text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {lang === "en" ? "Ready to Invest?" : "准备好投资了吗？"}
                </h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  {lang === "en"
                    ? "Calculate your potential mortgage payments and explore financing options to take the next step in your real estate journey."
                    : "计算您的按揭付款并探索融资方案，迈出房地产投资的下一步。"}
                </p>
                <Link href="/mortgage-calculator">
                  <button className="px-6 py-3 text-base font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
                    {lang === "en"
                      ? "Try our Mortgage Calculator"
                      : "试试我们的按揭计算器"}
                  </button>
                </Link>
              </div>
            </div>
          </article>

          {/* 侧边栏 */}
          <aside className="w-full lg:w-1/3 lg:sticky top-24 self-start">
            <div className="space-y-8">
              {/* Related Articles */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {lang === "en" ? "Related Articles" : "相关文章"}
                </h3>
                <div className="space-y-4">
                  <a className="flex items-center gap-4 group" href="#">
                    <div className="w-24 h-16 bg-gray-200 rounded-lg"></div>
                    <div>
                      <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                        Example link
                      </p>
                      <p className="text-sm text-gray-500">
                        {lang === "en" ? "Category" : "分类"}
                      </p>
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
