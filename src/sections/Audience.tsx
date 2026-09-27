import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { audienceConfig } from '../config';
import TechGlyph from '../components/TechGlyph';

export default function Audience() {
  if (!audienceConfig.title || audienceConfig.items.length === 0) return null;

  return (
    <section id="audience" className="section-shell audience-section">
      <div className="site-container">
        <div className="section-kicker">{audienceConfig.sectionLabel}</div>
        <div className="section-rule" />
        <div className="audience-intro">
          <h2>{audienceConfig.title}</h2>
          <p>{audienceConfig.description}</p>
        </div>
        <div className="audience-grid">
          {audienceConfig.items.map((item, index) => {
            return <Link key={item.title} className="audience-card" to={`/capability/${item.capabilitySlug}`}>
              <span className="audience-card__head">
                <span className="audience-card__index">0{index + 1}</span>
                <TechGlyph index={index + 4} size="compact" />
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="audience-card__link">
                查看对应能力
                <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
              </span>
            </Link>;
          })}
        </div>
      </div>
    </section>
  );
}
