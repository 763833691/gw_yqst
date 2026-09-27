import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { siteConfig, capabilityDetailConfig } from '../config';

const SLUGS = Object.keys(capabilityDetailConfig.capabilities);

export default function CapabilityDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const data = slug ? capabilityDetailConfig.capabilities[slug] : null;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = data ? `${data.title} | ${siteConfig.brandName}` : `页面未找到 | ${siteConfig.brandName}`;
    return () => { document.title = previousTitle; };
  }, [data]);

  if (!data) {
    return (
      <div className="detail-page detail-not-found">
        <span>404</span>
        <p>{capabilityDetailConfig.notFoundText}</p>
        <button type="button" onClick={() => navigate('/')}>{capabilityDetailConfig.backLinkText}</button>
      </div>
    );
  }

  const currentIndex = SLUGS.indexOf(slug!);
  const prevSlug = currentIndex > 0 ? SLUGS[currentIndex - 1] : null;
  const nextSlug = currentIndex < SLUGS.length - 1 ? SLUGS[currentIndex + 1] : null;
  const go = (path: string) => { navigate(path); window.scrollTo({ top: 0 }); };

  return (
    <div className="detail-page">
      <div className="detail-background" aria-hidden="true">
        <span /><span /><span />
      </div>
      <nav className="site-nav is-scrolled" aria-label="详情页导航">
        <div className="site-nav__inner" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <a className="site-nav__brand" href="/" onClick={(event) => { event.preventDefault(); go('/'); }}>{siteConfig.brandName}</a>
          <a className="site-nav__action" href="/" onClick={(event) => { event.preventDefault(); go('/'); }}>
            <ArrowLeft size={14} strokeWidth={1.5} />{capabilityDetailConfig.backLinkText}
          </a>
        </div>
      </nav>
      <main className="detail-content">
        <section className="detail-hero">
          <div className="detail-index">{capabilityDetailConfig.sectionLabel} · 0{currentIndex + 1} / 0{SLUGS.length}</div>
          <h1>{data.title}</h1>
          <p className="detail-subtitle">{data.subtitle}</p>
        </section>
        <article className="detail-article">
          <div className="detail-article__grid">
            <aside className="detail-article__aside">CAPABILITY BRIEF<br />UVW × IGNISPATH</aside>
            <div className="detail-article__body">
              {data.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <a className="detail-contact" href="/#footer">
                <span>讨论这个方向</span>
                <strong>联系我们，梳理具体业务场景 <ArrowRight size={16} /></strong>
              </a>
            </div>
          </div>
        </article>
        <nav className="detail-pagination" aria-label="能力详情翻页">
          {prevSlug ? (
            <a className="detail-pagination__link" href={`/capability/${prevSlug}`} onClick={(event) => { event.preventDefault(); go(`/capability/${prevSlug}`); }}>
              <span className="detail-pagination__label"><ArrowLeft size={14} /> {capabilityDetailConfig.prevLabel}</span>
              <span className="detail-pagination__title">{capabilityDetailConfig.capabilities[prevSlug].title}</span>
            </a>
          ) : <span />}
          {nextSlug ? (
            <a className="detail-pagination__link" href={`/capability/${nextSlug}`} onClick={(event) => { event.preventDefault(); go(`/capability/${nextSlug}`); }}>
              <span className="detail-pagination__label">{capabilityDetailConfig.nextLabel} <ArrowRight size={14} /></span>
              <span className="detail-pagination__title">{capabilityDetailConfig.capabilities[nextSlug].title}</span>
            </a>
          ) : <span />}
        </nav>
      </main>
    </div>
  );
}
