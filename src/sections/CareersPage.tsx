import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Briefcase, GraduationCap } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import ModuleNav from '../components/ModuleNav';
import PageVideoHero from '../components/PageVideoHero';
import { careersPageConfig, type RecruitChannel, assetUrl } from '../config';

const AUTOPLAY_DELAY = 7000;

export default function CareersPage() {
  const { section } = useParams();
  const items = careersPageConfig.subNav;
  const active = items.find((item) => item.id === section) ?? items[0];
  const isWorkspace = active.id === 'workspace';
  const { workspace, hero } = careersPageConfig;

  const [channel, setChannel] = useState<RecruitChannel>('social');
  const [pageIndex, setPageIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const totalPages = workspace.pages.length;

  const positions = useMemo(
    () => careersPageConfig.positions.filter((position) => position.channel === channel),
    [channel],
  );

  useEffect(() => {
    if (isWorkspace || paused || totalPages < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setPageIndex((current) => (current + 1) % totalPages);
    }, AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [isWorkspace, paused, totalPages]);

  const activePage = workspace.pages[pageIndex];

  return (
    <div className="app-shell careers-page">
      <Navigation />
      <main>
        {isWorkspace ? (
          <section className="news-center-hero careers-module-hero">
            <div className="site-container">
              <Link className="news-center-back" to="/">
                <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
                返回首页
              </Link>
              <div className="news-center-hero__meta">
                <span>{workspace.label}</span>
                <span>{active.index} / {active.meta}</span>
              </div>
              <h1>{workspace.title}</h1>
              <p>{workspace.description}</p>
            </div>
          </section>
        ) : (
          <PageVideoHero
            index="06"
            eyebrow={careersPageConfig.sectionLabel}
            status="RECRUITING · 2026"
            titleLead="与创造者同行"
            titleFocus="把未来做出来"
            lead={hero.lead}
            tags={['AI 应用', '内容工程', '产品与交付']}
            videoSrc={assetUrl("/media/page-heroes/join-us.mp4")}
            videoLabel="加入我们页面动态视觉"
            videoCaption="JOIN US / NEXT BUILDERS"
          >
            <div className="careers-hero__actions page-video-hero__actions">
              {careersPageConfig.channels.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={item.id === channel ? 'careers-channel is-active' : 'careers-channel'}
                  onClick={() => setChannel(item.id)}
                >
                  {item.id === 'social'
                    ? <Briefcase size={16} strokeWidth={1.6} aria-hidden="true" />
                    : <GraduationCap size={16} strokeWidth={1.6} aria-hidden="true" />}
                  {item.label}
                </button>
              ))}
            </div>
          </PageVideoHero>
        )}

        <ModuleNav
          label="加入我们导航"
          activeId={active.id}
          items={items.map((item) => ({
            id: item.id,
            index: item.index,
            label: item.label,
            path: item.path,
          }))}
        />

        {isWorkspace ? (
          <section className="section-shell careers-workspace">
            <div className="site-container">
              <div
                className="workspace-stage"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <div className="workspace-stage__bar">
                  <span>{activePage.code}</span>
                  <strong>{activePage.title}</strong>
                  <span>{String(pageIndex + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}</span>
                </div>

                {activePage.shots.map((shot, index) => (
                  <figure
                    key={shot.code}
                    className={index === 0 ? 'workspace-shot workspace-shot--feature' : 'workspace-shot'}
                  >
                    <img src={shot.image} alt={shot.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                    <figcaption>
                      <span>{shot.code}</span>
                      {shot.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className="workspace-controls">
                <div className="workspace-dots" aria-label="工作环境分页">
                  {workspace.pages.map((page, index) => (
                    <button
                      key={page.code}
                      type="button"
                      className={index === pageIndex ? 'is-active' : ''}
                      aria-label={`查看第${index + 1}组`}
                      aria-current={index === pageIndex ? 'true' : undefined}
                      onClick={() => setPageIndex(index)}
                    >
                      <span />
                    </button>
                  ))}
                </div>
                <span className="workspace-count">
                  <strong>{String(pageIndex + 1).padStart(2, '0')}</strong> / {String(totalPages).padStart(2, '0')}
                </span>
                <div className="workspace-arrows">
                  <button type="button" onClick={() => setPageIndex((current) => (current - 1 + totalPages) % totalPages)} aria-label="上一组">
                    <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => setPageIndex((current) => (current + 1) % totalPages)} aria-label="下一组">
                    <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="careers-contact">
                <div>
                  <span>JOIN US / 简历投递</span>
                  <h3>把简历发给我们，聊聊你想做的那件事</h3>
                  <p>投递时欢迎附上一个你最满意的项目：一个功能、一段片子、一份研究，都可以。</p>
                </div>
                <a href="tel:18681814554">
                  <span>招聘咨询</span>
                  <strong>{careersPageConfig.notice.contact}</strong>
                </a>
              </div>
            </div>
          </section>
        ) : (
          <section className="section-shell careers-positions">
            <div className="site-container">
              <div className="careers-positions__head">
                <h2>{careersPageConfig.channels.find((item) => item.id === channel)?.label}</h2>
                <p>{careersPageConfig.channels.find((item) => item.id === channel)?.description}</p>
                <span>{String(positions.length).padStart(2, '0')} POSITIONS</span>
              </div>

              <div className="careers-tabs" role="tablist" aria-label="招聘通道">
                {careersPageConfig.channels.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={item.id === channel}
                    className={item.id === channel ? 'is-active' : ''}
                    onClick={() => setChannel(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <dl className="careers-highlights">
                {careersPageConfig.highlights.map((highlight) => (
                  <div key={highlight.label}>
                    <dt>{highlight.label}</dt>
                    <dd>{highlight.value}</dd>
                  </div>
                ))}
              </dl>

              <aside className="careers-safety-note">
                <span>{careersPageConfig.notice.label}</span>
                <strong>{careersPageConfig.notice.title}</strong>
                <p>{careersPageConfig.notice.paragraphs[0]}</p>
              </aside>

              {positions.length === 0 ? (
                <p className="careers-empty">{careersPageConfig.emptyText}</p>
              ) : (
                <div className="careers-list">
                  {positions.map((position, index) => (
                    <article key={position.title} className="careers-card">
                      <div className="careers-card__index">{String(index + 1).padStart(2, '0')}</div>
                      <div className="careers-card__body">
                        <h3>{position.title}</h3>
                        <div className="careers-card__meta">
                          <span>{position.team}</span>
                          <span>{position.location}</span>
                          <span>{position.mode}</span>
                        </div>
                        <ul>
                          {position.responsibilities.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <div className="careers-card__tags">
                          {position.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                      <a className="careers-card__apply" href="tel:18681814554">
                        简历投递
                        <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
                      </a>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
