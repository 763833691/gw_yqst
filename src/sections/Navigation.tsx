import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { siteConfig, navigationConfig } from '../config';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const scrolledRef = useRef(false);
  const linksRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > 40;
      if (next === scrolledRef.current) return;
      scrolledRef.current = next;
      setScrolled(next);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const moveTo = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    if (!href.startsWith('#')) {
      navigate(href);
      setMenuOpen(false);
      return;
    }
    if (location.pathname !== '/') {
      navigate(`/${href}`);
      setMenuOpen(false);
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;
      const targetTop = href === '#hero'
        ? 0
        : target.getBoundingClientRect().top + window.scrollY - 70;

      root.style.scrollBehavior = 'auto';
      window.history.pushState(null, '', href);
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'auto' });
      requestAnimationFrame(() => { root.style.scrollBehavior = previousBehavior; });
    }
    setMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href.startsWith('#')) return false;
    const sectionRoot = `/${href.split('/').filter(Boolean)[0] ?? ''}`;
    return location.pathname === href || (sectionRoot !== '/' && location.pathname.startsWith(`${sectionRoot}/`));
  };

  const activeIndex = navigationConfig.links.findIndex((link) => isActive(link.href));

  // 滑动指示条：跟随当前页面，鼠标悬停 / 键盘聚焦时滑到对应项
  useEffect(() => {
    const update = () => {
      const container = linksRef.current;
      const index = hovered ?? activeIndex;
      const target = index >= 0 ? linkRefs.current[index] : null;
      if (!container || !target) {
        setIndicator((prev) => (prev.visible ? { ...prev, visible: false } : prev));
        return;
      }
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      if (!containerRect.width || !targetRect.width) {
        setIndicator((prev) => (prev.visible ? { ...prev, visible: false } : prev));
        return;
      }
      const next = {
        left: targetRect.left - containerRect.left,
        width: targetRect.width,
        visible: true,
      };
      setIndicator((prev) =>
        prev.visible === next.visible && Math.abs(prev.left - next.left) < 0.5 && Math.abs(prev.width - next.width) < 0.5
          ? prev
          : next,
      );
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [hovered, activeIndex, location.pathname, scrolled]);

  if (!siteConfig.brandName && navigationConfig.links.length === 0) return null;

  return (
    <>
      <nav className={`site-nav${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-open' : ''}`} aria-label="主导航">
        <div className="site-nav__inner">
          <a className="site-nav__brand" href="#hero" onClick={(event) => moveTo(event, '#hero')}>
            {siteConfig.brandName}
          </a>
          <div
            className="site-nav__links"
            ref={linksRef}
            onMouseLeave={() => setHovered(null)}
          >
            {navigationConfig.links.map((link, index) => (
              <a
                key={link.label}
                ref={(element) => { linkRefs.current[index] = element; }}
                className={`nav-link${isActive(link.href) ? ' is-active' : ''}`}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                onMouseEnter={() => setHovered(index)}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
                onClick={(event) => moveTo(event, link.href)}
              >
                {link.label}
              </a>
            ))}
            <span
              className={`nav-indicator${indicator.visible ? ' is-visible' : ''}`}
              style={{ transform: `translateX(${indicator.left}px)`, width: `${indicator.width}px` }}
              aria-hidden="true"
            />
          </div>
          <a className="site-nav__action" href="#footer" onClick={(event) => moveTo(event, '#footer')}>
            {navigationConfig.ctaText}
            <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
          </a>
          <button
            className="site-nav__menu"
            type="button"
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="mobile-nav">
          {navigationConfig.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              onClick={(event) => moveTo(event, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
