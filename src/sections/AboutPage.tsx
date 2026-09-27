import { ArrowUpRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import AboutSubNav from '../components/AboutSubNav';
import PageVideoHero from '../components/PageVideoHero';
import { aboutPageConfig, assetUrl } from '../config';

export default function AboutPage() {
  const { section } = useParams();
  const items = aboutPageConfig.subNav;
  const active = items.find((item) => item.id === section) ?? items[0];
  const nextItem = items.find((item) => item.id !== active.id) ?? items[0];
  const { profile, history } = aboutPageConfig;

  return (
    <div className="app-shell about-page">
      <Navigation />
      <main>
        <PageVideoHero
          index="05"
          eyebrow={`${aboutPageConfig.sectionLabel} · ${active.label}`}
          status={`${active.index} / ${active.meta}`}
          titleLead={active.id === 'history' ? '沿着实践' : '让 AI'}
          titleFocus={active.id === 'history' ? '持续进化' : '进入真实组织'}
          lead={active.lead}
          tags={active.id === 'history' ? ['起点', '产品化', '持续演进'] : ['知识', '内容', '流程与组织']}
          videoSrc={assetUrl("/media/page-heroes/about.mp4")}
          videoLabel="关于我们页面动态视觉"
          videoCaption="ABOUT US / SHARED SYSTEM"
        />

        <section className="about-page-body">
          <div className="site-container about-page-layout">
            <AboutSubNav activeId={active.id} />

            <div className="about-page-content">
              {active.id === 'history' ? (
                <div className="about-module">
                  <ol className="about-timeline">
                    {history.milestones.map((milestone) => (
                      <li key={milestone.code}>
                        <div className="about-timeline__meta">
                          <strong>{milestone.year}</strong>
                          <span>{milestone.code}</span>
                        </div>
                        <div className="about-timeline__body">
                          <h3>{milestone.title}</h3>
                          <p>{milestone.description}</p>
                          <div className="about-timeline__tags">
                            {milestone.tags.map((tag) => (
                              <span key={tag}>{tag}</span>
                            ))}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <div className="about-module">
                  <div className="about-block__body">
                    {profile.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 18)}>{paragraph}</p>
                    ))}
                  </div>
                  <dl className="about-facts">
                    {profile.facts.map((fact) => (
                      <div key={fact.label}>
                        <dt>{fact.label}</dt>
                        <dd>{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              <Link className="about-next" to={nextItem.path}>
                <span>NEXT / 下一个模块</span>
                <strong>{nextItem.label}</strong>
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
