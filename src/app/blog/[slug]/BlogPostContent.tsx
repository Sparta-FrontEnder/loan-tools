"use client";

import { useState } from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Navbar from "@/app/mortgage-calculator/navigation/Navbar";
import Link from "next/link";

export default function BlogPostContent({ post }: { post: any }) {
  const [lang, setLang] = useState<"en" | "zh">("en");

  // ✅ PortableText 自定义渲染配置
  const components: PortableTextComponents = {
    types: {
      // ✅ 渲染 HTML Block
      html: ({ value }) => (
        <div
          className="custom-html"
          dangerouslySetInnerHTML={{ __html: value.code }}
        />
      ),
    },
    marks: {
      // ✅ 自定义 link mark
      link: ({ children, value }) => (
        <a
          href={value.href}
          title={value.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {children}
        </a>
      ),
      // ✅ 自定义 tooltip mark（你存 span 的情况）
      tooltip: ({ children, value }) => (
        <span
          title={value.title}
          style={{
            borderBottom: "1px dashed #999",
            cursor: "help",
          }}
        >
          {children}
        </span>
      ),
    },
  };

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
                  <PortableText value={post.body[lang]} components={components} />
                ) : (
                  <p>No content</p>
                )}
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
