import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { aboutPageConfig } from '../config';

interface AboutSubNavProps {
  activeId: string;
}

export default function AboutSubNav({ activeId }: AboutSubNavProps) {
  return (
    <aside className="about-page-nav" aria-label="关于我们导航">
      <span className="about-page-nav__label">ABOUT US</span>
      <nav>
        {aboutPageConfig.subNav.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={item.id === activeId ? 'is-active' : ''}
            aria-current={item.id === activeId ? 'page' : undefined}
          >
            <span>{item.index}</span>
            {item.label}
            <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        ))}
      </nav>
      <div className="about-page-nav__foot">
        <span>西安 · 中国</span>
        <strong>34.3416° N / 108.9398° E</strong>
      </div>
    </aside>
  );
}
