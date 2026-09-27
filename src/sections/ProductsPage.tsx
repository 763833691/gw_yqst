import { ArrowUpRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import PageVideoHero from '../components/PageVideoHero';
import { productsPageConfig, assetUrl } from '../config';

export default function ProductsPage() {
  const items = productsPageConfig.items;

  return (
    <div className="app-shell products-page">
      <Navigation />
      <main>
        <PageVideoHero
          index="01"
          eyebrow="PRODUCTS / 产品体系"
          status="TWO ENGINES · ONE SYSTEM"
          titleLead="多核心协同"
          titleFocus="产品引擎"
          lead="以统一的 AI 底座，同时驱动智能工作流与内容生产。让知识、工具、智能体与创作流程在同一套工程体系里持续运行。"
          tags={['SEMANTIC OS', '泓儒 OPC', '统一 AI 底座']}
          videoSrc={assetUrl("/media/page-heroes/products.mp4")}
          videoLabel="关于产品页面动态视觉"
          videoCaption="PRODUCT ENGINE / CORE ARRAY"
        />

        <section className="section-shell products-list-section">
          <div className="site-container">
            <div className="product-showcase">
              {items.map((product) => (
                <article key={product.slug} className="product-showcase__item">
                  <div className="product-showcase__head">
                    <span className="product-showcase__index">{product.index}</span>
                    <div>
                      <span className="product-showcase__en">{product.nameEn}</span>
                      <h2>{product.name}</h2>
                      <p className="product-showcase__tagline">{product.tagline}</p>
                    </div>
                  </div>

                  <div className="product-showcase__body">
                    <div className="product-showcase__copy">
                      <span className="product-showcase__category">{product.category}</span>
                      <p>{product.summary}</p>
                      <ul className="product-showcase__flow">
                        {product.flow.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ul>
                    </div>

                    <dl className="product-showcase__metrics">
                      {product.metrics.map((metric) => (
                        <div key={metric.label}>
                          <dt>{metric.label}</dt>
                          <dd>{metric.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="product-showcase__foot">
                    <div className="product-showcase__audience">
                      {product.audience.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className="product-showcase__actions">
                      {product.docs.map((doc) => (
                        <a key={doc.href} className="product-doc-link" href={doc.href} target="_blank" rel="noreferrer">
                          <FileText size={15} strokeWidth={1.5} aria-hidden="true" />
                          {doc.label}
                        </a>
                      ))}
                      <Link className="product-enter" to={`/products/${product.slug}`}>
                        了解 {product.name}
                        <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="products-note">{productsPageConfig.note}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
