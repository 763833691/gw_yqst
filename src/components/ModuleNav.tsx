import { Link } from 'react-router-dom';

export interface ModuleNavItem {
  id: string;
  index: string;
  label: string;
  path: string;
}

interface ModuleNavProps {
  items: ModuleNavItem[];
  activeId: string;
  label: string;
}

export default function ModuleNav({ items, activeId, label }: ModuleNavProps) {
  return (
    <nav className="module-nav site-container" aria-label={label}>
      {items.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          className={item.id === activeId ? 'is-active' : ''}
          aria-current={item.id === activeId ? 'page' : undefined}
        >
          <span>{item.index}</span>
          {item.label}
        </Link>
      ))}
      <span className="module-nav__count">
        {items.find((item) => item.id === activeId)?.index} / {String(items.length).padStart(2, '0')}
      </span>
    </nav>
  );
}
