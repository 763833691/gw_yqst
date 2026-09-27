import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import AboutSubNav from '../components/AboutSubNav';
import { teamPageConfig } from '../config';

export default function TeamPage() {
  const members = teamPageConfig.members;

  return (
    <div className="app-shell about-page">
      <Navigation />
      <main>
        <section className="news-center-hero about-page-hero">
          <div className="site-container">
            <Link className="news-center-back" to="/">
              <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
              返回首页
            </Link>
            <div className="news-center-hero__meta">
              <span>{teamPageConfig.sectionLabel}</span>
              <span>03 / TEAM</span>
            </div>
            <h1>{teamPageConfig.title}</h1>
            <p>{teamPageConfig.lead}</p>
          </div>
        </section>

        <section className="about-page-body">
          <div className="site-container about-page-layout">
            <AboutSubNav activeId="team" />

            <div className="about-page-content">
              <p className="team-intro">{teamPageConfig.intro}</p>

              <div className="team-list">
                {members.map((member) => (
                  <article key={member.slug} className="team-card">
                    <div className={`team-card__media${member.portrait ? '' : ' team-card__media--plate'}`}>
                      {member.portrait
                        ? <img src={member.portrait} alt={`${member.name} 肖像`} loading="lazy" decoding="async" />
                        : (
                          <div className="team-card__plate" aria-hidden="true">
                            <strong>{member.name.slice(1) || member.name}</strong>
                            <small>{member.nameEn}</small>
                          </div>
                        )}
                      <span>{member.index}</span>
                    </div>
                    <div className="team-card__body">
                      <span className="team-card__role">{member.role}</span>
                      <h2>{member.name}</h2>
                      <span className="team-card__en">{member.nameEn}</span>
                      <p className="team-card__identity">{member.identity}</p>
                      <p className="team-card__lead">{member.lead}</p>
                      <div className="team-card__tags">
                        {member.journey.map((step) => (
                          <span key={step.label}>{step.label}</span>
                        ))}
                      </div>
                      <Link className="team-card__enter" to={`/about/team/${member.slug}`}>
                        查看人物志
                        <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              <div className="team-more">
                <span>{teamPageConfig.note}</span>
                <p>{teamPageConfig.openCall}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
