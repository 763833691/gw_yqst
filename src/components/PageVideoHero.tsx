import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoopVideoProps {
  src: string;
  label: string;
}

interface PageVideoHeroProps {
  index: string;
  eyebrow: string;
  status: string;
  titleLead: string;
  titleFocus: string;
  lead: string;
  tags: string[];
  videoSrc: string;
  videoLabel: string;
  videoCaption: string;
  children?: ReactNode;
}

function LoopVideo({ src, label }: LoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const recoveryTimerRef = useRef<number | null>(null);
  const [mediaState, setMediaState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const handleVisibility = () => {
      const video = videoRef.current;
      if (video && document.visibilityState === 'visible') {
        void video.play().catch(() => undefined);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (recoveryTimerRef.current !== null) window.clearTimeout(recoveryTimerRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const resume = (video: HTMLVideoElement) => {
    video.muted = true;
    void video.play().catch(() => undefined);
  };

  const recoverFromBuffering = (video: HTMLVideoElement) => {
    if (recoveryTimerRef.current !== null) window.clearTimeout(recoveryTimerRef.current);
    recoveryTimerRef.current = window.setTimeout(() => {
      if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA && video.currentTime > 0.22) {
        video.currentTime = Math.max(0.04, video.currentTime - 0.18);
      }
      resume(video);
    }, 720);
  };

  return (
    <div
      className={`page-video-hero__media${mediaState === 'ready' ? ' is-ready' : ''}`}
      data-media-state={mediaState}
    >
      <div className="page-video-hero__loading" aria-hidden="true">
        <span />
        LOADING VISUAL
      </div>
      <video
        ref={videoRef}
        src={src}
        poster={src.replace(/\.mp4$/, '-poster.jpg')}
        aria-label={label}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onLoadedData={(event) => {
          setMediaState('ready');
          resume(event.currentTarget);
        }}
        onCanPlay={(event) => {
          setMediaState('ready');
          resume(event.currentTarget);
        }}
        onWaiting={(event) => recoverFromBuffering(event.currentTarget)}
        onStalled={(event) => recoverFromBuffering(event.currentTarget)}
        onEnded={(event) => {
          event.currentTarget.currentTime = 0.04;
          resume(event.currentTarget);
        }}
        onError={() => setMediaState('error')}
      />
    </div>
  );
}

export default function PageVideoHero({
  index,
  eyebrow,
  status,
  titleLead,
  titleFocus,
  lead,
  tags,
  videoSrc,
  videoLabel,
  videoCaption,
  children,
}: PageVideoHeroProps) {
  return (
    <section className="page-video-hero">
      <figure className="page-video-hero__visual">
        <LoopVideo src={videoSrc} label={videoLabel} />
        <div className="page-video-hero__hud" aria-hidden="true">
          <span>{index} / INFINITE LOOP</span>
          <i />
          <span>PLAYING</span>
        </div>
        <figcaption>
          <span>{videoCaption}</span>
          <span>IGNISPATH · 2026</span>
        </figcaption>
      </figure>
      <div className="page-video-hero__glow" aria-hidden="true" />
      <div className="site-container page-video-hero__inner">
        <Link className="news-center-back page-video-hero__back" to="/">
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
          返回首页
        </Link>

        <div className="page-video-hero__layout">
          <header className="page-video-hero__copy">
            <div className="page-video-hero__meta">
              <span>{eyebrow}</span>
              <span>{status}</span>
            </div>
            <span className="page-video-hero__index">SECTION / {index}</span>
            <h1 className="page-video-hero__title">
              <span>{titleLead}</span>
              <strong>{titleFocus}</strong>
            </h1>
            <p>{lead}</p>
            <div className="page-video-hero__tags" aria-label="页面关键词">
              {tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            {children}
          </header>
        </div>
      </div>
    </section>
  );
}
