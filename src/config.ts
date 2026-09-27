// ============================================================
// Site Configuration
// ============================================================

// ============================================================
// Asset CDN
// ============================================================

export const ASSET_BASE_URL = "https://yqst-1431239154.cos.ap-beijing.myqcloud.com";

export const assetUrl = (path: string): string =>
  path.startsWith("/") ? `${ASSET_BASE_URL}${path}` : path;

export interface SiteConfig {
  language: string;
  brandName: string;
}

export const siteConfig: SiteConfig = {
  language: "zh-CN",
  brandName: "焱启森途",
};

// ============================================================
// Navigation
// ============================================================

export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  links: NavLink[];
  ctaText: string;
}

export const navigationConfig: NavigationConfig = {
  links: [
    { label: "关于产品", href: "/products" },
    { label: "实践内容", href: "/practice" },
    { label: "企业动态", href: "/news" },
    { label: "投资者关系", href: "/investors" },
    { label: "关于我们", href: "/about/profile" },
    { label: "加入我们", href: "/careers/positions" },
  ],
  ctaText: "开始合作",
};

// ============================================================
// Hero
// ============================================================

export interface HeroConfig {
  title: string;
  subtitleLine1: string;
  subtitleLine2: string;
  ctaText: string;
}

export const heroConfig: HeroConfig = {
  title: "UVW × IgnisPath",
  subtitleLine1: "用AI的智慧，构建独特的虚拟视觉新世界。从知识底座到商业交付，打造一套可沉淀、可编排、可控的AI操作体系。",
  subtitleLine2: "让技术有温度，让影视有深度，让从业者有尊严。",
  ctaText: "探索能力体系",
};

// ============================================================
// About & principles
// ============================================================

export interface AboutPrinciple {
  title: string;
  description: string;
}

export interface AboutConfig {
  sectionLabel: string;
  title: string;
  description: string;
  principles: AboutPrinciple[];
}

export const aboutConfig: AboutConfig = {
  sectionLabel: "关于我们",
  title: "不止提供单点AI工具，更构建能够进入组织的操作体系",
  description: "UVW AIGC Studios 与 IgnisPath Labs 围绕知识、内容、流程与组织协作，连接AI底层能力、产品封装和企业交付。我们关注的不只是生成结果，更关注数据如何沉淀、流程如何复用、权限如何管理，以及系统如何长期运行。",
  principles: [
    { title: "知识可沉淀", description: "将文档、资料与业务经验转化为可检索、可引用、可持续积累的组织资产。" },
    { title: "流程可编排", description: "通过工作流、技能和智能体，把零散操作组织成能够重复执行的业务流程。" },
    { title: "过程可审计", description: "保留来源、权限与执行过程，让AI输出能够被追溯、复盘和管理。" },
    { title: "系统可部署", description: "支持SaaS、API与私有化等交付方式，让AI适应不同组织的安全边界。" },
  ],
};

export interface NewsItem {
  date: string;
  category: string;
  title: string;
  summary: string;
  image: string;
  alt: string;
}

export interface NewsConfig {
  sectionLabel: string;
  title: string;
  viewAllLabel: string;
  items: NewsItem[];
}

export const newsConfig: NewsConfig = {
  sectionLabel: "NEWS / 企业动态",
  title: "企业动态",
  viewAllLabel: "更多",
  items: [
    {
      date: "2026.07.18",
      category: "团队动态",
      title: "张博琛受邀在西安 ADG「Agent Plan」活动作主题分享",
      summary:
        "在火山引擎 Agent Developer Group 西安场「Agent Plan：在不确定的AI变革中找到确定的自己」活动中，张博琛围绕 AI 通识课与 Agent Plan 是什么作主题分享，与另外两位实践者一起交流如何把 AI 接进日常工作流。活动于西安雁塔区创业广场 WEI SPACE 孵化器举行。",
      image: assetUrl("/images/news/agent-plan-xian-2026.jpg"),
      alt: "Agent Plan 西安 ADG 活动海报",
    },
    {
      date: "2026.07.04",
      category: "团队荣誉",
      title: "团队成员在“ETF新势界高校挑战赛”中取得阶段成果",
      summary:
        "团队成员围绕投资者教育与内容创新参与高校挑战赛，在协同研究、内容表达和方案落地中获得赛事认可。我们持续把真实项目经验沉淀为可复用的AI工作流与组织能力。",
      image: assetUrl("/images/group-photo-optimized.jpg"),
      alt: "ETF新势界高校挑战赛团队合影",
    },
    {
      date: "2026.07.04",
      category: "个人荣誉",
      title: "张棪森获“THE ETF FRONTIER”称号",
      summary:
        "在华夏基金、同花顺与上海高级金融学院联合举办的ETF新势界高校挑战赛中表现优秀，获得THE ETF FRONTIER称号。",
      image: assetUrl("/images/certificate1.png"),
      alt: "张棪森THE ETF FRONTIER荣誉证书",
    },
    {
      date: "2026.07.04",
      category: "个人荣誉",
      title: "张博琛获“THE ETF FRONTIER”称号",
      summary:
        "凭借扎实的研究与实践表现获得赛事认可。团队将继续把专业知识、智能创作与企业AI交付连接为持续演进的能力体系。",
      image: assetUrl("/images/certificate2.png"),
      alt: "张博琛THE ETF FRONTIER荣誉证书",
    },
  ],
};

// ============================================================
// Capabilities (Curriculum section)
// ============================================================

export interface CapabilityItem {
  title: string;
  slug: string;
  description: string;
}

export interface CapabilitiesConfig {
  sectionLabel: string;
  items: CapabilityItem[];
}

export const capabilitiesConfig: CapabilitiesConfig = {
  sectionLabel: "能力体系",
  items: [
    {
      title: "AI知识库与智慧搜索",
      slug: "knowledge-search",
      description: "把分散资料变成可检索、可复用、可沉淀的企业知识资产。支持文档入库、语义检索、证据追溯与智慧搜索，是整套AI体系的底层数据底座。面向学校、企业与研究机构。",
    },
    {
      title: "AI漫剧智能创作平台",
      slug: "comic-creation",
      description: "用无限画布组织创作、分镜、资产与流程协作。集成AI漫剧工作流、CLAW智能体与角色分镜资产管理，提升短视频内容生产效率，降低创作与协作成本。",
    },
    {
      title: "企业数字员工系统",
      slug: "digital-employee",
      description: "把AI能力包装成岗位能力——导演、资料员、审核员。通过SOP、Skill、Workflow实现岗位化交付，让AI从工具升维为可交付、可复盘、可管理的岗位能力。",
    },
    {
      title: "企业AI私有化部署",
      slug: "private-deployment",
      description: "让AI系统真正进入组织内部，满足安全、权限与长期运营需求。提供私有化部署、模型网关、本地Runner、权限审计与企业数据接入，是ToB商业交付的最后一公里。",
    },
  ],
};

// ============================================================
// Capability Detail (sub-pages)
// ============================================================

export interface CapabilityDetailData {
  title: string;
  subtitle: string;
  paragraphs: string[];
}

export interface CapabilityDetailConfig {
  sectionLabel: string;
  backLinkText: string;
  prevLabel: string;
  nextLabel: string;
  notFoundText: string;
  capabilities: Record<string, CapabilityDetailData>;
}

