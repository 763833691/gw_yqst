import { heroConfig, assetUrl } from '../config';

export default function Hero() {
  if (!heroConfig.title) return null;

  return (
    <section id="hero" className="hero">
      <div className="hero__visual" aria-hidden="true">
        <img className="hero__visual-base" src={assetUrl("/generated/future-light-core.jpg")} alt="" fetchPriority="high" />
        <video
          className="hero__motion"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={assetUrl("/generated/future-light-core.jpg")}
          disableRemotePlayback
        >
          <source src={assetUrl("/generated/future-light-orbit.mp4")} type="video/mp4" />
        </video>
        <span className="hero__light-scan" />
      </div>
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__content">
        <div className="hero__layout">
          <div className="hero__main">
            <div className="hero__eyebrow"><span /> AI OPERATING SYSTEM · 2026</div>
            <h1 className="hero__title">{heroConfig.title}</h1>
            <p className="hero__summary">
              {heroConfig.subtitleLine1}
              <br />
              <strong>{heroConfig.subtitleLine2}</strong>
            </p>
            <div className="hero__actions">
              <a className="hero__action hero__action--primary" href="#curriculum">{heroConfig.ctaText}</a>
              <a className="hero__action" href="#footer">开始合作</a>
            </div>
          </div>
        </div>
        <div className="hero__bottom">
          <div className="hero__coordinates">
            <span>CN · XI'AN</span>
            <span>34.3416° N / 108.9398° E</span>
          </div>
          <div className="hero__scroll" aria-hidden="true">
            SCROLL TO EXPLORE
            <span className="hero__scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
