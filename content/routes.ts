import { news } from "./news";
import { programs } from "./programs";
import { schools } from "./schools";
import type { L } from "./types";

/**
 * Route registry — the single source of truth for the information architecture.
 * Drives: page rendering, <title>/meta, sitemap.xml, breadcrumbs, site search, and footer/nav links.
 * Titles & descriptions describe the UNIVERSITY, never the website.
 */
export type RouteDef = {
  path: string; // without locale, "" = home
  title: L;
  description: L;
  /** Placeholder tokens for content that the page will carry once supplied. */
  pending?: string[];
  kind?: "page" | "school" | "program" | "article" | "legal";
  noindex?: boolean;
};

const r = (path: string, en: string, ar: string, dEn: string, dAr: string, pending: string[] = [], extra: Partial<RouteDef> = {}): RouteDef => ({
  path,
  title: { en, ar },
  description: { en: dEn, ar: dAr },
  pending,
  ...extra,
});

export const staticRoutes: RouteDef[] = [
  r("", "RKDF University Dubai", "جامعة RKDF دبي",
    "RKDF University Dubai is the international campus of RKDF University, Bhopal, offering foundation, undergraduate, postgraduate and doctoral programs in Dubai.",
    "جامعة RKDF دبي هي الحرم الدولي لجامعة RKDF في بوبال، وتقدّم برامج تأسيسية وبكالوريوس ودراسات عليا ودكتوراه في دبي."),

  r("/about", "About the university", "عن الجامعة",
    "The heritage of RKDF University in Bhopal and its mission in Dubai: how the two campuses work together.",
    "إرث جامعة RKDF في بوبال ورسالتها في دبي، وكيف يعمل الحرمان معاً.",
    ["[[ABOUT_MISSION_STATEMENT]]", "[[ABOUT_HISTORY_COPY]]", "[[ABOUT_VALUES]]"]),
  r("/about/chancellor", "Chancellor's message", "كلمة رئيس الجامعة",
    "A message from the Chancellor of RKDF University on the founding of the Dubai campus.",
    "كلمة رئيس جامعة RKDF بمناسبة تأسيس حرم دبي.",
    ["[[CHANCELLOR_NAME]]", "[[CHANCELLOR_MESSAGE]]", "[[CHANCELLOR_PORTRAIT]]"]),
  r("/about/leadership", "Leadership & governance", "القيادة والحوكمة",
    "The leadership team, board and academic governance of RKDF University Dubai.",
    "فريق القيادة ومجلس الأمناء والحوكمة الأكاديمية في جامعة RKDF دبي.",
    ["[[VC_NAME]]", "[[LEADERSHIP_TEAM]]", "[[BOARD_MEMBERS]]", "[[GOVERNANCE_STRUCTURE]]"]),
  r("/about/accreditation", "Licensing & accreditation", "الترخيص والاعتماد",
    "RKDF University Dubai's regulatory standing with KHDA and the UAE Commission for Academic Accreditation, and what it means for degree attestation.",
    "الوضع التنظيمي لجامعة RKDF دبي لدى هيئة المعرفة والتنمية البشرية وهيئة الاعتماد الأكاديمي، وأثره على تصديق الشهادات.",
    ["[[KHDA_PERMIT_STATUS]]", "[[KHDA_PERMIT_NO]]", "[[MOHESR_CAA_STATUS]]", "[[HOME_CAMPUS_ACCREDITATION]]", "[[ATTESTATION_GUIDANCE]]", "[[REGULATOR_VERIFY_URL]]"]),
  r("/about/campus", "The Dubai campus", "حرم دبي",
    "Location, facilities and getting to the RKDF University Dubai campus.",
    "موقع حرم جامعة RKDF دبي ومرافقه وكيفية الوصول إليه.",
    ["[[CAMPUS_LOCATION]]", "[[CAMPUS_FACILITIES]]", "[[CAMPUS_TRANSPORT_DETAIL]]", "[[CAMPUS_PHOTOGRAPHY]]"]),

  r("/academics", "Schools & faculties", "الكليات",
    "The schools and faculties of RKDF University Dubai and the programs each one offers.",
    "كليات جامعة RKDF دبي والبرامج التي تقدّمها كل كلية."),
  r("/programs", "Program finder", "دليل البرامج",
    "Find foundation, undergraduate, postgraduate and doctoral programs at RKDF University Dubai by level and school.",
    "ابحث عن البرامج التأسيسية والبكالوريوس والدراسات العليا والدكتوراه في جامعة RKDF دبي حسب المستوى والكلية."),

  r("/admissions", "Admissions", "القبول",
    "How to apply to RKDF University Dubai: entry requirements, fees, scholarships and support for international students.",
    "كيفية التقديم إلى جامعة RKDF دبي: شروط القبول والرسوم والمنح ودعم الطلاب الدوليين."),
  r("/admissions/entry-requirements", "Entry requirements", "شروط القبول",
    "Entry requirements for RKDF University Dubai by curriculum — CBSE/ICSE, IB, A-Level, American High School, WAEC and others — plus English language requirements.",
    "شروط القبول في جامعة RKDF دبي حسب المنهج الدراسي، إضافة إلى متطلبات اللغة الإنجليزية."),
  r("/admissions/tuition-fees", "Tuition & fees", "الرسوم الدراسية",
    "Tuition fees for every RKDF University Dubai program in AED, with payment plans.",
    "الرسوم الدراسية لكل برامج جامعة RKDF دبي بالدرهم الإماراتي، مع خطط الدفع.",
    ["[[TUITION_TABLE_AED]]", "[[PAYMENT_PLANS]]", "[[REFUND_POLICY]]", "[[VAT_NOTE]]"]),
  r("/admissions/scholarships", "Scholarships", "المنح الدراسية",
    "Merit, need-based, early-bird, sibling and alumni scholarships at RKDF University Dubai.",
    "منح التفوق والحاجة والتسجيل المبكر والأشقاء والخريجين في جامعة RKDF دبي.",
    ["[[SCHOLARSHIP_MERIT]]", "[[SCHOLARSHIP_NEED]]", "[[SCHOLARSHIP_EARLY_BIRD]]", "[[SCHOLARSHIP_SIBLING]]", "[[SCHOLARSHIP_ALUMNI]]"]),
  r("/admissions/how-to-apply", "How to apply", "كيفية التقديم",
    "Five steps to apply to RKDF University Dubai, with a full document checklist.",
    "خمس خطوات للتقديم إلى جامعة RKDF دبي، مع قائمة كاملة بالمستندات المطلوبة.",
    ["[[DOCUMENT_CHECKLIST]]", "[[APPLICATION_FEE_AED]]", "[[OFFER_TURNAROUND_DAYS]]"]),
  r("/admissions/international", "International students", "الطلاب الدوليون",
    "Student visas, Emirates ID and residency, document attestation and arrival in Dubai for RKDF University Dubai students.",
    "تأشيرة الطالب والإقامة والهوية الإماراتية وتصديق المستندات والوصول إلى دبي لطلاب جامعة RKDF دبي.",
    ["[[VISA_PROCESS]]", "[[VISA_FEES_AED]]", "[[ATTESTATION_STEPS]]", "[[ARRIVAL_GUIDE]]"]),
  r("/admissions/agents", "Agents & partners", "الوكلاء والشركاء",
    "Information for recruitment agents and education partners working with RKDF University Dubai.",
    "معلومات لوكلاء الاستقطاب والشركاء التعليميين المتعاونين مع جامعة RKDF دبي.",
    ["[[AGENT_PORTAL_URL]]", "[[AGENT_AGREEMENT_PROCESS]]", "[[APPROVED_AGENT_LIST]]"]),

  r("/student-life", "Campus life", "الحياة الجامعية",
    "Student life at RKDF University Dubai: housing, clubs and societies, sport, wellbeing and living in Dubai.",
    "الحياة الطلابية في جامعة RKDF دبي: السكن والأندية والرياضة والرفاه والعيش في دبي."),
  r("/student-life/accommodation", "Accommodation", "السكن",
    "Housing options for RKDF University Dubai students, with indicative monthly costs in AED.",
    "خيارات السكن لطلاب جامعة RKDF دبي مع التكاليف الشهرية التقديرية بالدرهم.",
    ["[[ACCOM_SHARED_AED]]", "[[ACCOM_STUDIO_AED]]", "[[ACCOM_ARRANGED_AED]]", "[[ACCOM_PARTNERS]]"]),
  r("/student-life/clubs", "Clubs, societies & sport", "الأندية والجمعيات والرياضة",
    "Student clubs, societies and sport at RKDF University Dubai.",
    "الأندية والجمعيات الطلابية والرياضة في جامعة RKDF دبي.",
    ["[[CLUBS_LIST]]", "[[SPORTS_FACILITIES]]"]),
  r("/student-life/support", "Wellbeing & support", "الرفاه والدعم",
    "Wellbeing, counselling, disability support and academic skills services for RKDF University Dubai students.",
    "خدمات الرفاه والإرشاد ودعم ذوي الإعاقة والمهارات الأكاديمية لطلاب جامعة RKDF دبي.",
    ["[[COUNSELLING_SERVICE]]", "[[DISABILITY_SUPPORT]]", "[[EMERGENCY_CONTACTS]]"]),

  r("/research", "Research & innovation", "البحث والابتكار",
    "Research centres, industry collaboration and innovation at RKDF University Dubai.",
    "المراكز البحثية والتعاون مع القطاع الصناعي والابتكار في جامعة RKDF دبي.",
    ["[[RESEARCH_STRATEGY]]", "[[RESEARCH_ETHICS_POLICY]]"]),
  r("/careers", "Careers & employability", "المسار المهني",
    "Careers advice, internships and employer partnerships for RKDF University Dubai students in the UAE.",
    "الإرشاد المهني والتدريب والشراكات مع جهات التوظيف لطلاب جامعة RKDF دبي في الإمارات.",
    ["[[CAREERS_SERVICE_DETAIL]]", "[[INTERNSHIP_POLICY]]", "[[EMPLOYER_PARTNERS]]"]),
  r("/global", "Global & Bhopal campus", "الشبكة العالمية وحرم بوبال",
    "Links between RKDF University Dubai and the Bhopal campus: exchange, mobility and transfer pathways.",
    "الروابط بين جامعة RKDF دبي وحرم بوبال: التبادل والتنقل ومسارات التحويل.",
    ["[[MOBILITY_POLICY]]", "[[TRANSFER_PATHWAYS]]", "[[EXCHANGE_PARTNERS]]"]),

  r("/news", "News", "الأخبار", "News from RKDF University Dubai.", "أخبار جامعة RKDF دبي."),
  r("/events", "Events & open days", "الفعاليات والأيام المفتوحة",
    "Open days, information sessions and events at RKDF University Dubai.",
    "الأيام المفتوحة وجلسات المعلومات والفعاليات في جامعة RKDF دبي."),
  r("/visit", "Visit the campus", "زيارة الحرم",
    "Book a campus tour of RKDF University Dubai or take the virtual tour.",
    "احجز جولة في حرم جامعة RKDF دبي أو خُض الجولة الافتراضية."),
  r("/contact", "Contact", "اتصل بنا",
    "Contact RKDF University Dubai: address, phone, WhatsApp, email and departmental directory.",
    "تواصل مع جامعة RKDF دبي: العنوان والهاتف وواتساب والبريد الإلكتروني ودليل الأقسام.",
    ["[[DEPARTMENT_DIRECTORY]]", "[[OFFICE_HOURS]]"]),
  r("/apply", "Apply", "قدّم الآن",
    "Start your application to RKDF University Dubai.",
    "ابدأ طلب التقديم إلى جامعة RKDF دبي.",
    ["[[APPLICATION_PORTAL_URL]]", "[[APPLICATION_FEE_AED]]"]),
  r("/downloads", "Downloads", "التنزيلات",
    "The RKDF University Dubai prospectus, application forms and university policies.",
    "دليل جامعة RKDF دبي ونماذج التقديم وسياسات الجامعة.",
    ["[[PROSPECTUS_PDF]]", "[[APPLICATION_FORM_PDF]]", "[[POLICY_DOCUMENTS]]"]),

  r("/privacy", "Privacy notice", "إشعار الخصوصية",
    "How RKDF University Dubai collects, uses and protects personal data.",
    "كيف تجمع جامعة RKDF دبي البيانات الشخصية وتستخدمها وتحميها.",
    ["[[PRIVACY_NOTICE_TEXT]]", "[[DATA_PROTECTION_OFFICER_CONTACT]]"], { kind: "legal" }),
  r("/terms", "Terms of use", "شروط الاستخدام",
    "Terms of use for RKDF University Dubai's online services.",
    "شروط استخدام الخدمات الإلكترونية لجامعة RKDF دبي.",
    ["[[TERMS_TEXT]]"], { kind: "legal" }),
  r("/accessibility", "Accessibility statement", "بيان إمكانية الوصول",
    "RKDF University Dubai's commitment to digital accessibility, the standard it meets and how to report a barrier.",
    "التزام جامعة RKDF دبي بإمكانية الوصول الرقمي والمعيار المعتمد وكيفية الإبلاغ عن أي عائق.",
    [], { kind: "legal" }),
  r("/sitemap", "Sitemap", "خريطة الموقع",
    "Every section of the RKDF University Dubai website.",
    "جميع أقسام موقع جامعة RKDF دبي."),
];