export const capabilityDetailConfig: CapabilityDetailConfig = {
  sectionLabel: "能力详情",
  backLinkText: "返回首页",
  prevLabel: "上一个",
  nextLabel: "下一个",
  notFoundText: "未找到该能力详情。",
  capabilities: {
    "knowledge-search": {
      title: "AI知识库与智慧搜索",
      subtitle: "企业知识资产的统一底座",
      paragraphs: [
        "在信息爆炸的时代，企业和机构积累了大量分散的文档、报告与数据，却难以高效利用。我们的AI知识库系统将多源文档结构化入库，通过语义级精准检索，让每一条知识都能被快速定位与调用。",
        "系统包含四大核心模块：知识中心提供统一的知识入口与分发；企业知识库实现多源文档的结构化入库；智慧搜索支持语义级精准检索，超越传统关键词匹配；证据追溯确保每一条答案都可溯源可验证。",
        "无论是学校的教学资源管理、企业的内部知识沉淀，还是研究团队的文献整合，AI知识库都是最适合快速落地的入口级产品。它不仅是搜索工具，更是企业知识资产的长期沉淀平台。",
      ],
    },
    "comic-creation": {
      title: "AI漫剧智能创作平台",
      subtitle: "AIGC内容生产的交互中枢",
      paragraphs: [
        "面向内容团队、MCN、创作者与工作室，我们的AI漫剧智能创作平台将创意流程全面数字化。通过无限画布，用户可以自由组织创作、分镜、资产与流程协作，实现从灵感到成品的无缝衔接。",
        "平台集成AI漫剧工作流，支持漫画与短剧的一体化创作；无界画布提供自由的创意编排空间；CLAW智能体驱动创作流程自动化；角色分镜资产管理让素材可复用、可追踪。",
        "我们的目标是提升短视频内容生产效率，降低创作与协作成本。让创作者专注于创意本身，将重复性工作交给AI，真正实现让从业者有尊严地创作。",
      ],
    },
    "digital-employee": {
      title: "企业数字员工系统",
      subtitle: "AI从工具到岗位能力的升维",
      paragraphs: [
        "数字员工是我们最具前瞻性的产品方向。它将AI能力包装成具体的岗位能力——导演、资料员、审核员、分析师——让AI不再是抽象的工具，而是可交付、可复盘、可管理的岗位角色。",
        "每个数字员工都具备标准化作业流程（SOP）、岗位专属技能集（Skill）、绑定的工作流（Workflow）、工具调用能力、过程审计追踪以及可复现的输出质量。",
        "对于企业和机构而言，数字员工意味着人力成本的可控优化、业务流程的标准化执行、以及AI能力的岗位化交付。这是AI真正进入组织运作核心的关键一步。",
      ],
    },
    "private-deployment": {
      title: "企业AI私有化部署",
      subtitle: "ToB商业交付的最后一公里",
      paragraphs: [
        "企业级AI应用的核心诉求是数据安全与自主可控。我们的私有化部署方案让AI系统真正进入组织内部，满足安全、权限与长期运营需求，是ToB商业交付的完整闭环。",
        "方案涵盖私有化部署与本地/专网环境交付、统一模型网关管理多模型路由、本地运行器确保敏感数据不出域、细粒度权限审计实现访问控制、以及企业数据接入对接内部数据源。",
        "面向学校、大型企业、政府与安全组织，我们提供端到端的私有化AI基础设施，让客户在享受AI能力的同时，完全掌控自己的数据与系统。",
      ],
    },
  },
};

// ============================================================
// Architecture (CinematicVision section)
// ============================================================

export interface ArchitectureConfig {
  sectionLabel: string;
  title: string;
  description: string;
}

export const architectureConfig: ArchitectureConfig = {
  sectionLabel: "架构愿景",
  title: "一个AI操作底座，两条业务落地主线",
  description: "以知识库、工作流、无限画布和智能体构成统一操作底座，向内容与知识生产、企业落地与交付两侧延展，并通过SaaS、系统集成和私有化部署进入真实业务。",
};

// ============================================================
// Audience & use cases
// ============================================================

export interface AudienceItem {
  title: string;
  description: string;
  capabilitySlug: string;
}

export interface AudienceConfig {
  sectionLabel: string;
  title: string;
  description: string;
  items: AudienceItem[];
}

export const audienceConfig: AudienceConfig = {
  sectionLabel: "适用场景",
  title: "面向不同组织，形成清晰的AI落地入口",
  description: "同一套AI底层能力，以知识库、智能创作、数字员工和私有化部署进入真实业务，并持续沉淀为组织能力。",
  items: [
    {
      title: "教育与研究机构",
      description: "整合教学资源、研究资料与文献，建立可检索、可追溯、可持续积累的知识资产。",
      capabilitySlug: "knowledge-search",
    },
    {
      title: "内容团队与创作者",
      description: "用无限画布和智能工作流组织漫剧、短视频、角色、分镜与创作资产。",
      capabilitySlug: "comic-creation",
    },
    {
      title: "企业业务团队",
      description: "将AI封装为资料员、审核员、导演等可管理、可复盘、可交付的数字岗位。",
      capabilitySlug: "digital-employee",
    },
    {
      title: "数据敏感型组织",
      description: "通过私有化部署、模型网关、本地运行与权限审计，让数据和系统保持自主可控。",
      capabilitySlug: "private-deployment",
    },
  ],
};

// ============================================================
// Delivery & collaboration
// ============================================================

export interface DeliveryMode {
  title: string;
  description: string;
}

export interface DeliveryStep {
  title: string;
  description: string;
}

export interface DeliveryConfig {
  sectionLabel: string;
  title: string;
  description: string;
  modes: DeliveryMode[];
  steps: DeliveryStep[];
}

export const deliveryConfig: DeliveryConfig = {
  sectionLabel: "交付方式",
  title: "从快速验证到组织级部署，匹配不同阶段的业务需求",
  description: "既可以从单一知识库或工作流开始，也可以围绕现有系统进行集成，并在数据安全要求较高的环境中完成私有化部署。",
  modes: [
    { title: "SaaS服务", description: "适合快速启动、验证场景与组织协作，以较低实施成本进入实际使用。" },
    { title: "API与系统集成", description: "将知识检索、工作流和智能体能力接入现有业务系统与数据来源。" },
    { title: "私有化部署", description: "面向本地或专网环境，结合模型网关、权限审计与本地运行保障数据可控。" },
  ],
  steps: [
    { title: "业务梳理", description: "明确目标、使用者、数据边界与衡量标准。" },
    { title: "最小场景验证", description: "选择一个高价值场景，完成可运行的原型验证。" },
    { title: "系统接入与部署", description: "连接资料、工具和权限体系，进入真实工作流程。" },
    { title: "运营与持续迭代", description: "基于使用反馈复盘效果，沉淀工作流与岗位能力。" },
  ],
};

// ============================================================
// Frequently asked questions
// ============================================================

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqConfig {
  sectionLabel: string;
  title: string;
  description: string;
  items: FaqItem[];
}

export const faqConfig: FaqConfig = {
  sectionLabel: "常见问题",
  title: "在启动企业AI项目前，你可能关心这些问题",
  description: "以下回答基于现有能力范围。具体模型、接口、部署环境与交付边界，将根据实际业务进一步确认。",
  items: [
    { question: "应该从哪个方向开始？", answer: "如果组织内资料分散、检索困难，AI知识库通常是清晰的切入点；如果已有稳定流程，可以进一步引入工作流与数字员工；如果数据不能出域，则应从私有化部署方案开始评估。" },
    { question: "是否支持企业私有化部署？", answer: "支持。方案可面向本地或专网环境，结合模型网关、本地运行器、企业数据接入、权限控制与审计能力进行部署。" },
    { question: "能否对接现有数据和业务系统？", answer: "现有体系支持企业数据接入、API输出、模型网关和工具调用。具体可对接的数据源、接口形式和权限范围，会在业务梳理阶段根据现有系统确认。" },
    { question: "数字员工与普通AI助手有什么不同？", answer: "数字员工围绕具体岗位设计，具备标准作业流程、岗位技能、绑定工作流、工具调用与过程审计，更强调稳定交付、复盘和管理。" },
    { question: "内容团队可以使用哪些能力？", answer: "AI漫剧智能创作平台提供无限画布、角色与分镜资产管理、智能工作流和CLAW智能体能力，适合漫剧、短视频及相关内容生产协作。" },
    { question: "如何开始沟通？", answer: "可以直接拨打页面底部的联系电话。建议先准备一个明确业务场景、当前资料或系统情况，以及希望解决的核心问题。" },
  ],
};

// ============================================================
// Research (AlumniArchives section)
// ============================================================

export interface ResearchProject {
  title: string;
  year: string;
  discipline: string;
}

export interface ResearchConfig {
  sectionLabel: string;
  projects: ResearchProject[];
}

