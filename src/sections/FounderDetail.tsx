import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import AboutSubNav from '../components/AboutSubNav';
import { teamPageConfig } from '../config';

export default function FounderDetail() {
  const { slug } = useParams();
  const members = teamPageConfig.members;
  const member = members.find((item) => item.slug === slug) ?? members[0];

  return (
    <div className="app-shell about-page">
      <Navigation />
      <main>
        <section className="founder-hero">
          <div className="site-container founder-hero__inner">
            <Link className="news-center-back" to="/about/team">
              <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
              返回核心团队
            </Link>

            <div className={`founder-hero__layout${member.portrait ? '' : ' founder-hero__layout--solo'}`}>
              {member.portrait && (
                <figure className="founder-hero__portrait">
                  <img src={member.portrait} alt={`${member.name} 肖像`} />
                  <figcaption>
                    <span>{member.index}</span>
                    {member.name} · 2026
                  </figcaption>
                </figure>
              )}

              <div className="founder-hero__copy">
                <div className="news-center-hero__meta">
                  <span>{teamPageConfig.sectionLabel}</span>
                  <span>{member.nameEn}</span>
                </div>
                <span className="founder-hero__role">{member.role}</span>
                <h1>{member.name}</h1>
                <p className="founder-hero__identity">{member.identity}</p>
                <p className="founder-hero__lead">{member.lead}</p>
              </div>
            </div>

            <dl className="founder-facts">
              {member.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="about-page-body">
          <div className="site-container about-page-layout">
            <AboutSubNav activeId="team" />

            <div className="about-page-content">
              {member.sections.map((section) => (
                <article key={section.code} className="founder-section">
                  <header className="founder-section__head">
                    <span>{section.code}</span>
                    <h2>{section.title}</h2>
                  </header>
                  <div className="founder-section__body">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 18)}>{paragraph}</p>
                    ))}
                  </div>
                  {section.quote && <blockquote className="founder-quote">{section.quote}</blockquote>}
                  {section.shots && (
                    <div className={`founder-shots founder-shots--${section.shots.length}`}>
                      {section.shots.map((shot) => (
                        <figure key={shot.image} className="founder-shot">
                          <img src={shot.image} alt={shot.alt} loading="lazy" decoding="async" />
                          <figcaption>{shot.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </article>
              ))}

              <div className="founder-journey">
                <span className="founder-journey__label">PRACTICE PATH / 实践路径</span>
                <ol>
                  {member.journey.map((step, index) => (
                    <li key={step.label}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{step.label}</strong>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="founder-evidence">
                <div className="framework-subhead">
                  <span>EVIDENCE</span>
                  <strong>荣誉与落地证据</strong>
                </div>
                <div className="founder-evidence__grid">
                  {member.evidences.map((evidence) => (
                    <article
                      key={evidence.title}
                      className={`founder-evidence__item${evidence.image ? '' : ' founder-evidence__item--text'}`}
                    >
                      {evidence.image && (
                        <figure>
                          <img src={evidence.image} alt={evidence.title} loading="lazy" decoding="async" />
                        </figure>
                      )}
                      <div>
                        <span>{evidence.meta}</span>
                        <h3>{evidence.title}</h3>
                        <p>{evidence.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <Link className="about-next" to="/about/team">
                <span>BACK / 返回</span>
                <strong>核心团队</strong>
                <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
