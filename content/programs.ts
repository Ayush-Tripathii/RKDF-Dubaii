import { schools } from "./schools";
import type { L } from "./types";

/**
 * Programs — names, durations and entry requirements are taken from the RKDF University, Bhopal
 * faculty pages (rkdf.ac.in, fetched 23 Nov 2026). Tuition in AED, intakes and summaries are
 * DUMMY values for the Dubai preview and must be confirmed before launch.
 */
export const levels = ["diploma", "undergraduate", "postgraduate", "doctoral"] as const;
export type Level = (typeof levels)[number];

export type Program = {
  slug: string;
  title: L;
  level: Level;
  school: string; // School.slug
  duration: L;
  intakes: L;
  tuitionAed: string; // per year (DUMMY)
  entry: L;
  summary: L;
  flagship?: boolean;
};

const yrs = (n: number): L => ({ en: `${n} ${n === 1 ? "year" : "years"}`, ar: n === 1 ? "سنة واحدة" : n === 2 ? "سنتان" : `${n} سنوات` });
const yrsText = (en: string, ar: string): L => ({ en, ar });
const SEP_JAN: L = { en: "September · January", ar: "سبتمبر · يناير" };
const SEP: L = { en: "September", ar: "سبتمبر" };

// Entry requirements as published by the Bhopal campus.
const E = {
  be: { en: "10+2 with Physics and Mathematics, minimum 45%", ar: "الثانوية العامة مع الفيزياء والرياضيات، بنسبة 45% على الأقل" },
  any12: { en: "10+2 or equivalent in any subject", ar: "الثانوية العامة أو ما يعادلها في أي تخصص" },
  sci12: { en: "10+2 in science or commerce subjects", ar: "الثانوية العامة في مواد العلوم أو التجارة" },
  pharm: { en: "10+2 with Physics and Chemistry, plus Mathematics or Biology", ar: "الثانوية العامة مع الفيزياء والكيمياء والرياضيات أو الأحياء" },
  ballb: { en: "10+2 with a minimum of 45%", ar: "الثانوية العامة بنسبة 45% على الأقل" },
  llb: { en: "Any bachelor’s degree, minimum 45%", ar: "أي شهادة بكالوريوس بنسبة 45% على الأقل" },
  nursing: { en: "10+2 science with Physics, Chemistry, Biology and English, minimum 45%", ar: "الثانوية العامة العلمية مع الفيزياء والكيمياء والأحياء والإنجليزية بنسبة 45% على الأقل" },
  agri: { en: "10+2 science (PCM/PCB) or agriculture, minimum 50%", ar: "الثانوية العامة العلمية أو الزراعية بنسبة 50% على الأقل" },
  grad50: { en: "Any bachelor’s degree, minimum 50%", ar: "أي شهادة بكالوريوس بنسبة 50% على الأقل" },
  mtech: { en: "Bachelor’s degree in a relevant field, minimum 50%", ar: "شهادة بكالوريوس في تخصص ذي صلة بنسبة 50% على الأقل" },
  mca: { en: "BCA, or a bachelor’s degree with Mathematics, minimum 50%", ar: "بكالوريوس تطبيقات الحاسوب أو بكالوريوس مع الرياضيات بنسبة 50% على الأقل" },
  msc: { en: "Three-year bachelor’s degree in a relevant subject", ar: "شهادة بكالوريوس مدتها ثلاث سنوات في مادة ذات صلة" },
  mcom: { en: "Three-year bachelor’s degree in commerce", ar: "شهادة بكالوريوس في التجارة مدتها ثلاث سنوات" },
  llm: { en: "Bachelor’s degree in Law, minimum 50%", ar: "بكالوريوس في القانون بنسبة 50% على الأقل" },
  bed: { en: "Bachelor’s degree, minimum 50%", ar: "شهادة بكالوريوس بنسبة 50% على الأقل" },
  ssc: { en: "10th grade (SSC), minimum 35%", ar: "الصف العاشر بنسبة 35% على الأقل" },
  phd: { en: "Master’s degree in a relevant field, as per UGC norms", ar: "ماجستير في تخصص ذي صلة وفق معايير هيئة المنح الجامعية" },
} satisfies Record<string, L>;

