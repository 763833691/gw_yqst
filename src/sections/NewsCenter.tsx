import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import PageVideoHero from '../components/PageVideoHero';
import { newsConfig, assetUrl } from '../config';

const ALL_NEWS = '全部动态';

export default function NewsCenter() {
  const categories = useMemo(
    () => [ALL_NEWS, ...Array.from(new Set(newsConfig.items.map((item) => item.category)))],
    [],
  );
  const [activeCategory, setActiveCategory] = useState(ALL_NEWS);
  const visibleItems = activeCategory === ALL_NEWS
    ? newsConfig.items
    : newsConfig.items.filter((item) => item.category === activeCategory);

  return (
    <div className="app-shell news-center-page">
      <Navigation />
      <main>
        <PageVideoHero
          index="03"
          eyebrow="NEWS / 企业动态"
          status="LIVE SIGNAL · UPDATED 2026"
          titleLead="持续记录"
          titleFocus="正在发生"
          lead="持续记录项目实践、团队进展与阶段成果，让真实行动形成可追踪、可回看、不断生长的时间线。"
          tags={['项目实践', '团队进展', '阶段成果']}
          videoSrc={assetUrl("/media/page-heroes/news.mp4")}
          videoLabel="企业动态页面动态视觉"
          videoCaption="LIVE SIGNAL / NEWS STREAM"
        />

        <section className="news-center-feed">
          <div className="site-container">
            <div className="news-center-filter" aria-label="动态分类">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={category === activeCategory ? 'is-active' : ''}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
              <span>{String(visibleItems.length).padStart(2, '0')} ITEMS</span>
            </div>

            <div className="news-center-list">
              {visibleItems.map((item, index) => (
                <article className="news-center-card" key={item.title}>
                  <figure>
                    <img src={item.image} alt={item.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                    <span>REPORT · {String(index + 1).padStart(2, '0')}</span>
                  </figure>
                  <div className="news-center-card__body">
                    <div className="news-center-card__meta">
                      <span>{item.category}</span>
                      <time>{item.date}</time>
                    </div>
                    <h2>{item.title}</h2>
                    <p>{item.summary}</p>
                    <span className="news-center-card__mark">
                      焱启森途动态
                      <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