export const researchConfig: ResearchConfig = {
  sectionLabel: "产品矩阵",
  projects: [
    {
      title: "AI知识库",
      year: "2026",
      discipline: "核心能力层 · 数据底座",
    },
    {
      title: "AI工作流",
      year: "2026",
      discipline: "核心能力层 · 执行引擎",
    },
    {
      title: "AI无限画布",
      year: "2026",
      discipline: "核心能力层 · 交互界面",
    },
    {
      title: "AI智能体",
      year: "2026",
      discipline: "核心能力层 · 操作大脑",
    },
    {
      title: "数字员工",
      year: "2026",
      discipline: "产品封装层 · 岗位交付",
    },
    {
      title: "私有化部署",
      year: "2026",
      discipline: "商业交付层 · 企业交付",
    },
    {
      title: "CLAW Agent",
      year: "2026",
      discipline: "智能体框架 · 任务编排",
    },
    {
      title: "蓝图工作流",
      year: "2026",
      discipline: "流程引擎 · 节点编排",
    },
    {
      title: "漫剧画布",
      year: "2026",
      discipline: "创作工具 · 分镜管理",
    },
    {
      title: "模型网关",
      year: "2026",
      discipline: "基础设施 · 模型路由",
    },
    {
      title: "证据追溯",
      year: "2026",
      discipline: "知识库 · 可验证AI",
    },
    {
      title: "LuminaFlow",
      year: "2026",
      discipline: "影像引擎 · 流光生成",
    },
  ],
};

// ============================================================
// Footer
// ============================================================

export interface FooterLinkColumn {
  title: string;
  links: string[];
}

export interface FooterBottomLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  heading: string;
  columns: FooterLinkColumn[];
  copyright: string;
  bottomLinks: FooterBottomLink[];
}

export const footerConfig: FooterConfig = {
  heading: "团结、活泼、不严肃、不紧张，我们一起同行！",
  columns: [
    {
      title: "公司信息",
      links: [
        "西安东途大糖人工智能科技有限公司",
        "焱启森途（西安）信息技术服务有限公司",
        "IgnisPath Labs",
        "U·V·W AIGC Studios",
      ],
    },
    {
      title: "能力体系",
      links: [
        "AI知识库与智慧搜索",
        "AI漫剧智能创作平台",
        "企业数字员工系统",
        "企业AI私有化部署",
      ],
    },
    {
      title: "联系我们",
      links: [
        "兰先生 18681814554",
      ],
    },
  ],
  copyright: "\u00A9 2026 西安东途大糖人工智能科技有限公司 · 焱启森途(西安)信息技术服务有限公司. All rights reserved.",
  bottomLinks: [
    { label: "品牌理念", href: "#hero" },
    { label: "联系我们", href: "#footer" },
  ],
};

// ============================================================
// About page (关于我们)
// ============================================================

export interface AboutFact {
  label: string;
  value: string;
}

export interface AboutProfile {
  title: string;
  paragraphs: string[];
  facts: AboutFact[];
}

export interface AboutMilestone {
  year: string;
  code: string;
  title: string;
  description: string;
  tags: string[];
}

export interface AboutHistory {
  title: string;
  description: string;
  milestones: AboutMilestone[];
}

export interface AboutSubNavItem {
  id: string;
  index: string;
  label: string;
  meta: string;
  path: string;
  lead: string;
}

export interface AboutPageConfig {
  sectionLabel: string;
  title: string;
  subNav: AboutSubNavItem[];
  profile: AboutProfile;
  history: AboutHistory;
}

export const aboutPageConfig: AboutPageConfig = {
  sectionLabel: "ABOUT / 关于我们",
  title: "关于我们",
  subNav: [
    {
      id: "profile",
      index: "01",
      label: "企业简介",
      meta: "COMPANY PROFILE",
      path: "/about/profile",
      lead: "焱启森途是一支以AI操作体系为核心的团队。我们围绕知识、内容、流程与组织协作，把AI底层能力封装成能够进入真实业务、被组织长期使用的系统。",
    },
    {
      id: "history",
      index: "02",
      label: "发展历程",
      meta: "MILESTONES",
      path: "/about/history",
      lead: "从一支做影像与知识工程的团队，到形成完整的AI操作体系，我们把每一步都沉淀为可复用的能力。",
    },
    {
      id: "team",
      index: "03",
      label: "核心团队",
      meta: "TEAM",
      path: "/about/team",
      lead: "团队由研究、工程与内容三部分组成。我们把「研究提出问题、工程负责验证、内容检验成品」当作日常的协作方式。",
    },
  ],
  profile: {
    title: "企业简介",
    paragraphs: [
      "西安东途大糖人工智能科技有限公司与焱启森途（西安）信息技术服务有限公司，是面向企业与机构提供人工智能应用落地服务的科技团队。旗下 U·V·W AIGC Studios 负责影像与内容侧的产品研发，IgnisPath Labs 负责AI底座、智能体与工程化交付，两条主线共同构成一套可落地、可运营的AI操作体系。",
      "我们不把AI当成单点工具，而是按“底座—封装—交付”三层推进：底层是AI知识库与智慧搜索、工作流引擎、无限画布与智能体；中间层是AI漫剧智能创作平台与企业数字员工系统；最上层通过SaaS服务、API与系统集成、私有化部署三种方式进入客户的真实业务环境。",
      "我们关注的不只是生成结果，更关注数据如何沉淀、流程如何复用、权限如何管理、系统如何长期运行。因此在每一条产品线里，知识可沉淀、流程可编排、过程可审计、系统可部署，都是默认的设计前提，而不是附加选项。",
      "面向学校、企业与研究机构，我们从一个个具体场景开始：先把分散资料变成可检索、可追溯的知识资产，再把稳定的操作固化为工作流与岗位能力，最终让AI成为组织自身可以维护和演进的一部分。",
    ],
    facts: [
      { label: "BASE / 所在地", value: "陕西 · 西安" },
      { label: "FOCUS / 方向", value: "企业AI操作体系" },
      { label: "PRODUCTS / 产品线", value: "知识库 · 创作平台 · 数字员工 · 私有化" },
      { label: "DELIVERY / 交付", value: "SaaS · API集成 · 私有化部署" },
    ],
  },
  history: {
    title: "发展历程",
    description: "从一支做影像与知识工程的团队，到形成完整的AI操作体系，我们把每一步都沉淀为可复用的能力。",
    milestones: [
      {
        year: "2024",
        code: "REV 0.1",
        title: "团队起步，方向确立",
        description:
          "团队在西安组建，从AIGC影像创作与知识工程两个方向切入，确立“不做单点工具，做可沉淀的AI操作体系”的技术路线。",
        tags: ["团队组建", "技术选型", "影像创作"],
      },
      {
        year: "2025",
        code: "REV 0.5",
        title: "四项底层能力成型",
        description:
          "完成AI知识库与智慧搜索、AI工作流、AI无限画布、AI智能体四项底层能力的验证，形成“知识—流程—交互—执行”的完整底座。",
        tags: ["知识库", "工作流", "无限画布", "智能体"],
      },
      {
        year: "2025",
        code: "REV 0.8",
        title: "产品封装，进入内容生产",
        description:
          "推出AI漫剧智能创作平台与企业数字员工系统，把底层能力封装为内容团队与业务团队可以直接使用的产品形态，形成岗位化交付方法。",
        tags: ["漫剧创作", "数字员工", "岗位交付"],
      },
      {
        year: "2026",
        code: "REV 1.0",
        title: "私有化交付落地",
        description:
          "完成企业AI私有化部署方案，模型网关、本地运行器、企业数据接入与权限审计进入真实业务环境，打通ToB交付的最后一公里。",
        tags: ["私有化部署", "模型网关", "权限审计"],
      },
      {
        year: "2026",
        code: "REV 1.2",
        title: "阶段成果与外部认可",
        description:
          "团队成员在“ETF新势界高校挑战赛”中取得阶段成果，并获THE ETF FRONTIER称号。我们把真实赛事经验继续沉淀为可复用的内容与协作工作流。",
        tags: ["团队荣誉", "内容创新", "协同研究"],
      },
    ],
  },
};

