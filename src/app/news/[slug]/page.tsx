import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Navbar from "@/app/mortgage-calculator/navigation/Navbar";

async function getNews(slug: string) {
  return client.fetch(
    `*[_type == "news" && slug.current == $slug][0]{
      title,
      body,
      publishedAt,
      "author": author->name,
      "mainImage": mainImage.asset->url,
      categories[]->{
        title
      }
    }`,
    { slug }
  );
}

async function getHeadlines() {
  return client.fetch(
    `*[_type == "news"] | order(publishedAt desc)[0..4]{
      title,
      slug,
      publishedAt,
      categories[0]->{title}
    }`
  );
}

export default async function NewsPage({ params }: { params: { slug: string } }) {
  const news = await getNews(params.slug);
  const headlines = await getHeadlines();

  if (!news) {
    return (
      <div>
        <Navbar />
        <div className="p-6 text-center text-gray-500">News not found</div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 min-h-screen flex flex-col">
      {/* 保留你现有的导航 */}
      <Navbar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* ===== 左侧 Headlines ===== */}
          <aside className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <div className="bg-white dark:bg-background-dark/50 rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Headlines
                </h2>
              </div>

              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {headlines.map((h: any) => (
                  <li
                    key={h.slug.current}
                    className={`p-4 hover:bg-primary/10 dark:hover:bg-primary/20 cursor-pointer ${
                      h.slug.current === params.slug
                        ? "bg-primary/10 dark:bg-primary/20 border-l-4 border-primary"
                        : ""
                    }`}
                  >
                    <a href={`/news/${h.slug.current}`}>
                      <h3
                        className={`font-semibold ${
                          h.slug.current === params.slug
                            ? "text-primary"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {h.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {h.publishedAt
                          ? new Date(h.publishedAt).toDateString()
                          : "No date"}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* ===== 右侧 正文区 ===== */}
          <div className="w-full md:w-2/3 lg:w-3/4 mt-8 md:mt-0">
            <div className="bg-white dark:bg-background-dark/50 rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                {/* 分类 + 时间 */}
                <div className="flex items-center space-x-4 mb-4">
                  {news.categories?.[0]?.title && (
                    <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-3 py-1.5 rounded-full">
                      {news.categories[0].title}
                    </span>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {news.publishedAt
                      ? new Date(news.publishedAt).toDateString()
                      : "No date"}
                  </p>
                </div>

                {/* 标题 */}
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {news.title}
                </h1>

                {/* 主图 */}
                {news.mainImage && (
                  <div className="mt-6 aspect-video rounded-lg overflow-hidden">
                    <img
                      src={news.mainImage}
                      alt={news.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                {/* 正文 */}
                <div className="mt-6 prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                  <PortableText value={news.body} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
