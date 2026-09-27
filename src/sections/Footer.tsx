import { footerConfig } from '../config';

export default function Footer() {
  if (!footerConfig.heading && footerConfig.columns.length === 0) return null;

  const hrefFor = (link: string) => link.includes('18681814554') ? 'tel:18681814554' : undefined;

  return (
    <footer id="footer" className="site-footer">
      <div className="site-container">
        <h2 className="site-footer__heading">{footerConfig.heading}</h2>
        <div className="site-footer__contact">
          <div>
            <span className="site-footer__contact-label">START A CONVERSATION</span>
            <h3>让AI真正进入你的业务现场</h3>
            <p>如果你正在规划企业知识库、AIGC内容生产、数字员工或私有化AI系统，欢迎沟通具体场景。</p>
          </div>
          <a href="tel:18681814554">
            <span>电话咨询</span>
            <strong>186 8181 4554</strong>
          </a>
        </div>
        <div className="site-footer__grid">
          {footerConfig.columns.map((column) => (
            <div key={column.title}>
              <span className="site-footer__column-title">{column.title}</span>
              <ul className="site-footer__list">
                {column.links.map((link) => (
                  <li key={link}>
                    {hrefFor(link) ? <a className="site-footer__item" href={hrefFor(link)}>{link}</a> : <span className="site-footer__item">{link}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="site-footer__bottom">
          <span>{footerConfig.copyright}</span>
          <div className="site-footer__links">
            {footerConfig.bottomLinks.map((link) => (
              link.href && link.href !== '#'
                ? <a key={link.label} href={link.href}>{link.label}</a>
                : <span key={link.label}>{link.label}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
