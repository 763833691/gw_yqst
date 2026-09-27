import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { newsConfig } from '../config';

const AUTOPLAY_DELAY = 6500;
const pad = (value: number) => String(value).padStart(2, '0');

export default function News() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dragStartRef = useRef<number | null>(null);
  const total = newsConfig.items.length;
  const activeItem = newsConfig.items[activeIndex];

  useEffect(() => {
    if (paused || total < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [paused, total]);

  if (!activeItem) return null;

  const goTo = (index: number) => {
    setActiveIndex(((index % total) + total) % total);
  };

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + total) % total);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== 'mouse' ||
      !stageRef.current ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;
    const bounds = stageRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    stageRef.current.style.setProperty('--news-x', x.toFixed(3));
    stageRef.current.style.setProperty('--news-y', y.toFixed(3));
  };

  const resetParallax = () => {
    stageRef.current?.style.setProperty('--news-x', '0');
    stageRef.current?.style.setProperty('--news-y', '0');
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current === null) return;
    const delta = event.clientX - dragStartRef.current;
    dragStartRef.current = null;
    if (Math.abs(delta) < 48) return;
    move(delta < 0 ? 1 : -1);
  };

  return (
    <section id="news" className="section-shell news-section">
      <div className="site-container">
        <div className="section-kicker">{newsConfig.sectionLabel}</div>
        <div className="section-rule" />
        <header className="news-heading">
          <div>
            <h2>{newsConfig.title}</h2>
            <p className="news-heading__lead">团队进展、活动记录与荣誉节点，持续更新。</p>
          </div>
          <span className="news-heading__live"><i /> LIVE FEED / {pad(total)}</span>
        </header>

        <div
          ref={stageRef}
          className={`news-stage${paused ? ' is-paused' : ''}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            setCycleKey((current) => current + 1);
            resetParallax();
          }}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => {
            setPaused(false);
            setCycleKey((current) => current + 1);
          }}
          onPointerMove={handlePointerMove}
          onPointerDown={(event) => {
            dragStartRef.current = event.clientX;
          }}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            dragStartRef.current = null;
          }}
        >
          <div className="news-grid">
            <figure className="news-media">
              <img
                className="news-media__backdrop"
                key={`backdrop-${activeItem.image}`}
                src={activeItem.image}
                alt=""
                aria-hidden="true"
                loading="eager"
                decoding="async"
              />
              <div className="news-media__frame">
                <img
                  className="news-media__photo"
                  key={activeItem.image}
                  src={activeItem.image}
                  alt={activeItem.alt}
                  loading="eager"
                  decoding="async"
                />
              </div>
              <span className="news-media__scan" aria-hidden="true" />
              <figcaption>FIELD REPORT · {pad(activeIndex + 1)}</figcaption>
            </figure>

            <article key={`${activeItem.date}-${activeItem.title}`} className="news-panel" aria-live="polite">
              <div className="news-panel__meta">
                <span>{activeItem.category}</span>
                <time>{activeItem.date}</time>
              </div>
              <h3>{activeItem.title}</h3>
              <p>{activeItem.summary}</p>
              <div className="news-panel__actions">
                <span className="news-count">
                  <strong>{pad(activeIndex + 1)}</strong> / {pad(total)}
                </span>
                <Link className="news-more" to="/news">
                  {newsConfig.viewAllLabel}
                  <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>

          <ol className="news-rail" aria-label="动态列表">
            {newsConfig.items.map((item, index) => (
              <li key={item.title}>
                <button
                  type="button"
                  className={index === activeIndex ? 'is-active' : ''}
                  onClick={() => goTo(index)}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  aria-label={`查看第${index + 1}条动态：${item.title}`}
                >
                  <span className="news-rail__index">{pad(index + 1)}</span>
                  <span className="news-rail__body">
                    <strong>{item.title}</strong>
                    <em>{item.category} · {item.date}</em>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="news-progress" aria-hidden="true">
            <span key={`${activeIndex}-${cycleKey}`} />
          </div>
        </div>
      </div>
    </section>
  );
}