// ============================================================
// Careers page (加入我们)
// ============================================================

export type RecruitChannel = "social" | "campus";

export interface CareerHighlight {
  label: string;
  value: string;
}

export interface CareerPosition {
  title: string;
  channel: RecruitChannel;
  team: string;
  location: string;
  mode: string;
  responsibilities: string[];
  tags: string[];
}

export interface WorkspaceShot {
  image: string;
  alt: string;
  code: string;
  caption: string;
}

export interface WorkspacePage {
  code: string;
  title: string;
  shots: WorkspaceShot[];
}

export interface CareersSubNavItem {
  id: string;
  index: string;
  label: string;
  meta: string;
  path: string;
}

export interface CareersPageConfig {
  sectionLabel: string;
  hero: {
    title: string;
    lead: string;
  };
  subNav: CareersSubNavItem[];
  highlights: CareerHighlight[];
  channels: { id: RecruitChannel; label: string; description: string }[];
  emptyText: string;
  positions: CareerPosition[];
  notice: { label: string; title: string; paragraphs: string[]; contact: string };
  workspace: {
    label: string;
    title: string;
    description: string;
    pages: WorkspacePage[];
  };
}

export const careersPageConfig: CareersPageConfig = {
  sectionLabel: "CAREERS / 加入我们",
  hero: {
    title: "加入焱启森途",
    lead:
      "我们相信技术的价值来自使用它的人。这里没有把AI当作口号的项目，只有把知识、内容与流程真正做进业务现场的工程。如果你也希望技术有温度、影视有深度、从业者有尊严，欢迎加入。",
  },
  subNav: [
    { id: "positions", index: "01", label: "招聘岗位", meta: "OPENINGS", path: "/careers/positions" },
    { id: "workspace", index: "02", label: "工作环境", meta: "WORKSPACE", path: "/careers/workspace" },
  ],
  highlights: [
    { label: "BASE", value: "西安" },
    { label: "MODE", value: "全职 / 实习" },
    { label: "STACK", value: "AI应用 · 内容工程 · 私有化" },
    { label: "CULTURE", value: "团结 · 活泼 · 不严肃 · 不紧张" },
  ],
  channels: [
    { id: "social", label: "社会招聘", description: "面向有项目经验的工程师、产品与内容伙伴，直接进入产品研发与客户交付。" },
    { id: "campus", label: "校园招聘", description: "面向在校生与应届毕业生，提供实习转正通道与完整的项目带教。" },
  ],
  emptyText: "该通道当前暂无开放岗位，欢迎通过页面底部联系方式投递简历。",
  positions: [
    {
      title: "AI应用工程师（RAG / 智能体方向）",
      channel: "social",
      team: "IgnisPath Labs · 底座与智能体",
      location: "西安",
      mode: "全职",
      responsibilities: [
        "负责知识库检索链路、文档解析与语义召回效果的迭代",
        "基于工作流与智能体框架实现可复用的业务自动化能力",
        "参与私有化环境下的模型网关与本地运行器接入",
      ],
      tags: ["RAG", "Python", "工作流", "私有化"],
    },
    {
      title: "前端工程师（React / 可视化）",
      channel: "social",
      team: "IgnisPath Labs · 产品前端",
      location: "西安",
      mode: "全职",
      responsibilities: [
        "负责无限画布、工作流编排等复杂交互界面的研发与性能优化",
        "与设计、后端协作打磨面向内容团队与企业客户的操作体验",
        "参与组件库与前端工程化的持续建设",
      ],
      tags: ["React", "TypeScript", "Canvas", "可视化"],
    },
    {
      title: "AI产品经理（企业智能方向）",
      channel: "social",
      team: "产品与交付",
      location: "西安",
      mode: "全职",
      responsibilities: [
        "梳理客户业务场景，输出知识库、数字员工等方向的落地方案",
        "定义产品边界与验收标准，推动最小场景验证到系统上线",
        "沉淀岗位化交付模板与实施方法论",
      ],
      tags: ["需求梳理", "AI产品", "ToB交付"],
    },
    {
      title: "内容创作与分镜设计",
      channel: "social",
      team: "U·V·W AIGC Studios",
      location: "西安",
      mode: "全职",
      responsibilities: [
        "负责漫剧与短视频的剧本、分镜与视觉风格设计",
        "使用AI漫剧智能创作平台完成创意到成片的流程协作",
        "沉淀角色、分镜与素材资产库，提升内容复用效率",
      ],
      tags: ["分镜", "AIGC创作", "资产管理"],
    },
    {
      title: "AI算法实习生",
      channel: "campus",
      team: "IgnisPath Labs",
      location: "西安",
      mode: "实习 · 可转正",
      responsibilities: [
        "参与检索效果评测、数据处理与实验记录",
        "协助复现与调优生成式模型在内容场景中的应用",
      ],
      tags: ["机器学习", "评测", "数据处理"],
    },
    {
      title: "前端开发实习生",
      channel: "campus",
      team: "产品前端",
      location: "西安",
      mode: "实习 · 可转正",
      responsibilities: [
        "参与组件开发、页面还原与交互细节打磨",
        "在带教下完成一个独立模块的迭代与上线",
      ],
      tags: ["React", "CSS", "工程实践"],
    },
    {
      title: "产品与运营实习生",
      channel: "campus",
      team: "产品与交付",
      location: "西安",
      mode: "实习 · 可转正",
      responsibilities: [
        "协助整理客户资料、场景调研与竞品分析",
        "参与产品文档、演示材料与用户反馈的整理",
      ],
      tags: ["调研", "文档", "用户反馈"],
    },
    {
      title: "影视后期实习生",
      channel: "campus",
      team: "U·V·W AIGC Studios",
      location: "西安",
      mode: "实习 · 可转正",
      responsibilities: [
        "参与剪辑、调色与声音整理等后期环节",
        "协助维护素材库与成片归档规范",
      ],
      tags: ["剪辑", "调色", "素材管理"],
    },
  ],
  notice: {
    label: "NOTICE / 郑重提示",
    title: "招聘全程不收取任何费用",
    paragraphs: [
      "焱启森途及旗下团队在招聘过程中，均通过官方邮箱与官方电话开展沟通，不会向求职者发送任何链接要求下载APP，也不会以任何名义向求职者索取费用或骗取个人信息，更不会要求您加入任何工作群。",
      "如收到以本公司名义发布的异常信息，请通过本页面公布的联系电话核实。特此提示。",
    ],
    contact: "186 8181 4554",
  },
  workspace: {
    label: "WORKSPACE / 工作环境",
    title: "工作环境",
    description: "开放工位、协作空间与部署环境相邻布置，研究与交付在同一层发生。以下为空间布局示意。",
    pages: [
      {
        code: "PAGE 01",
        title: "研发与创作",
        shots: [
          { image: assetUrl("/images/workspace-01.svg"), alt: "开放办公区布局示意", code: "WS-01", caption: "开放办公区 · 工位与任务灯带" },
          { image: assetUrl("/images/workspace-03.svg"), alt: "创作工位布局示意", code: "WS-03", caption: "创作工位 · 无限画布与分镜台" },
          { image: assetUrl("/images/workspace-08.svg"), alt: "专注舱布局示意", code: "WS-08", caption: "专注舱 · 深度工作与安静工位" },
          { image: assetUrl("/images/workspace-02.svg"), alt: "协作讨论区布局示意", code: "WS-02", caption: "协作讨论区 · 圆桌与投屏墙" },
        ],
      },
      {
        code: "PAGE 02",
        title: "交付与交流",
        shots: [
          { image: assetUrl("/images/workspace-04.svg"), alt: "部署机房布局示意", code: "WS-04", caption: "部署机房 · 本地运行与模型网关" },
          { image: assetUrl("/images/workspace-05.svg"), alt: "展示厅布局示意", code: "WS-05", caption: "展示厅 · 成果墙与体验动线" },
          { image: assetUrl("/images/workspace-07.svg"), alt: "前台接待布局示意", code: "WS-07", caption: "前台接待 · 品牌墙与访客动线" },
          { image: assetUrl("/images/workspace-06.svg"), alt: "休息区布局示意", code: "WS-06", caption: "休息区 · 绿植与自由交流" },
        ],
      },
    ],
  },
};

