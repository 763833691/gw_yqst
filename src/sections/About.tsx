import { aboutConfig } from '../config';

export default function About() {
  if (!aboutConfig.title) return null;

  return (
    <section id="about" className="section-shell about-section">
      <div className="site-container">
        <div className="section-kicker">{aboutConfig.sectionLabel}</div>
        <div className="section-rule" />
        <div className="about-layout">
          <div className="about-copy">
            <h2>{aboutConfig.title}</h2>
            <p>{aboutConfig.description}</p>
          </div>
          <div className="about-principles">
            {aboutConfig.principles.map((principle, index) => (
              <article key={principle.title} className="about-principle">
                <span>0{index + 1}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