const sum = (en: string, ar: string): L => ({ en, ar });

export const programs: Program[] = [
  // ── Undergraduate ──
  { slug: "be-computer-science", title: { en: "B.E. Computer Science & Engineering", ar: "بكالوريوس الهندسة في علوم الحاسوب" }, level: "undergraduate", school: "engineering", duration: yrs(4), intakes: SEP_JAN, tuitionAed: "48,000", entry: E.be, flagship: true,
    summary: sum("Software engineering, algorithms, AI and systems design, with a final-year industry project in Dubai.", "هندسة البرمجيات والخوارزميات والذكاء الاصطناعي وتصميم الأنظمة، مع مشروع تخرج لدى جهة صناعية في دبي.") },
  { slug: "be-civil", title: { en: "B.E. Civil Engineering", ar: "بكالوريوس الهندسة المدنية" }, level: "undergraduate", school: "engineering", duration: yrs(4), intakes: SEP, tuitionAed: "46,000", entry: E.be,
    summary: sum("Structures, geotechnics and construction management for one of the world’s busiest building markets.", "الإنشاءات والجيوتقنية وإدارة البناء لأحد أنشط أسواق البناء في العالم.") },
  { slug: "be-mechanical", title: { en: "B.E. Mechanical Engineering", ar: "بكالوريوس الهندسة الميكانيكية" }, level: "undergraduate", school: "engineering", duration: yrs(4), intakes: SEP, tuitionAed: "46,000", entry: E.be,
    summary: sum("Thermodynamics, design and manufacturing, with laboratory and workshop practice.", "الديناميكا الحرارية والتصميم والتصنيع، مع تطبيقات في المختبرات والورش.") },
  { slug: "be-electronics", title: { en: "B.E. Electronics & Communication", ar: "بكالوريوس هندسة الإلكترونيات والاتصالات" }, level: "undergraduate", school: "engineering", duration: yrs(4), intakes: SEP, tuitionAed: "46,000", entry: E.be,
    summary: sum("Circuits, signal processing and communication networks.", "الدوائر ومعالجة الإشارات وشبكات الاتصالات.") },
  { slug: "bba", title: { en: "Bachelor of Business Administration (BBA)", ar: "بكالوريوس إدارة الأعمال" }, level: "undergraduate", school: "management", duration: yrs(3), intakes: SEP_JAN, tuitionAed: "38,000", entry: E.any12,
    summary: sum("Management, marketing, finance and entrepreneurship, with a UAE internship.", "الإدارة والتسويق والتمويل وريادة الأعمال، مع تدريب في الإمارات.") },
  { slug: "bca", title: { en: "Bachelor of Computer Applications (BCA)", ar: "بكالوريوس تطبيقات الحاسوب" }, level: "undergraduate", school: "computer-science", duration: yrs(3), intakes: SEP_JAN, tuitionAed: "36,000", entry: E.sci12,
    summary: sum("Programming, databases, web and mobile development.", "البرمجة وقواعد البيانات وتطوير تطبيقات الويب والهاتف.") },
  { slug: "bpharm", title: { en: "Bachelor of Pharmacy (B.Pharm)", ar: "بكالوريوس الصيدلة" }, level: "undergraduate", school: "pharmacy", duration: yrs(4), intakes: SEP, tuitionAed: "52,000", entry: E.pharm,
    summary: sum("Pharmaceutics, pharmacology and pharmacy practice, with hospital and industry training.", "الصيدلانيات وعلم الأدوية والممارسة الصيدلانية، مع تدريب في المستشفيات والصناعة.") },
  { slug: "ba-llb", title: { en: "BA LLB (Integrated Law)", ar: "بكالوريوس الآداب والقانون (متكامل)" }, level: "undergraduate", school: "law", duration: yrs(5), intakes: SEP, tuitionAed: "44,000", entry: E.ballb,
    summary: sum("A five-year integrated degree in the arts and law, with moot court practice.", "شهادة متكاملة مدتها خمس سنوات في الآداب والقانون، مع تدريب في المحكمة الصورية.") },
  { slug: "llb", title: { en: "Bachelor of Laws (LLB)", ar: "بكالوريوس القانون" }, level: "undergraduate", school: "law", duration: yrs(3), intakes: SEP, tuitionAed: "42,000", entry: E.llb,
    summary: sum("A graduate-entry law degree for students who already hold a bachelor’s degree.", "شهادة قانونية لحملة شهادة البكالوريوس.") },
  { slug: "bsc-biotechnology", title: { en: "B.Sc. Biotechnology", ar: "بكالوريوس العلوم في التقنية الحيوية" }, level: "undergraduate", school: "science", duration: yrs(3), intakes: SEP, tuitionAed: "36,000", entry: E.sci12,
    summary: sum("Molecular biology, genetics and bioprocess technology.", "البيولوجيا الجزيئية وعلم الوراثة وتقنيات المعالجة الحيوية.") },
  { slug: "bcom-hons", title: { en: "B.Com (Hons.)", ar: "بكالوريوس التجارة (مع مرتبة الشرف)" }, level: "undergraduate", school: "commerce", duration: yrs(3), intakes: SEP_JAN, tuitionAed: "34,000", entry: E.sci12,
    summary: sum("Accounting, taxation, auditing and business law.", "المحاسبة والضرائب والتدقيق وقانون الأعمال.") },
  { slug: "barch", title: { en: "Bachelor of Architecture (B.Arch)", ar: "بكالوريوس العمارة" }, level: "undergraduate", school: "architecture", duration: yrs(5), intakes: SEP, tuitionAed: "54,000", entry: E.be,
    summary: sum("Studio-led architectural design, building technology and urbanism.", "التصميم المعماري القائم على الاستوديو وتقنيات البناء والعمران.") },
  { slug: "bed", title: { en: "Bachelor of Education (B.Ed)", ar: "بكالوريوس التربية" }, level: "undergraduate", school: "education", duration: yrs(2), intakes: SEP, tuitionAed: "30,000", entry: E.bed,
    summary: sum("Teacher education with supervised school placements.", "إعداد المعلمين مع تدريب ميداني بإشراف في المدارس.") },
  { slug: "ba", title: { en: "Bachelor of Arts (BA)", ar: "بكالوريوس الآداب" }, level: "undergraduate", school: "social-science", duration: yrs(3), intakes: SEP_JAN, tuitionAed: "30,000", entry: E.any12,
    summary: sum("Humanities and social sciences, with English and a choice of majors.", "العلوم الإنسانية والاجتماعية، مع اللغة الإنجليزية ومجموعة من التخصصات.") },
  { slug: "bsc-agriculture", title: { en: "B.Sc. (Hons) Agriculture", ar: "بكالوريوس العلوم في الزراعة (مع مرتبة الشرف)" }, level: "undergraduate", school: "agriculture", duration: yrs(4), intakes: SEP, tuitionAed: "40,000", entry: E.agri,
    summary: sum("Crop science, soil and water management, and agribusiness.", "علوم المحاصيل وإدارة التربة والمياه والأعمال الزراعية.") },
  { slug: "bsc-nursing", title: { en: "B.Sc. Nursing", ar: "بكالوريوس العلوم في التمريض" }, level: "undergraduate", school: "nursing", duration: yrs(4), intakes: SEP, tuitionAed: "50,000", entry: E.nursing,
    summary: sum("Professional nursing with clinical placements from the second year.", "تمريض مهني مع تدريب سريري ابتداءً من السنة الثانية.") },
  { slug: "bsc-optometry", title: { en: "B.Sc. Optometry", ar: "بكالوريوس العلوم في البصريات" }, level: "undergraduate", school: "paramedical", duration: yrs(4), intakes: SEP, tuitionAed: "42,000", entry: E.nursing,
    summary: sum("Vision science, clinical optometry and eye-care practice.", "علوم الإبصار والبصريات السريرية وممارسة رعاية العيون.") },
  { slug: "bams", title: { en: "Bachelor of Ayurvedic Medicine & Surgery (BAMS)", ar: "بكالوريوس الطب والجراحة الأيورفيدية" }, level: "undergraduate", school: "ayurveda", duration: yrsText("5½ years", "5 سنوات ونصف"), intakes: SEP, tuitionAed: "58,000", entry: E.nursing,
    summary: sum("Classical Ayurveda alongside anatomy, physiology and clinical medicine, with an internship.", "الأيورفيدا التقليدية إلى جانب التشريح ووظائف الأعضاء والطب السريري، مع فترة امتياز.") },
  { slug: "bhms", title: { en: "Bachelor of Homoeopathic Medicine & Surgery (BHMS)", ar: "بكالوريوس الطب والجراحة المثلية" }, level: "undergraduate", school: "homoeopathy", duration: yrsText("5½ years", "5 سنوات ونصف"), intakes: SEP, tuitionAed: "56,000", entry: E.nursing,
    summary: sum("Homoeopathic medicine with clinical training and an internship.", "الطب المثلي مع تدريب سريري وفترة امتياز.") },
  { slug: "blib", title: { en: "Bachelor of Library Science (B.Lib)", ar: "بكالوريوس علوم المكتبات" }, level: "undergraduate", school: "library", duration: yrs(1), intakes: SEP, tuitionAed: "24,000", entry: E.llb,
    summary: sum("Cataloguing, information retrieval and library management.", "الفهرسة واسترجاع المعلومات وإدارة المكتبات.") },

  // ── Postgraduate ──
  { slug: "mba", title: { en: "Master of Business Administration (MBA)", ar: "ماجستير إدارة الأعمال" }, level: "postgraduate", school: "management", duration: yrs(2), intakes: SEP_JAN, tuitionAed: "62,000", entry: E.grad50, flagship: true,
    summary: sum("A two-year MBA with specialisations in finance, marketing, HR and operations, and a consulting project with a UAE company.", "ماجستير إدارة أعمال لمدة عامين مع تخصصات في التمويل والتسويق والموارد البشرية والعمليات، ومشروع استشاري مع شركة إماراتية.") },
  { slug: "mtech-computer-science", title: { en: "M.Tech Computer Science & Engineering", ar: "ماجستير التكنولوجيا في علوم الحاسوب" }, level: "postgraduate", school: "engineering", duration: yrs(2), intakes: SEP, tuitionAed: "56,000", entry: E.mtech,
    summary: sum("Advanced computing, machine learning and distributed systems.", "الحوسبة المتقدمة وتعلم الآلة والأنظمة الموزعة.") },
  { slug: "mca", title: { en: "Master of Computer Applications (MCA)", ar: "ماجستير تطبيقات الحاسوب" }, level: "postgraduate", school: "computer-science", duration: yrs(2), intakes: SEP_JAN, tuitionAed: "48,000", entry: E.mca,
    summary: sum("Full-stack development, cloud and data engineering.", "تطوير البرمجيات المتكاملة والحوسبة السحابية وهندسة البيانات.") },
  { slug: "mpharm-pharmaceutics", title: { en: "M.Pharm Pharmaceutics", ar: "ماجستير الصيدلة في الصيدلانيات" }, level: "postgraduate", school: "pharmacy", duration: yrs(2), intakes: SEP, tuitionAed: "58,000", entry: E.pharm,
    summary: sum("Drug formulation, delivery systems and regulatory science.", "تركيب الأدوية وأنظمة توصيلها والعلوم التنظيمية.") },
  { slug: "msc-biotechnology", title: { en: "M.Sc. Biotechnology", ar: "ماجستير العلوم في التقنية الحيوية" }, level: "postgraduate", school: "science", duration: yrs(2), intakes: SEP, tuitionAed: "44,000", entry: E.msc,
    summary: sum("Genomics, bioinformatics and industrial biotechnology.", "علم الجينوم والمعلوماتية الحيوية والتقنية الحيوية الصناعية.") },
  { slug: "mcom", title: { en: "Master of Commerce (M.Com)", ar: "ماجستير التجارة" }, level: "postgraduate", school: "commerce", duration: yrs(2), intakes: SEP, tuitionAed: "40,000", entry: E.mcom,
    summary: sum("Advanced accounting, corporate finance and research methods.", "المحاسبة المتقدمة وتمويل الشركات ومناهج البحث.") },
  { slug: "llm", title: { en: "Master of Laws (LLM)", ar: "ماجستير القانون" }, level: "postgraduate", school: "law", duration: yrs(1), intakes: SEP, tuitionAed: "50,000", entry: E.llm,
    summary: sum("Specialised study in corporate and international law.", "دراسة متخصصة في قانون الشركات والقانون الدولي.") },
  { slug: "med", title: { en: "Master of Education (M.Ed)", ar: "ماجستير التربية" }, level: "postgraduate", school: "education", duration: yrs(2), intakes: SEP, tuitionAed: "36,000", entry: E.bed,
    summary: sum("Curriculum, assessment and educational leadership.", "المناهج والتقييم والقيادة التربوية.") },
  { slug: "msw", title: { en: "Master of Social Work (MSW)", ar: "ماجستير الخدمة الاجتماعية" }, level: "postgraduate", school: "social-science", duration: yrs(2), intakes: SEP, tuitionAed: "36,000", entry: E.grad50,
    summary: sum("Community practice, social policy and supervised fieldwork.", "الممارسة المجتمعية والسياسات الاجتماعية والعمل الميداني بإشراف.") },
  { slug: "mlib", title: { en: "Master of Library Science (M.Lib)", ar: "ماجستير علوم المكتبات" }, level: "postgraduate", school: "library", duration: yrs(1), intakes: SEP, tuitionAed: "28,000", entry: E.llb,
    summary: sum("Digital libraries, knowledge management and archives.", "المكتبات الرقمية وإدارة المعرفة والأرشيف.") },

  // ── Diploma ──
  { slug: "diploma-engineering", title: { en: "Diploma in Engineering (Polytechnic)", ar: "دبلوم الهندسة (البوليتكنك)" }, level: "diploma", school: "engineering", duration: yrs(3), intakes: SEP, tuitionAed: "28,000", entry: E.ssc,
    summary: sum("Civil, mechanical and electrical engineering at diploma level, with lateral entry into the B.E.", "الهندسة المدنية والميكانيكية والكهربائية على مستوى الدبلوم، مع إمكانية الالتحاق المباشر بالبكالوريوس.") },
  { slug: "dpharm", title: { en: "Diploma in Pharmacy (D.Pharm)", ar: "دبلوم الصيدلة" }, level: "diploma", school: "pharmacy", duration: yrs(2), intakes: SEP, tuitionAed: "30,000", entry: E.pharm,
    summary: sum("A practice-focused route into community and hospital pharmacy.", "مسار عملي للعمل في صيدليات المجتمع والمستشفيات.") },
  { slug: "pgdca", title: { en: "Postgraduate Diploma in Computer Applications (PGDCA)", ar: "دبلوم الدراسات العليا في تطبيقات الحاسوب" }, level: "diploma", school: "computer-science", duration: yrs(1), intakes: SEP_JAN, tuitionAed: "22,000", entry: E.grad50,
    summary: sum("A one-year conversion course in programming and IT for graduates.", "برنامج تحويلي لمدة عام في البرمجة وتقنية المعلومات للخريجين.") },
  { slug: "dca", title: { en: "Diploma in Computer Applications (DCA)", ar: "دبلوم تطبيقات الحاسوب" }, level: "diploma", school: "computer-science", duration: yrs(1), intakes: SEP_JAN, tuitionAed: "18,000", entry: E.any12,
    summary: sum("Foundational computing and office applications.", "أساسيات الحوسبة والتطبيقات المكتبية.") },
  { slug: "gnm-nursing", title: { en: "General Nursing & Midwifery (GNM)", ar: "التمريض العام والقبالة" }, level: "diploma", school: "nursing", duration: yrs(3), intakes: SEP, tuitionAed: "34,000", entry: E.any12,
    summary: sum("Diploma-level nursing and midwifery with hospital training.", "التمريض والقبالة على مستوى الدبلوم مع تدريب في المستشفيات.") },

  // ── Doctoral ──
  { slug: "phd-engineering", title: { en: "Ph.D. Engineering & Technology", ar: "دكتوراه الهندسة والتكنولوجيا" }, level: "doctoral", school: "engineering", duration: yrsText("3–6 years", "من 3 إلى 6 سنوات"), intakes: SEP_JAN, tuitionAed: "45,000", entry: E.phd, flagship: true,
    summary: sum("Doctoral research in civil, mechanical, electrical, electronics or computer engineering.", "بحث دكتوراه في الهندسة المدنية أو الميكانيكية أو الكهربائية أو الإلكترونية أو هندسة الحاسوب.") },
  { slug: "phd-management", title: { en: "Ph.D. Management", ar: "دكتوراه الإدارة" }, level: "doctoral", school: "management", duration: yrsText("3–6 years", "من 3 إلى 6 سنوات"), intakes: SEP_JAN, tuitionAed: "45,000", entry: E.phd,
    summary: sum("Doctoral research in strategy, finance, marketing and organisational behaviour.", "بحث دكتوراه في الاستراتيجية والتمويل والتسويق والسلوك التنظيمي.") },
  { slug: "phd-pharmacy", title: { en: "Ph.D. Pharmaceutical Sciences", ar: "دكتوراه العلوم الصيدلانية" }, level: "doctoral", school: "pharmacy", duration: yrsText("3–6 years", "من 3 إلى 6 سنوات"), intakes: SEP, tuitionAed: "48,000", entry: E.phd,
    summary: sum("Doctoral research in drug design, delivery and pharmacology.", "بحث دكتوراه في تصميم الأدوية وتوصيلها وعلم الأدوية.") },
  { slug: "phd-computer-science", title: { en: "Ph.D. Computer Science", ar: "دكتوراه علوم الحاسوب" }, level: "doctoral", school: "computer-science", duration: yrsText("3–6 years", "من 3 إلى 6 سنوات"), intakes: SEP_JAN, tuitionAed: "45,000", entry: E.phd,
    summary: sum("Doctoral research in AI, data science and computing systems.", "بحث دكتوراه في الذكاء الاصطناعي وعلم البيانات وأنظمة الحوسبة.") },
  { slug: "phd-law", title: { en: "Ph.D. Law", ar: "دكتوراه القانون" }, level: "doctoral", school: "law", duration: yrsText("3–6 years", "من 3 إلى 6 سنوات"), intakes: SEP, tuitionAed: "45,000", entry: E.phd,
    summary: sum("Doctoral research in commercial, constitutional and international law.", "بحث دكتوراه في القانون التجاري والدستوري والدولي.") },
  { slug: "phd-science", title: { en: "Ph.D. Biotechnology", ar: "دكتوراه التقنية الحيوية" }, level: "doctoral", school: "science", duration: yrsText("3–6 years", "من 3 إلى 6 سنوات"), intakes: SEP, tuitionAed: "45,000", entry: E.phd,
    summary: sum("Doctoral research in biotechnology, microbiology and the life sciences.", "بحث دكتوراه في التقنية الحيوية والأحياء الدقيقة وعلوم الحياة.") },
];

export const getProgram = (slug: string) => programs.find((x) => x.slug === slug);
export const programsBySchool = (slug: string) => programs.filter((x) => x.school === slug);
export const programsByLevel = (level: Level) => programs.filter((x) => x.level === level);

/** Integrity: every program belongs to a real school, and every school has at least one program. Fails the build otherwise. */
for (const prog of programs) {
  if (!schools.some((s) => s.slug === prog.school)) throw new Error(`programs.ts: ${prog.slug} references unknown school "${prog.school}"`);
}
for (const s of schools) {
  if (!programs.some((p) => p.school === s.slug)) throw new Error(`programs.ts: school "${s.slug}" has no programs`);
}
