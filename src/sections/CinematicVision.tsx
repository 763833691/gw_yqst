import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { architectureConfig, deliveryConfig, faqConfig } from '../config';

const CAPABILITY_NODES = [
  {
    side: 'left',
    zone: '内容与知识生产',
    title: '企业知识库',
    description: '将企业文档、资料和业务经验统一沉淀为可检索、可引用、可持续积累的知识资产。',
    tags: ['文档入库', '知识治理', '证据追溯'],
  },
  {
    side: 'left',
    zone: '内容与知识生产',
    title: '智慧搜索',
    description: '以语义理解连接不同来源的信息，让使用者更快找到可信答案及其原始依据。',
    tags: ['语义检索', '多源搜索', '可信引用'],
  },
  {
    side: 'left',
    zone: '内容与知识生产',
    title: '智能创作',
    description: '围绕无限画布组织角色、分镜与内容资产，把创意生成升级为可协作的生产流程。',
    tags: ['无限画布', '角色分镜', '内容协作'],
  },
  {
    side: 'left',
    zone: '内容与知识生产',
    title: '流程编排',
    description: '连接任务拆解、工具调用和智能体执行，将重复工作固化为稳定、可复盘的工作流。',
    tags: ['任务拆解', '工作流', '智能执行'],
  },
  {
    side: 'right',
    zone: '企业落地与交付',
    title: '数字员工',
    description: '将AI能力封装为具体岗位技能，通过标准流程、工具调用与过程审计完成岗位化交付。',
    tags: ['岗位技能', '标准流程', '过程审计'],
  },
  {
    side: 'right',
    zone: '企业落地与交付',
    title: 'SaaS服务',
    description: '以轻量方式快速启动并验证实际场景价值，让团队用较低实施成本进入真实使用。',
    tags: ['快速启动', '场景验证', '组织协作'],
  },
  {
    side: 'right',
    zone: '企业落地与交付',
    title: '系统集成',
    description: '通过API、企业数据和工具调用，将知识检索、工作流与智能体接入现有业务系统。',
    tags: ['API输出', '企业数据', '工具调用'],
  },
  {
    side: 'right',
    zone: '企业落地与交付',
    title: '私有部署',
    description: '面向本地与专网环境，以模型网关、权限审计和本地运行保障企业数据自主可控。',
    tags: ['本地运行', '权限控制', '数据可控'],
  },
];

const CORE_CAPABILITIES = ['知识库', '工作流', '无限画布', '智能体'];
const FOUNDATION = ['模型网关', '数据存储', '本地运行', '权限审计'];