// ============================================================
// Achievements
// ============================================================

export interface AchievementItem {
  image: string;
  alt: string;
  fullWidth?: boolean;
}

export interface AchievementsConfig {
  title: string;
  subtitle: string;
  items: AchievementItem[];
}

export const achievementsConfig: AchievementsConfig = {
  title: "获得成果",
  subtitle: "荣誉见证实力，每一份认可都是前行的动力",
  items: [
    {
      image: assetUrl("/images/certificate1.png"),
      alt: "张棪森 - ETF新势界THE ETF FRONTIER称号",
    },
    {
      image: assetUrl("/images/certificate2.png"),
      alt: "张博琛 - ETF新势界THE ETF FRONTIER称号",
    },
    {
      image: assetUrl("/images/group-photo-optimized.jpg"),
      alt: "ETF新势界高校挑战赛合影",
      fullWidth: true,
    },
  ],
};

// ============================================================
// Products (关于产品)
// ============================================================

export interface ProductMetric {
  label: string;
  value: string;
}

export interface ProductModule {
  code: string;
  title: string;
  description: string;
}

export interface ProductShot {
  image: string;
  alt: string;
  code: string;
  caption: string;
}

export interface ProductDoc {
  label: string;
  title: string;
  description: string;
  meta: string;
  href: string;
}

export interface ProductComparisonRow {
  problem: string;
  solution: string;
}

export interface Product {
  slug: string;
  index: string;
  mark?: string;
  name: string;
  nameEn: string;
  tagline: string;
  category: string;
  summary: string;
  description: string[];
  audience: string[];
  metrics: ProductMetric[];
  flow: string[];
  comparisonTitle: string;
  comparison: ProductComparisonRow[];
  modulesTitle: string;
  modules: ProductModule[];
  shots: ProductShot[];
  docs: ProductDoc[];
  operator: string;
  status: string;
}

export interface ProductsPageConfig {
  sectionLabel: string;
  title: string;
  lead: string;
  note: string;
  items: Product[];
}

export const productsPageConfig: ProductsPageConfig = {
  sectionLabel: "PRODUCTS / 关于产品",
  title: "多核心产品引擎",
  lead:
    "我们目前专注开发两款产品：Semantic OS 负责把知识与工具编排成可运行的智能工作流，泓儒 OPC 负责把 AI 内容生产变成一条完整的创作生产线。两款产品共用同一套 AI 底座与工程化交付方式。",
  note: "产品持续迭代中，最新能力与版本以实际演示为准。",
  items: [
    {
      slug: "semantic-os",
      index: "01",
      mark: assetUrl("/images/products/semantic-os/semantic-os-mark-amber.png"),
      name: "Semantic OS",
      nameEn: "SEMANTIC OPERATING SYSTEM",
      tagline: "语义驱动 · 智能协同",
      category: "智能工作流与智能体编排平台",
      summary:
        "把项目、工作流、节点、数据源、知识库、智能体与模型路由收拢在同一个平台，让复杂任务以可视化工作流的方式被编排、运行与追溯。",
      description: [
        "Semantic OS 是团队持续开发的核心平台。它把「项目 → 工作流 → 节点」当作最小生产单元：一次研究、一条内容生产线、一套数据流程，都可以被画成一张可运行的工作流，节点之间的依赖关系清晰可见。",
        "平台把模型能力、数据源、知识库与智能体统一编排：底层由模型与路由接入本地与公网模型，中间层由数据中心与知识中心提供数据与语义支撑，上层在 Agent 运行时中查看每一次执行的进度、成功率与产物。",
        "它回答的始终是同一类问题：当知识与工具越来越复杂，如何让 AI 从「回答问题」进一步走向「协助完成事情」。FinWorld 金融世界模型智能投研平台，就是基于 Semantic OS 构建的一个完整示例应用。",
      ],
      audience: ["企业与研究团队", "数据与知识密集型业务", "需要私有化部署的机构"],
      metrics: [
        { label: "组织结构", value: "项目 · 工作流 · 节点 三层" },
        { label: "节点中心", value: "数据源 / 处理 / 模型 / 输出" },
        { label: "模型接入", value: "本地模型与公网模型统一路由" },
        { label: "交付方式", value: "私有化部署 · 权限与审计" },
      ],
      flow: ["数据输入", "数据清洗", "特征工程", "模型推理", "结果输出", "可视化 / 报告"],
      comparisonTitle: "它解决的问题",
      comparison: [
        { problem: "流程散落在脚本与个人电脑里，换人就要重来", solution: "工作流与节点统一沉淀，节点配置可复用、可追溯" },
        { problem: "多个平台的模型各自为政，能力无法组合", solution: "模型与路由统一接入，按节点选用合适的能力" },
        { problem: "执行过程不可见，失败原因说不清", solution: "Agent 运行时记录状态、成功率与耗时，逐次可查" },
        { problem: "每来一个数据源都要重新对接一次", solution: "数据中心统一管理数据库、接口、缓存与文件系统连接" },
      ],
      modulesTitle: "平台模块",
      modules: [
        { code: "M01", title: "首页概览", description: "项目数、工作流数、节点总数与运行中任务一屏掌握，并实时显示服务状态、CPU 与内存使用率。" },
        { code: "M02", title: "项目管理", description: "按项目管理全部工作空间与工作流。FinWorld 投研系统、Tushare 数据分析、市场情绪监控、策略回测框架等，都以项目形式组织。" },
        { code: "M03", title: "工作流与节点编排", description: "在画布上用节点与连线声明生产顺序，节点可配置输入输出端口与运行参数，支持保存、运行与发布。" },
        { code: "M04", title: "节点中心", description: "数据源、处理、模型、输出四类节点的统一管理与复用统计，常用节点一次沉淀、多处调用。" },
        { code: "M05", title: "数据中心", description: "统一管理数据库、API 接口、缓存与本地文件系统等数据连接，为工作流提供稳定的数据入口。" },
        { code: "M06", title: "知识中心", description: "承载知识图谱与语义检索能力，把分散资料组织成可被机器理解与调用的语义结构。" },
        { code: "M07", title: "Agent 运行时", description: "监控与管理智能体执行状态，查看运行中、已完成与失败任务的成功率与耗时。" },
        { code: "M08", title: "模型与路由", description: "统一配置大模型与路由策略，本地部署模型与公网模型可同时接入，按任务选择通道。" },
        { code: "M09", title: "系统设置", description: "成员、角色权限与平台基础配置，数据按团队与项目隔离。" },
      ],
      shots: [
        {
          image: assetUrl("/images/founder/semantic-os-console.jpg"),
          alt: "Semantic OS 平台界面总览",
          code: "UI-01",
          caption: "登录、首页概览、项目管理、工作流编排、节点中心、数据中心、Agent 运行时与模型管理",
        },
      ],
      docs: [
        {
          label: "DOC / 产品说明",
          title: "FinWorld 金融世界模型智能投研平台 · 产品说明（对外版）",
          description:
            "FinWorld 是基于 Semantic OS 构建的示例应用，文档完整记录了从现实感知、世界推导到市场验证的产品思路与已落地能力。",
          meta: "PDF · V1.0 · 2026 年 9 月",
          href: "/docs/finworld-product-brief.pdf",
        },
      ],
      operator: "焱启森途 · IgnisPath Labs",
      status: "持续迭代中 · 参赛第八届中国研究生人工智能创新大赛",
    },
    {
      slug: "hongru-opc",
      index: "02",
      name: "泓儒 OPC",
      nameEn: "HONGRU AI CREATIVE STUDIO",
      tagline: "让每一个想法，都能成为精彩的短剧",
      category: "一站式 AI 短剧创作平台",
      summary:
        "把「剧本 → 人物与场景设定 → 分镜 → 视频生成 → 成片合成 → 审核发布」的完整生产流程，收拢在一块可视化创作画布上完成。",
      description: [
        "泓儒 OPC 面向短剧制作公司、MCN 机构、AI 影视创作者与导演、影视教培机构以及品牌内容团队：既服务于个人创作者的「一个人做一部剧」，也服务于企业团队的规模化内容生产与统一结算。",
        "平台把专业制作流程翻译成看得见的节点。创作者不需要理解任何技术概念，照着画布从左到右推进即可完成一部短剧；每个节点都是独立的对话工作区，用自然语言反复打磨，用 @ 引用已有素材参与生成，全部生成结果真实入库、随时可追溯。",
        "人物、场景、物品素材资产化，一次设定、全片复用，并支持团队共享资产库；节点之间用连线声明依赖，上游一改、下游自动标记失效，避免「改了剧本、分镜还是旧版」的隐性错误。",
      ],
      audience: ["短剧制作公司 · MCN 机构", "AI 影视创作者与导演", "影视教培机构 · 品牌内容团队"],
      metrics: [
        { label: "创作链路", value: "剧本 → 分镜 → 视频 → 成片 → 发布" },
        { label: "节点分组", value: "基本节点 / 特色节点 / 生产节点" },
        { label: "团队能力", value: "成员角色 · 共享资产库 · 企业门户" },
        { label: "交付方式", value: "SaaS · 团队账号 · 企业白牌定制" },
      ],
      flow: ["剧本", "人物与场景设定", "分镜", "视频生成", "成片合成", "审核发布"],
      comparisonTitle: "常见痛点与做法",
      comparison: [
        { problem: "AI 工具分散，脚本、出图、出片要来回切换多个平台", solution: "一个平台、一个画布，从文字到视频的每一种生成能力都在同一个工作区里" },
        { problem: "角色、场景前后不一致，观众一眼出戏", solution: "人物 / 场景 / 物品素材资产化，一次设定、全片复用，支持团队共享资产库" },
        { problem: "改一处要重做一片，返工成本高", solution: "节点之间用连线声明依赖，上游一改、下游自动标记失效，避免无效劳动" },
        { problem: "素材与进度散落在个人电脑里，团队协作靠传文件", solution: "项目、剧集、素材、任务、额度按团队统一管理，成员分工明确" },
        { problem: "AI 用量和费用算不清，越用越心慌", solution: "按实际生成用量扣积分，订单、余额、消耗看得见" },
      ],
      modulesTitle: "核心功能",
      modules: [
        { code: "F01", title: "创作画布：节点与连线", description: "剧本、人物、场景、物品、分镜、视频、成片都在同一张无限画布上，生产顺序一目了然，可导出成片、也可随时回溯历史版本。" },
        { code: "F02", title: "节点对话式创作与 @ 引用", description: "每个节点都是一个独立的对话工作区，用自然语言描述修改要求，用 @ 引用已有素材参与生成，结果可直接拖到画布沉淀为素材。" },
        { code: "F03", title: "生成任务与进度管理", description: "视频类任务进入队列后台执行，排队中、执行中、成功与失败集中展示；失败任务给出可定位原因，并有防重机制避免重复扣费。" },
        { code: "F04", title: "成片导出与发布", description: "逐集完整预览、核对集数与画面，勾选需要保存的分镜一键导出；确认无误后再进入发布中心执行发布。" },
        { code: "F05", title: "能力与模型配置", description: "管理员在设置中心统一管理可用能力，为剧本、角色图、场景图、分镜视频、配音等环节分别指定默认模型，并查看调用量与成功率。" },
        { code: "F06", title: "原创剧情工坊与 AI 文本精修", description: "从一句创意出发生成故事大纲、人物小传与分集剧情，支持章节化续写与改写；文本精修用于定稿前的风格统一与台词打磨。" },
        { code: "F07", title: "算力中心", description: "提供更高性能的推理与视频生成能力，适合大批量出片、更高分辨率与更复杂镜头的创作需求，与创作画布同账号体系。" },
        { code: "F08", title: "团队协作与企业服务", description: "团队账号按管理员、创作者、只读成员分权；项目与剧集级协作、团队共享资产库、企业门户经营看板与白牌定制交付。" },
      ],
      shots: [
        {
          image: assetUrl("/images/products/hongru-opc/opc-portal.jpg"),
          alt: "泓儒 OPC 平台门户首页",
          code: "UI-01",
          caption: "平台门户：创作画布与算力中心双入口，含精选作品与创作者展示",
        },
        {
          image: assetUrl("/images/products/hongru-opc/opc-canvas.jpg"),
          alt: "泓儒 OPC 创作画布界面",
          code: "UI-02",
          caption: "创作画布：把剧本、人物、场景、分镜与生成素材放进同一个可视化工作区",
        },
      ],
      docs: [
        {
          label: "DOC / 操作手册",
          title: "泓儒 OPC · AI 短剧创作平台 产品介绍与操作手册",
          description:
            "包含平台定位、作品案例、快速上手、核心功能操作详解、团队协作与企业服务、代理合作与积分说明，共八章。",
          meta: "PDF · V1.0 · 2026 年 9 月",
          href: "/docs/hongru-opc-manual.pdf",
        },
      ],
      operator: "陕西鑫泰合力科技有限责任公司 · www.hongruaimovie.com",
      status: "V1.0 已上线 · 支持团队与企业白牌交付",
    },
  ],
};