export const schoolRoutes: RouteDef[] = schools.map((s) => ({
  path: `/academics/${s.slug}`,
  title: s.name,
  description: {
    en: `${s.name.en} at RKDF University Dubai: programs, faculty and facilities.`,
    ar: `${s.name.ar} في جامعة RKDF دبي: البرامج وأعضاء هيئة التدريس والمرافق.`,
  },
  kind: "school",
}));

export const programRoutes: RouteDef[] = programs.map((p) => ({
  path: `/programs/${p.slug}`,
  title: p.title,
  description: {
    en: `${p.title.en} at RKDF University Dubai: duration, intakes, tuition in AED and entry requirements.`,
    ar: `${p.title.ar} في جامعة RKDF دبي: المدة والدفعات والرسوم بالدرهم وشروط القبول.`,
  },
  kind: "program",
}));

export const articleRoutes: RouteDef[] = news.map((n) => ({
  path: `/news/${n.slug}`,
  title: n.title,
  description: n.excerpt,
  kind: "article",
}));

export const allRoutes: RouteDef[] = [...staticRoutes, ...schoolRoutes, ...programRoutes, ...articleRoutes];

export const getRoute = (path: string) => allRoutes.find((x) => x.path === path);

/** Direct children of a path, for "In this section" lists. */
export const childRoutes = (path: string) =>
  allRoutes.filter((x) => x.path !== path && x.path.startsWith(path + "/") && x.path.slice(path.length + 1).split("/").length === 1);
