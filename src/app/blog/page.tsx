"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Navbar from "../mortgage-calculator/navigation/Navbar";
import Link from "next/link";

async function getPosts() {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc){
      title,
      "slug": slug.current,        // ✅ 直接取字符串
      publishedAt,
      "imageUrl": mainImage.asset->url,
      body
    }`,
    {},
    {
      next: { revalidate: 60 }, // ISR: 每60秒重新拉 Sanity 数据
    }
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [lang, setLang] = useState<"en" | "zh">("en"); // 默认英文

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* 左侧内容：文章列表 */}
        <div className="lg:col-span-3">
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

          {/* 搜索框 */}
          <div className="mb-6">
            <input
              type="text"
              placeholder={lang === "en" ? "Search for articles..." : "搜索文章..."}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* 文章卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div
                key={post.slug}   // ✅ 用字符串 slug
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title?.[lang] || ""}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <Link
                    href={`/blog/${post.slug}`}   // ✅ 不要再写 .current
                    className="text-xl font-semibold text-gray-900 hover:text-blue-600"
                  >
                    {post.title?.[lang] || post.title?.en}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(post.publishedAt).toDateString()}
                  </p>
                  <p className="text-gray-700 mt-2 line-clamp-3">
                    {/* 摘要：取正文前几行 */}
                    {post.body?.[lang]
                      ? post.body[lang][0]?.children?.[0]?.text
                      : post.body?.en?.[0]?.children?.[0]?.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧边栏 */}
        <div className="space-y-8">
          {/* Popular Articles */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">
              {lang === "en" ? "Popular Articles" : "热门文章"}
            </h2>
            <ul className="space-y-3">
              {posts.slice(0, 3).map((post) => (
                <li key={post.slug} className="flex items-center space-x-3">
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.title?.[lang] || ""}
                      width={60}
                      height={60}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-medium text-gray-800 hover:text-blue-600"
                    >
                      {post.title?.[lang] || post.title?.en}
                    </Link>
                    <p className="text-xs text-gray-500">
                      {lang === "en" ? "5 min read" : "阅读时间 5 分钟"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">
              {lang === "en" ? "Categories" : "分类"}
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>{lang === "en" ? "Real Estate" : "房地产"}</li>
              <li>{lang === "en" ? "Investing" : "投资"}</li>
              <li>{lang === "en" ? "Mortgages" : "按揭贷款"}</li>
              <li>{lang === "en" ? "Economics" : "经济学"}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