export default function CinematicVision() {
  const [activeNode, setActiveNode] = useState(0);
  const [activeMission, setActiveMission] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const node = CAPABILITY_NODES[activeNode] ?? CAPABILITY_NODES[0];
  const mission = deliveryConfig.steps[activeMission] ?? deliveryConfig.steps[0];
  const signal = faqConfig.items[activeFaq] ?? faqConfig.items[0];
  const leftNodes = CAPABILITY_NODES.filter((item) => item.side === 'left');
  const rightNodes = CAPABILITY_NODES.filter((item) => item.side === 'right');

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== 'mouse' ||
      !mapRef.current ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;
    const bounds = mapRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    mapRef.current.style.setProperty('--logic-x', x.toFixed(3));
    mapRef.current.style.setProperty('--logic-y', y.toFixed(3));
  };

  const resetParallax = () => {
    mapRef.current?.style.setProperty('--logic-x', '0');
    mapRef.current?.style.setProperty('--logic-y', '0');
  };

  return (
    <section id="cinematic" className="section-shell framework-section">
      <div className="site-container">
        <div className="section-kicker">{architectureConfig.sectionLabel}</div>
        <div className="section-rule" />

        <header className="framework-intro">
          <h2>{architectureConfig.title}</h2>
          <p>{architectureConfig.description}</p>
        </header>

        <div
          ref={mapRef}
          className="logic-system"
          onPointerMove={handlePointerMove}
          onMouseLeave={resetParallax}
        >
          <div className="logic-system__head">
            <span>IGNISPATH / CAPABILITY ARCHITECTURE</span>
            <span>ONE CORE · TWO WINGS · FOUR STAGES</span>
          </div>

          <div className="logic-canvas">
            <div className="logic-canvas__stars" aria-hidden="true" />

            <article className="logic-wing logic-wing--left">
              <header>
                <span>WING A</span>
                <h3>内容与知识生产</h3>
              </header>
              <div className="logic-wing__nodes">
                {leftNodes.map((item) => {
                  const index = CAPABILITY_NODES.indexOf(item);
                  return (
                    <button
                      key={item.title}
                      type="button"
                      className={index === activeNode ? 'is-active' : ''}
                      onClick={() => setActiveNode(index)}
                      aria-pressed={index === activeNode}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{item.title}</strong>
                    </button>
                  );
                })}
              </div>
            </article>

            <div className="logic-core-zone">
              <div className="logic-core">
                <div className="logic-core__rings" aria-hidden="true"><i /><i /><i /></div>
                <div className="logic-core__copy">
                  <span>CORE / 01</span>
                  <strong>AI操作体系</strong>
                  <small>统一能力底座</small>
                </div>
                <div className="logic-core__capabilities">
                  {CORE_CAPABILITIES.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>

              <div className="logic-missions" aria-label="企业AI项目实施阶段">
                {deliveryConfig.steps.map((step, index) => (
                  <button
                    key={step.title}
                    type="button"
                    className={`logic-mission logic-mission--${index + 1}${index === activeMission ? ' is-active' : ''}`}
                    onClick={() => setActiveMission(index)}
                    aria-pressed={index === activeMission}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{step.title}</strong>
                  </button>
                ))}
              </div>

              <div className="logic-platform">
                <span>AI CAPABILITY PLATFORM</span>
                <strong>焱启森途 AI 能力平台</strong>
              </div>
            </div>

            <article className="logic-wing logic-wing--right">
              <header>
                <span>WING B</span>
                <h3>企业落地与交付</h3>
              </header>
              <div className="logic-wing__nodes">
                {rightNodes.map((item) => {
                  const index = CAPABILITY_NODES.indexOf(item);
                  return (
                    <button
                      key={item.title}
                      type="button"
                      className={index === activeNode ? 'is-active' : ''}
                      onClick={() => setActiveNode(index)}
                      aria-pressed={index === activeNode}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{item.title}</strong>
                    </button>
                  );
                })}
              </div>
            </article>
          </div>

          <div className="logic-readout" aria-live="polite">
            <div key={node.title} className="logic-readout__capability">
              <span>SELECTED NODE · {node.zone}</span>
              <h3>{node.title}</h3>
              <p>{node.description}</p>
              <div>{node.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
            <div key={mission.title} className="logic-readout__mission">
              <span>STAGE / {String(activeMission + 1).padStart(2, '0')}</span>
              <strong>{mission.title}</strong>
              <p>{mission.description}</p>
            </div>
          </div>

          <div className="logic-foundation">
            <div>
              <span>FOUNDATION</span>
              <strong>可信AI基础设施</strong>
            </div>
            <div>{FOUNDATION.map((item) => <span key={item}>{item}</span>)}</div>
          </div>

          <div className="signal-center">
            <div className="signal-center__head">
              <div>
                <span>MISSION SIGNALS / 项目通讯</span>
                <strong>从一个真实问题开始沟通</strong>
              </div>
              <span><i /> ONLINE · {String(faqConfig.items.length).padStart(2, '0')}</span>
            </div>

            <div className="signal-center__body">
              <div className="signal-center__tabs" role="tablist" aria-label="项目常见问题">
                {faqConfig.items.map((item, index) => (
                  <button
                    key={item.question}
                    type="button"
                    role="tab"
                    className={index === activeFaq ? 'is-active' : ''}
                    aria-selected={index === activeFaq}
                    onClick={() => setActiveFaq(index)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{item.question}</strong>
                  </button>
                ))}
              </div>

              <article key={signal.question} className="signal-answer" role="tabpanel" aria-live="polite">
                <div className="signal-answer__meta">
                  <span>SIGNAL / {String(activeFaq + 1).padStart(2, '0')}</span>
                  <span>RECEIVED</span>
                </div>
                <h3>{signal.question}</h3>
                <p>{signal.answer}</p>
                <a href="#footer">
                  讨论具体场景
                  <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
                </a>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
