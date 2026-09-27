import { ArrowUpRight } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import Achievements from './Achievements';
import PageVideoHero from '../components/PageVideoHero';
import { assetUrl } from '../config';

const investorInfo = [
  {
    code: '01 / ENTITY',
    title: '企业主体',
    lines: ['西安东途大糖人工智能科技有限公司', '焱启森途（西安）信息技术服务有限公司'],
  },
  {
    code: '02 / FOCUS',
    title: '业务方向',
    lines: ['企业知识与工作流', 'AIGC内容生产', '数字员工与私有化AI系统'],
  },
  {
    code: '03 / CONTACT',
    title: '联系窗口',
    lines: ['兰先生', '186 8181 4554'],
  },
];

export default function InvestorsPage() {
  return (
    <div className="app-shell investors-page">
      <Navigation />
      <main>
        <PageVideoHero
          index="04"
          eyebrow="INVESTOR / 投资者关系"
          status="OPEN · LONG-TERM · RESPONSIBLE"
          titleLead="真实进展"
          titleFocus="连接长期价值"
          lead="用清晰的信息呈现企业主体、业务方向与阶段成果，与关注焱启森途长期发展的伙伴保持开放沟通。"
          tags={['企业主体', '业务方向', '公开成果']}
          videoSrc={assetUrl("/media/page-heroes/investors.mp4")}
          videoLabel="投资者关系页面动态视觉"
          videoCaption="LONG VIEW / VALUE NETWORK"
        />

        <section className="investor-overview">
          <div className="site-container">
            <div className="investor-overview__head">
              <span>COMPANY SNAPSHOT / 企业概览</span>
              <h2>以真实进展，建立长期沟通</h2>
              <p>当前页面以企业基础信息、业务方向和公开成果为主。进一步合作与信息咨询，可通过联系窗口沟通。</p>
            </div>
            <div className="investor-info-grid">
              {investorInfo.map((item) => (
                <article key={item.code}>
                  <span>{item.code}</span>
                  <h3>{item.title}</h3>
                  <div>
                    {item.lines.map((line) => <p key={line}>{line}</p>)}
                  </div>
                </article>
              ))}
            </div>
            <a className="investor-contact" href="tel:18681814554">
              投资与合作沟通
              <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </section>

        <Achievements />
      </main>
      <Footer />
    </div>
  );
}
