import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Navbar from "../mortgage-calculator/navigation/Navbar";

// 获取新闻列表
async function getNewsList() {
  return client.fetch(
    `*[_type == "news"] | order(publishedAt desc){
      title,
      slug,
      publishedAt,
      excerpt,
      "author": author->name,
      "mainImage": mainImage.asset->url,
      categories[]->{
        title
      }
    }`
  );
}

// 获取热门新闻
async function getPopularNews() {
  return client.fetch(
    `*[_type == "news"] | order(publishedAt desc)[0..2]{
      title,
      slug,
      "mainImage": mainImage.asset->url,
      categories[0]->{title}
    }`
  );
}

export default async function NewsListPage() {
  const newsList = await getNewsList();
  const popular = await getPopularNews();

  if (!newsList || newsList.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">No news available</div>
    );
  }

  return (
    <div>
        <Navbar/>
        <main className="mx-auto max-w-7xl w-full flex-grow p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ===== 新闻列表 (左侧 2/3) ===== */}
                <div className="lg:col-span-2">
                <h1 className="text-4xl font-bold tracking-tight mb-6">Latest News</h1>

                {/* 搜索框 */}
                <div className="relative mb-8">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 text-2xl">
                    search
                    </span>
                    <input
                    className="form-input w-full rounded-lg bg-white dark:bg-black/20 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent pl-12 pr-4 py-3 text-lg"
                    placeholder="Search for news, topics or keywords..."
                    />
                </div>

                {/* 新闻卡片 */}
                <div className="space-y-8">
                    {newsList.map((news: any) => (
                    <article
                        key={news.slug.current}
                        className="flex flex-col md:flex-row items-start gap-6 bg-white dark:bg-black/20 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
                    >
                        {/* 左边文字内容 */}
                        <div className="flex-1 order-2 md:order-1">
                        <div className="flex items-center gap-2 mb-2">
                            {news.categories?.map((cat: any) => (
                            <span
                                key={cat.title}
                                className="text-xs font-semibold uppercase tracking-wider text-primary"
                            >
                                {cat.title}
                            </span>
                            ))}
                            <span className="text-xs text-black/50 dark:text-white/50">
                            {news.publishedAt
                                ? new Date(news.publishedAt).toDateString()
                                : "No date"}
                            </span>
                        </div>
                        <h2 className="text-xl font-bold mb-2 leading-tight">
                            <Link
                            href={`/news/${news.slug.current}`}
                            className="hover:text-primary transition-colors"
                            >
                            {news.title}
                            </Link>
                        </h2>
                        <p className="text-sm text-black/70 dark:text-white/70 mb-3 line-clamp-3">
                            {news.excerpt || "No summary available."}
                        </p>
                        <Link
                            href={`/news/${news.slug.current}`}
                            className="text-sm font-semibold text-primary hover:underline"
                        >
                            Read More
                        </Link>
                        </div>

                        {/* 右边图片 */}
                        {news.mainImage && (
                        <Link
                            href={`/news/${news.slug.current}`}
                            className="block w-full md:w-1/3 aspect-video rounded-lg bg-cover bg-center order-1 md:order-2"
                            style={{ backgroundImage: `url(${news.mainImage})` }}
                        />
                        )}
                    </article>
                    ))}
                </div>

                {/* 分页按钮 */}
                <div className="flex items-center justify-center pt-8 mt-8 border-t border-black/10 dark:border-white/10">
                    <a className="flex size-9 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5" href="#">
                    <span className="material-symbols-outlined text-lg">chevron_left</span>
                    </a>
                    <a className="text-sm font-bold flex size-9 items-center justify-center rounded-full bg-primary text-white mx-1" href="#">
                    1
                    </a>
                    <a className="text-sm flex size-9 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 mx-1" href="#">
                    2
                    </a>
                    <a className="text-sm flex size-9 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 mx-1" href="#">
                    3
                    </a>
                    <span className="text-sm flex size-9 items-center justify-center rounded-full mx-1">...</span>
                    <a className="text-sm flex size-9 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 mx-1" href="#">
                    10
                    </a>
                    <a className="flex size-9 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5" href="#">
                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                    </a>
                </div>
                </div>

                {/* ===== 侧边栏 (右侧 1/3) ===== */}
                <aside className="space-y-8 sticky top-24 h-fit">
                {/* Filters */}
                <div className="bg-white dark:bg-black/20 p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Filters</h2>
                    <div className="space-y-4">
                    <label className="block">
                        <span className="text-sm font-medium text-black/70 dark:text-white/70">Category</span>
                        <select className="form-select mt-1 block w-full rounded border-black/10 dark:border-white/10 bg-background-light dark:bg-background-dark focus:border-primary focus:ring-primary">
                        <option>All</option>
                        <option>Markets</option>
                        <option>Investing</option>
                        <option>Real Estate</option>
                        <option>Tech</option>
                        </select>
                    </label>
                    <label className="block">
                        <span className="text-sm font-medium text-black/70 dark:text-white/70">Date Range</span>
                        <select className="form-select mt-1 block w-full rounded border-black/10 dark:border-white/10 bg-background-light dark:bg-background-dark focus:border-primary focus:ring-primary">
                        <option>Last 24 hours</option>
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        </select>
                    </label>
                    <label className="block">
                        <span className="text-sm font-medium text-black/70 dark:text-white/70">Source</span>
                        <select className="form-select mt-1 block w-full rounded border-black/10 dark:border-white/10 bg-background-light dark:bg-background-dark focus:border-primary focus:ring-primary">
                        <option>All Sources</option>
                        <option>Finance Today</option>
                        <option>Reuters</option>
                        </select>
                    </label>
                    </div>
                </div>

                {/* Most Popular */}
                <div className="bg-white dark:bg-black/20 p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Most Popular</h2>
                    <div className="space-y-4">
                    {popular.map((p: any) => (
                        <Link
                        key={p.slug.current}
                        href={`/news/${p.slug.current}`}
                        className="flex items-center gap-4 group"
                        >
                        {p.mainImage && (
                            <div
                            className="size-16 rounded bg-cover bg-center flex-shrink-0"
                            style={{ backgroundImage: `url(${p.mainImage})` }}
                            ></div>
                        )}
                        <div>
                            <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors">
                            {p.title}
                            </h3>
                            <p className="text-sm text-black/60 dark:text-white/60">
                            {p.categories?.[0]?.title || "General"}
                            </p>
                        </div>
                        </Link>
                    ))}
                    </div>
                </div>
                </aside>
            </div>
        </main>
    </div>

  );
}
