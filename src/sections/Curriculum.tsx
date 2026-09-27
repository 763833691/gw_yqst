import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { capabilitiesConfig } from '../config';
import TechGlyph from '../components/TechGlyph';

export default function Curriculum() {
  const navigate = useNavigate();
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLButtonElement[];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  if (!capabilitiesConfig.sectionLabel && capabilitiesConfig.items.length === 0) return null;

  return (
    <section id="curriculum" className="section-shell">
      <div className="site-container">
        <div className="section-kicker">{capabilitiesConfig.sectionLabel}</div>
        <div className="section-rule" />
        <div className="capability-grid">
          {capabilitiesConfig.items.map((item, index) => {
            return <button
              key={item.slug}
              ref={(element) => { itemRefs.current[index] = element; }}
              className="capability-card reveal-item"
              style={{ '--reveal-delay': `${(index % 2) * 80}ms` } as React.CSSProperties}
              type="button"
              onClick={() => navigate(`/capability/${item.slug}`)}
              aria-label={`查看${item.title}详情`}
            >
              <span className="capability-card__visual" aria-hidden="true">
                <TechGlyph index={index} size="large" />
              </span>
              <span className="capability-card__content">
                <span className="capability-card__index">0{index + 1} / 0{capabilitiesConfig.items.length}</span>
                <span className="capability-card__title">{item.title}</span>
                <span className="capability-card__description">{item.description}</span>
                <span className="capability-card__footer">
                  查看能力详情
                  <span className="capability-card__arrow"><ArrowUpRight size={17} strokeWidth={1.5} /></span>
                </span>
              </span>
            </button>;
          })}
        </div>
      </div>
    </section>
  );
}
