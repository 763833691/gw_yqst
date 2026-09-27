import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import Audience from './Audience';
import Delivery from './Delivery';
import PageVideoHero from '../components/PageVideoHero';
import { assetUrl } from '../config';

const practiceStages = [
  {
    code: '01',
    title: '识别真实场景',
    description: '从使用者、资料边界与业务目标出发，找到最值得先验证的AI落地入口。',
  },
  {
    code: '02',
    title: '构建可运行方案',
    description: '把知识、工具与工作流组织为可操作的原型，在真实任务中验证效果。',
  },
  {
    code: '03',
    title: '沉淀组织能力',
    description: '将有效实践固化为系统、流程与数字岗位，形成可持续迭代的业务能力。',
  },
];

export default function PracticePage() {
  return (
    <div className="app-shell practice-page">
      <Navigation />
      <main>
        <PageVideoHero
          index="02"
          eyebrow="PRACTICE / 实践内容"
          status="FROM SCENARIO TO SYSTEM"
          titleLead="从场景出发"
          titleFocus="让系统持续运行"
          lead="从真实业务现场出发，把一次有效演示推进为可运行、可复盘、可持续迭代的组织能力。"
          tags={['识别场景', '运行验证', '持续沉淀']}
          videoSrc={assetUrl("/media/page-heroes/practice.mp4")}
          videoLabel="实践内容页面动态视觉"
          videoCaption="PRACTICE LOOP / SYSTEM BUILD"
        />

        <section className="practice-overview">
          <div className="site-container">
            <div className="practice-overview__head">
              <span>PRACTICE PATH / 实践路径</span>
              <h2>不是堆叠工具，而是把AI接进真实工作</h2>
            </div>
            <div className="practice-stage-grid">
              {practiceStages.map((stage) => (
                <article key={stage.code}>
                  <span>{stage.code}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </article>
              ))}
            </div>
            <Link className="practice-capability-link" to="/products">
              查看产品与解决方案
              <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <Audience />
        <Delivery />
      </main>
      <Footer />
    </div>
  );
}
