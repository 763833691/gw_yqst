import { ArrowLeft, ArrowUpRight, FileText } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import ModuleNav from '../components/ModuleNav';
import { productsPageConfig } from '../config';

export default function ProductDetail() {
  const { slug } = useParams();
  const items = productsPageConfig.items;
  const product = items.find((item) => item.slug === slug) ?? items[0];

  return (
    <div className="app-shell product-detail-page">
      <Navigation />
      <main>
        <section className="product-hero">
          <div className="product-hero__glow" aria-hidden="true" />
          {product.mark && (
            <div className="product-hero__mark" aria-hidden="true">
              <img src={product.mark} alt="" />
            </div>
          )}
          <div className="site-container product-hero__inner">
            <Link className="news-center-back" to="/">
              <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
              返回首页
            </Link>

            <div className="product-hero__meta">
              <span>{productsPageConfig.sectionLabel}</span>
              <span>{product.index} / {product.nameEn}</span>
            </div>

            <div className="product-hero__layout">
              <div className="product-hero__copy">
                <span className="product-hero__tagline">{product.tagline}</span>
                <h1>{product.name}</h1>
                <p className="product-hero__category">{product.category}</p>
                <p className="product-hero__summary">{product.summary}</p>
                <div className="product-hero__status">
                  <span>STATUS</span>
                  <strong>{product.status}</strong>
                </div>
              </div>

              <div className="product-hero__flow">
                <span className="product-hero__flow-label">MAIN CHAIN / 主链路</span>
                <ol>
                  {product.flow.map((step, index) => (
                    <li key={step}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="product-hero__actions">
              <Link className="product-enter" to="/products">
                全部产品
                <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </Link>
              {product.docs.map((doc) => (
                <a key={doc.href} className="product-doc-link" href={doc.href} target="_blank" rel="noreferrer">
                  <FileText size={15} strokeWidth={1.5} aria-hidden="true" />
                  {doc.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <ModuleNav
          label="产品导航"
          activeId={product.slug}
          items={items.map((item) => ({
            id: item.slug,
            index: item.index,
            label: item.name,
            path: `/products/${item.slug}`,
          }))}
        />

        <section className="section-shell product-body">
          <div className="site-container">
            <div className="product-intro">
              <div className="product-intro__copy">
                {product.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 18)}>{paragraph}</p>
                ))}
              </div>
              <aside className="product-intro__aside">
                <span className="product-intro__aside-label">FOR / 适用对象</span>
                <ul>
                  {product.audience.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <span className="product-intro__aside-label">OPERATOR</span>
                <p>{product.operator}</p>
              </aside>
            </div>

            <div className="product-block">
              <div className="framework-subhead">
                <span>01 / PROBLEM</span>
                <strong>{product.comparisonTitle}</strong>
              </div>
              <div className="product-compare">
                {product.comparison.map((row) => (
                  <div key={row.problem} className="product-compare__row">
                    <p className="product-compare__problem">{row.problem}</p>
                    <p className="product-compare__solution">{row.solution}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="product-block">
              <div className="framework-subhead">
                <span>02 / MODULES</span>
                <strong>{product.modulesTitle}</strong>
              </div>
              <div className="product-modules">
                {product.modules.map((module) => (
                  <article key={module.code} className="product-module">
                    <span>{module.code}</span>
                    <h3>{module.title}</h3>
                    <p>{module.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="product-block">
              <div className="framework-subhead">
                <span>03 / INTERFACE</span>
                <strong>产品界面</strong>
              </div>
              <div className={`product-shots product-shots--${product.shots.length}`}>
                {product.shots.map((shot) => (
                  <figure key={shot.code} className="product-shot">
                    <img src={shot.image} alt={shot.alt} loading="lazy" decoding="async" />
                    <figcaption>
                      <span>{shot.code}</span>
                      {shot.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="product-docs">
              {product.docs.map((doc) => (
                <a key={doc.href} className="product-doc-card" href={doc.href} target="_blank" rel="noreferrer">
                  <span className="product-doc-card__label">{doc.label}</span>
                  <strong>{doc.title}</strong>
                  <p>{doc.description}</p>
                  <span className="product-doc-card__meta">
                    {doc.meta}
                    <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
