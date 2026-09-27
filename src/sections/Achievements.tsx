import { useEffect, useRef } from 'react';
import { achievementsConfig } from '../config';

export default function Achievements() {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .1 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  if (achievementsConfig.items.length === 0) return null;
  const gridItems = achievementsConfig.items.filter((item) => !item.fullWidth);
  const fullWidthItems = achievementsConfig.items.filter((item) => item.fullWidth);

  return (
    <section id="achievements" className="section-shell">
      <div className="site-container">
        <div className="section-kicker">Achievements</div>
        <div className="section-rule" />
        <div className="achievements-intro">
          <h2>{achievementsConfig.title}</h2>
          <p>{achievementsConfig.subtitle}</p>
        </div>
        <div className="certificate-grid">
          {gridItems.map((item, index) => (
            <figure key={item.image} ref={(element) => { itemRefs.current[index] = element; }} className="certificate-card reveal-item" style={{ '--reveal-delay': `${index * 80}ms` } as React.CSSProperties}>
              <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
              <figcaption><span>{item.alt}</span><span>0{index + 1}</span></figcaption>
            </figure>
          ))}
        </div>
        {fullWidthItems.map((item, index) => (
          <figure key={item.image} ref={(element) => { itemRefs.current[gridItems.length + index] = element; }} className="achievement-wide reveal-item">
            <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
            <figcaption><span>{item.alt}</span><span>TEAM / 2026</span></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