// ============================================================
// Team (核心团队)
// ============================================================

export interface FounderFact {
  label: string;
  value: string;
}

export interface FounderShot {
  image: string;
  alt: string;
  caption: string;
}

export interface FounderSection {
  code: string;
  title: string;
  paragraphs: string[];
  quote?: string;
  shots?: FounderShot[];
}

export interface FounderJourneyStep {
  label: string;
  title: string;
  description: string;
}

export interface FounderEvidence {
  title: string;
  description: string;
  meta: string;
  image?: string;
}

export interface Founder {
  slug: string;
  index: string;
  name: string;
  nameEn: string;
  role: string;
  identity: string;
  lead: string;
  portrait?: string;
  facts: FounderFact[];
  sections: FounderSection[];
  journey: FounderJourneyStep[];
  evidences: FounderEvidence[];
}

export interface TeamPageConfig {
  sectionLabel: string;
  title: string;
  lead: string;
  intro: string;
  note: string;
  openCall: string;
  members: Founder[];
}

export const teamPageConfig: TeamPageConfig = {
  sectionLabel: "TEAM / 核心团队",
  title: "核心团队",
  lead:
    "团队由研究、工程与内容三部分组成，成员大多来自文化遗产数字化、AI 工程与影视创作背景。我们把「研究提出问题、工程负责验证、内容检验成品」当作日常协作方式。",
  intro: "以下为核心创始人资料。团队成员将陆续补充，页面结构与内容会持续更新。",
  note: "MORE PROFILES / 持续补充中",
  openCall: "团队其他成员的人物志正在整理，后续会陆续加入这一页。",
  members: [
    {
      slug: "zhangyansen",
      index: "01",
      name: "张棪森",
      nameEn: "ZHANG YANSEN",
      role: "核心创始人",
      identity: "博士研究生 · 创业实践者 · AI 产品构建者",
      lead:
        "他的起点是文化遗产数字化。一次次真实项目让他逐渐关注到：当知识、工具和工作流程越来越复杂，AI 能否从「回答问题」进一步走向「协助完成事情」？从文化遗产、内容生产到金融研究，他把这些不同场景都当作持续验证这一问题的实践。",
      portrait: assetUrl("/images/founder/zhangyansen-portrait.jpg"),
      facts: [
        { label: "当前身份", value: "西安建筑科技大学博士研究生（博一）" },
        { label: "研究方向", value: "文化遗产数字化保护、知识组织与 AI 交叉应用" },
        { label: "代表经历", value: "第七届中国研究生人工智能创新大赛全国二等奖；文化遗产数字化项目形成软件著作权与景区应用证明" },
        { label: "创业实践", value: "2026 年 3 月起参与 AI 创业，面向企业落地 AI 创作平台、数字员工与个人智能助手" },
        { label: "核心项目", value: "洛书智遗·园启 App / 泓儒 OPC / Semantic OS / FinWorld" },
        { label: "关注命题", value: "AI 应用、智能系统、人机协作与个人能力增强" },
      ],
      sections: [
        {
          code: "01 / HERITAGE",
          title: "起点不是 AI，而是文化遗产",
          paragraphs: [
            "硕士阶段，张棪森开始尝试把 AI 引入文化遗产数字化研究。最初的目标很具体：让公众面对古建筑、遗迹与历史空间时，能够更方便地获得背景知识，并让数字工具真正服务于文化传播和科研工作。",
            "这个想法后来形成了「洛书智遗·园启 App」。项目面向游客端与科研端设计了不同功能，希望把智能讲解、互动体验与科研反馈放进同一套数字服务中。在开发过程中，他开始接触文化遗产知识图谱与知识组织方法——相比单纯做一个展示 App，这段经历更重要的意义，是让他开始思考复杂知识怎样被机器理解和连接。",
            "这段经历也把他的关注点从一次数字展示实践，逐渐推向更广泛的智能系统探索：AI 不仅要能生成内容，还要能理解知识之间的联系，并在真实任务中持续发挥作用。",
          ],
          quote: "那一次，他第一次真正意识到：AI 的价值，不只是生成内容，而是把专业知识转译成普通人能够理解、能够使用的能力。",
          shots: [
            {
              image: assetUrl("/images/founder/looshage-dual.jpg"),
              alt: "洛书智遗·园启 App 游客端与科研端界面",
              caption: "洛书智遗·园启 App：左侧面向游客端提供智能导览与交互体验，右侧面向科研端服务遗产价值评估与量化分析",
            },
            {
              image: assetUrl("/images/founder/looshage-system.jpg"),
              alt: "洛书智遗·园启 App 双端体系",
              caption: "硕士阶段文化遗产数字化项目：以游客端与科研端双端体系连接文化遗产知识传播与研究反馈",
            },
          ],
        },
        {
          code: "02 / KNOWLEDGE",
          title: "从知识组织，到更通用的 AI 问题",
          paragraphs: [
            "文化遗产数字化有一个很典型的特点：资料来源多、知识跨度大，而且人物、事件、空间与历史背景之间往往互相关联。为了让这些信息不再只是零散材料，他开始尝试使用知识图谱等方法进行组织。",
            "这段实践逐渐让他意识到，一个真正有用的 AI 系统，不能只是在需要时「查到一段资料」，还要能够在不同任务中持续理解上下文，并连接合适的知识和工具。",
            "后来，这个问题被带到了更多场景：内容创作、个人助手、金融研究以及日常知识工作。Semantic OS 也正是在这样的连续实践中逐渐形成。",
          ],
          quote: "对我来说，Semantic OS 更像是长期实践中自然长出来的一个方向，而不是一开始就设计好的答案。",
        },
        {
          code: "03 / PRODUCTION",
          title: "从西安出发：把 AI 真正用进生产流程",
          paragraphs: [
            "2026 年 3 月，张棪森开始把更多精力投入创业与 AI 产品落地。对他来说，这一步并不是从学术研究突然「转行」，而是把此前在文化遗产数字化中形成的知识组织与系统化思考，带进更真实、更高频的商业场景。",
            "其中一个重要方向，是近期与合作团队共同参与打造的泓儒 OPC · AI 短剧创作平台。平台围绕「剧本 → 人物与场景设定 → 分镜 → 视频生成 → 成片合成 → 审核发布」的创作链路展开，并通过可视化画布把不同创作环节组织在一起：对个人创作者，它降低从想法到成片的操作门槛；对团队，它提供项目、素材和协作管理能力。",
            "这次产品实践让他对「AI 落地」有了更具体的理解：真正有价值的产品，不只是接入更多模型，而是把复杂能力重新组织成用户能够直接理解和使用的工作方式。",
          ],
          shots: [
            {
              image: assetUrl("/images/products/hongru-opc/opc-portal.jpg"),
              alt: "泓儒 OPC 平台门户首页",
              caption: "泓儒 OPC · AI 短剧创作平台首页，以「让每一个想法，都能成为精彩的短剧」为产品主张",
            },
            {
              image: assetUrl("/images/products/hongru-opc/opc-canvas.jpg"),
              alt: "泓儒 OPC 创作画布",
              caption: "创作画布：把剧本、人物、场景、分镜与生成素材放进同一个可视化工作区",
            },
          ],
        },
        {
          code: "04 / SEMANTIC OS",
          title: "Semantic OS：把 AI 变成更长期的个人能力",
          paragraphs: [
            "Semantic OS 是他和团队正在持续开发的一项核心项目。它受到早期文化遗产知识组织实践的启发，但目标已经扩展到更广泛的知识工作与个人智能协作场景。",
            "项目希望让 AI 不再只是一个被动回答问题的工具，而是能够更自然地连接个人知识、软件工具与工作任务，帮助用户减少重复操作，把更多精力放在创意、判断与决策上。2026 年，Semantic OS 作为团队新的 AI 项目方向参加第八届中国研究生人工智能创新大赛，继续接受来自赛事环境的外部检验。",
          ],
          shots: [
            {
              image: assetUrl("/images/founder/semantic-os-console.jpg"),
              alt: "Semantic OS 平台界面",
              caption: "Semantic OS 当前产品界面：项目、工作流、节点中心、数据中心、Agent 运行时与模型路由",
            },
          ],
        },
        {
          code: "05 / FINWORLD",
          title: "FinWorld：把 AI 带进真实金融研究场景",
          paragraphs: [
            "FinWorld 是团队在智能投研方向的一次产品实践，尝试让 AI 参与信息整理、研究协同和分析辅助，帮助使用者在复杂金融信息中更高效地形成研究线索。",
            "从信息整理到研究协同，它更强调把 AI 放进真实研究流程中，而不仅仅停留在一次问答。2026 年，项目参加华夏基金、同花顺与上海交通大学上海高级金融学院相关方共同举办的「ETF 新势界高校挑战赛」，最终进入 Top 9，并获得「ETF 新势界 THE ETF FRONTIER」称号。",
          ],
          shots: [
            {
              image: assetUrl("/images/founder/finworld-workbench.jpg"),
              alt: "FinWorld 三栏工作台",
              caption: "FinWorld 工作台：左栏现实数据、中栏金融世界结构、右栏 AI 研究协同",
            },
            {
              image: assetUrl("/images/founder/etf-challenge.jpg"),
              alt: "ETF 新势界高校挑战赛线下活动现场",
              caption: "「ETF 新势界高校挑战赛」线下活动现场与赴上海参赛交流",
            },
          ],
        },
        {
          code: "06 / RESEARCH",
          title: "博士阶段：研究与创业继续互相反馈",
          paragraphs: [
            "目前，张棪森在西安建筑科技大学攻读博士学位，研究仍然扎根于文化遗产数字化保护，并继续关注知识组织、多模态信息与 AI 在文化场景中的应用。",
            "与硕士阶段相比，他更希望把学术研究和真实产品实践联系起来：研究提出问题，工程帮助验证；而创业过程中遇到的新问题，又反过来成为值得继续研究的方向。这种双向反馈，也让文化遗产不只是他过去做过的一个项目，而成为之后很多 AI 思考最初的出发点。",
          ],
        },
      ],
      journey: [
        { label: "CULTURAL HERITAGE", title: "从真实文化场景出发", description: "用数字化与 AI 改善文化传播与研究辅助。" },
        { label: "AI APPLICATION", title: "进入真实生产流程", description: "把 AI 用到内容生产、个人助手与企业服务中。" },
        { label: "SEMANTIC OS", title: "继续沉淀通用能力", description: "探索 AI 与个人知识、工具和任务之间更自然的连接方式。" },
      ],
      evidences: [
        {
          title: "计算机软件著作权",
          description: "《洛书智遗·园启app V1.0》，著作权人：张棪森；登记号：2025SR1908633。",
          meta: "2025.09.29",
          image: assetUrl("/images/founder/looshage-copyright.jpg"),
        },
        {
          title: "青龙寺遗址景区应用证明",
          description: "项目与景区联合开展科研实验，把数字讲解、AR 导览与遗址相关功能放进真实使用环境。",
          meta: "应用证明",
          image: assetUrl("/images/founder/looshage-application.jpg"),
        },
        {
          title: "中国研究生人工智能创新大赛 · 全国二等奖",
          description: "「华为杯」第七届中国研究生人工智能创新大赛全国总决赛二等奖，团队代表西安建筑科技大学登台领奖。",
          meta: "全国总决赛",
          image: assetUrl("/images/founder/huawei-cup-award.jpg"),
        },
        {
          title: "ETF 新势界 THE ETF FRONTIER",
          description: "华夏基金 × 同花顺 × 交大高金「ETF 新势界高校挑战赛」，获 THE ETF FRONTIER 称号。",
          meta: "2026.07.04",
          image: assetUrl("/images/founder/etf-frontier-certificate.jpg"),
        },
      ],
    },
    {
      slug: "zhangbochen",
      index: "02",
      name: "张博琛",
      nameEn: "ZHANG BOCHEN",
      role: "核心创始人",
      identity: "风景园林硕士 · AI 设计与内容工程实践者",
      lead:
        "他的路径从设计学科出发。在景观设计与文化遗产数字化的真实项目里，他反复遇到同一个问题：工具很多、流程很碎，成果却难以稳定复现。于是他开始把 AI 接进生产流程本身——训练模型、搭建链路、建立评测标准，再把方法变成产品与团队能力。",
      portrait: assetUrl("/images/founder/zhangbochen-portrait.jpg"),
      facts: [
        { label: "当前身份", value: "西安建筑科技大学风景园林硕士（2023.09–2026.06）" },
        { label: "海外经历", value: "国家公派留学 · 斯洛文尼亚卢布尔雅那大学 设计学（2025.07–2026.01）" },
        { label: "代表荣誉", value: "研究生国家奖学金；ASLA 美国景观建筑师协会 2024 分析与规划卓越奖（当年度全球分析与规划最高奖）" },
        { label: "作品参展", value: "在美国、中国、斯洛文尼亚三个国家官方参展五次；两次入选陕西省研究生创新成果展并获奖" },
        { label: "科研与知识产权", value: "以第一作者在《Scientific Reports》发表 SCI 论文 1 篇；软件著作权《基于 AI 的景观设计效果图与语义分割系统》" },
        { label: "关注命题", value: "AI 设计效能、内容生产工程化、跨学科协同与团队交付" },
      ],
      sections: [
        {
          code: "01 / FROM DESIGN",
          title: "从设计出发，先遇到的是流程问题",
          paragraphs: [
            "景观设计是他的学科起点。效果图制作周期长、返工频繁，是他最早想用 AI 解决的问题：单张效果图平均要 6–8 小时，而方案往往要改很多次。",
            "他基于 Stable Diffusion 独立训练了 3 个 LoRA 风格模型，引入 ControlNet 与 Tripo3D，打通「草图 → 2D 概念 → 3D 白模」链路；同时建立美学一致性、语义准确度与出图效率的内部评测标准，通过 A/B 对比持续迭代，优质出图率从 32% 提升到 78%，支撑了后续多项国际与国家级竞赛获奖。",
            "这段实践最终沉淀为一项软件著作权《基于 AI 的景观设计效果图与语义分割系统》，以及一套可复用的 AI 生产 SOP。",
          ],
          quote: "工具不是越多越好。能把一条链路稳定跑通、并且可以复用，才算真正的能力。",
        },
        {
          code: "02 / HERITAGE",
          title: "「AI + 审美」：把修复过程变成可以看见的交互",
          paragraphs: [
            "在石窟寺造像数智化修复项目中，他访谈了文物修复师、策展人、游客三类用户，梳理出「修复方案缺乏可视化预览」这一关键痛点。",
            "他基于 Unity3D 开发了 AR 交互展示 App，实现「扫描实物 → AI 补全残缺 → 历史风貌对比」的交互闭环，让修复方案在动手之前就能被看见、被讨论。作品被《Landscape Architecture Magazine》收录。",
          ],
        },
        {
          code: "03 / CONTENT",
          title: "AI 短剧：把 7 天的制作周期压到 8 小时",
          paragraphs: [
            "面向传统短剧制作成本高（单条 2–5 万）、周期长（7–15 天）的痛点，他调研了 8 款 AI 视频工具，建立出片质量、可控性、成本、版权四维选型矩阵。",
            "在此基础上设计「脚本 → 分镜 → 视频生成 → 智能剪辑」的全链路工作流，把单条制作周期从 7 天压缩到 8 小时。内容在抖音、视频号发布，通过 A/B 测试优化封面与标题钩子，单条播放量突破 10 万+，点赞转化率 3.2%，并沉淀出《AI 短剧标准化生产 SOP》与提示词模板库。",
          ],
        },
        {
          code: "04 / CROSS-CULTURE",
          title: "跨文化：在三个国家参展与交流",
          paragraphs: [
            "他获国家留学基金委员会公派资格，赴斯洛文尼亚卢布尔雅那大学交流设计学方向，期间受邀参加中国驻斯洛文尼亚大使馆国庆招待会；并参与第十届丝绸之路国际艺术节接待与组织、亚洲城市与建筑国际学术年会等活动。",
            "作品在美国华盛顿景观建筑中心、同济大学建筑与城市规划学院、西安国际会展中心等地展出，累计在三个国家官方参展五次，并两次入选陕西省研究生创新成果展。",
          ],
        },
        {
          code: "05 / TEAM",
          title: "从产品到团队：把方法变成可交付的能力",
          paragraphs: [
            "2026 年 3 月起，他担任研发总监，独立负责技术团队管理与产品全生命周期交付：用 vibe coding 工具链独立完成 3 个前后端产品从需求评审、原型设计到开发、测试、上线的完整闭环，并带领 5–8 人全栈小组制定代码规范与审查流程。",
            "他也把数据带进迭代：搭建产品数据看板，基于埋点数据识别异常环节并优化功能，让「做完」变成「做得更好」。",
          ],
        },
      ],
      journey: [
        { label: "DESIGN FOUNDATION", title: "设计学科的系统训练", description: "从真实项目里理解一个行业的工作方式与真实成本。" },
        { label: "AI WORKFLOW", title: "把 AI 接进生产流程", description: "训练模型、搭建链路、建立评测标准与生产 SOP。" },
        { label: "CONTENT & TEAM", title: "让方法可交付", description: "把个人方法变成产品能力与团队可复用的生产体系。" },
      ],
      evidences: [
        {
          title: "ASLA 分析与规划卓越奖",
          description: "获 ASLA 美国景观建筑师协会 2024 分析与规划卓越奖（当年度全球分析与规划方向最高奖），作品于美国华盛顿景观建筑中心展出。",
          meta: "2024.08",
        },
        {
          title: "研究生国家奖学金",
          description: "硕士在读期间获研究生国家奖学金，并获一等学业奖学金、研究生高水平学科竞赛奖学金。",
          meta: "2024.09",
        },
        {
          title: "陕西省研究生创新成果展",
          description: "作品两次入选陕西省研究生创新成果展并获奖，于西安国际会展中心展出（陕西省教育厅主办）。",
          meta: "省部级",
        },
        {
          title: "《Scientific Reports》SCI 论文",
          description: "以第一作者身份发表 SCI 论文《Seasonal disparities in green exposure under the 15-minute city framework: a case study of Xi’an, China》。",
          meta: "2025.08",
        },
        {
          title: "软件著作权",
          description: "《基于 AI 的景观设计效果图与语义分割系统》完成软件著作权登记，形成可复用的 AI 生产 SOP。",
          meta: "2025.09",
        },
        {
          title: "国家公派留学",
          description: "获国家留学基金委员会公派资格，赴斯洛文尼亚卢布尔雅那大学设计学方向交流 6 个月。",
          meta: "2025.07",
        },
      ],
    },
  ],
};
