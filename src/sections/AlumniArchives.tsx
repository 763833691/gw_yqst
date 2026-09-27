import { useEffect, useRef } from 'react';
import { researchConfig } from '../config';
import TechGlyph from '../components/TechGlyph';

export default function AlumniArchives() {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  if (!researchConfig.sectionLabel && researchConfig.projects.length === 0) return null;

  return (
    <section id="alumni" className="section-shell">
      <div className="site-container">
        <div className="section-kicker">{researchConfig.sectionLabel}</div>
        <div className="section-rule" />
        <div className="product-grid">
          {researchConfig.projects.map((project, index) => {
            return <article key={`${project.title}-${index}`} ref={(element) => { itemRefs.current[index] = element; }} className="product-card reveal-item" style={{ '--reveal-delay': `${(index % 3) * 60}ms` } as React.CSSProperties}>
              <div className="product-card__media">
                <TechGlyph index={index + 8} />
                <span className="product-card__number">{String(index + 1).padStart(2, '0')}</span>
                <span className="product-card__telemetry">SYS / {String(index + 11).padStart(2, '0')}</span>
              </div>
              <div className="product-card__body">
                <h3>{project.title}</h3>
                <div className="product-card__meta">
                  <span>{project.discipline}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}
