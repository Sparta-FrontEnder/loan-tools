import { client } from "@/sanity/lib/client"
import Navbar from "../../mortgage-calculator/navigation/Navbar"
import Link from "next/link"

// 获取博客列表，按语言过滤
async function getPosts(lang: string) {
  return client.fetch(
    `*[_type == "post" && language == $lang] | order(publishedAt desc){
      title,
      slug,
      excerpt,
      publishedAt,
      "imageUrl": mainImage.asset->url
    }`,
    { lang }, // 传参
    { next: { revalidate: 60 } }
  )
}

export default async function BlogPage({
  params,
}: {
  params: { lang: string }
}) {
  const posts: any[] = await getPosts(params.lang)

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* 左侧内容：文章列表 */}
        <div className="lg:col-span-3">
          {/* 搜索框 */}
          <div className="mb-6">
            <input
              type="text"
              placeholder={params.lang === "zh" ? "搜索文章..." : "Search for articles..."}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* 文章卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div
                key={post.slug.current}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <Link
                    href={`/${params.lang}/blog/${post.slug.current}`}
                    className="text-xl font-semibold text-gray-900 hover:text-blue-600"
                  >
                    {post.title}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(post.publishedAt).toDateString()}
                  </p>
                  <p className="text-gray-700 mt-2 line-clamp-3">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More 按钮 */}
          <div className="flex justify-center mt-6">
            <button className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700">
              {params.lang === "zh" ? "加载更多" : "Load More"}
            </button>
          </div>
        </div>

        {/* 右侧边栏 */}
        <div className="space-y-8">
          {/* Popular Articles */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">
              {params.lang === "zh" ? "热门文章" : "Popular Articles"}
            </h2>
            <ul className="space-y-3">
              {posts.slice(0, 3).map((post) => (
                <li key={post.slug.current} className="flex items-center space-x-3">
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      width={60}
                      height={60}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div>
                    <Link
                      href={`/${params.lang}/blog/${post.slug.current}`}
                      className="font-medium text-gray-800 hover:text-blue-600"
                    >
                      {post.title}
                    </Link>
                    <p className="text-xs text-gray-500">5 min read</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">
              {params.lang === "zh" ? "分类" : "Categories"}
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>{params.lang === "zh" ? "房地产" : "Real Estate"}</li>
              <li>{params.lang === "zh" ? "投资" : "Investing"}</li>
              <li>{params.lang === "zh" ? "房贷" : "Mortgages"}</li>
              <li>{params.lang === "zh" ? "经济" : "Economics"}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
