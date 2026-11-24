import type { L } from "./types";

/**
 * DUMMY VALUES — preview only.
 *
 * Every [[TOKEN]] in the content is still the source of truth; while DUMMY_MODE is on, tokens
 * render as the dummy value below (in the reader's language) instead of the red placeholder.
 * NOTHING here is verified. Before launch: replace each entry with confirmed information, or set
 * DUMMY_MODE = false to show every remaining token again.
 *
 * Values are a plain string (language-neutral, e.g. numbers) or { en, ar }.
 * A stat token whose value is a number renders as a real, count-up stat.
 */
export const DUMMY_MODE = true;

export const DUMMY: Record<string, string | L> = {
  // ── Intake, location, contact ──
  INTAKE_TERM: { en: "September 2027", ar: "سبتمبر 2027" },
  INTAKES: { en: "September & January intakes", ar: "دفعتا سبتمبر ويناير" },
  CAMPUS_LOCATION: { en: "Dubai International Academic City", ar: "مدينة دبي الأكاديمية العالمية" },
  DATE: { en: "31 July 2027", ar: "31 يوليو 2027" },
  DUBAI_ADDRESS: { en: "Block 4, Dubai International Academic City, Dubai, UAE", ar: "المبنى 4، مدينة دبي الأكاديمية العالمية، دبي، الإمارات" },
  DUBAI_CAMPUS_ADDRESS: { en: "Block 4, Dubai International Academic City, Dubai, UAE", ar: "المبنى 4، مدينة دبي الأكاديمية العالمية، دبي، الإمارات" },
  PHONE: "4 555 0100",
  EMAIL: "admissions@rkdfdubai.ac.ae",
  WHATSAPP_NUMBER: "+971 50 555 0100",
  OFFICE_HOURS: { en: "Monday–Friday, 8:30am–5:30pm", ar: "الاثنين–الجمعة، 8:30 صباحاً–5:30 مساءً" },
  ENQUIRY_RESPONSE_DAYS: "2",
  SOCIAL_LINKS: "Instagram · LinkedIn · YouTube · X",

  // ── Licensing & recognition ──
  LICENCE_STATUS: { en: "KHDA-licensed campus", ar: "حرم مرخّص من هيئة المعرفة" },
  REGULATOR: { en: "the Knowledge and Human Development Authority (KHDA)", ar: "هيئة المعرفة والتنمية البشرية (KHDA)" },
  REGULATOR_VERIFY_URL: "https://www.khda.gov.ae/",
  KHDA_PERMIT_STATUS: { en: "Licensed", ar: "مرخّص" },
  KHDA_PERMIT_NO: "HE-2026-0418",
  MOHESR_CAA_STATUS: { en: "Program accreditation in progress", ar: "اعتماد البرامج قيد الإجراء" },
  CAA_REFERENCE: { en: "Initial accreditation application submitted in 2026", ar: "قُدّم طلب الاعتماد الأولي عام 2026" },
  HOME_CAMPUS_ACCREDITATION: { en: "NAAC A+ accreditation", ar: "اعتماد NAAC بدرجة A+" },
  HOME_CAMPUS_ACCREDITATION_REF: { en: "National Assessment and Accreditation Council, India · UGC recognised", ar: "المجلس الوطني للتقييم والاعتماد، الهند · معترف بها من هيئة المنح الجامعية" },
  HOME_CAMPUS_ESTABLISHING_ACT: { en: "an Act of the Madhya Pradesh Legislature", ar: "قانون صادر عن الهيئة التشريعية لولاية ماديا براديش" },
  ATTESTATION_GUIDANCE: { en: "Our Student Services team guides every graduate through attestation with the UAE Ministry of Higher Education and Scientific Research.", ar: "يرشد فريق خدمات الطلاب كل خريج خلال إجراءات التصديق لدى وزارة التعليم العالي والبحث العلمي." },

  // ── Timeline ──
  YEAR_BHOPAL_ESTABLISHED: "2012",
  YEAR_HOME_ACCREDITATION: "2024",
  YEAR_DUBAI_LICENSED: "2026",
  YEAR_FIRST_INTAKE: "2027",
  YEAR: "2026",
  MONTHS: "6",

  // ── Stats (numbers become real count-up stats) ──
  STAT_STUDENTS: "850",
  STAT_STUDENTS_AS_OF: { en: "September 2027", ar: "سبتمبر 2027" },
  STAT_FACULTY: "64",
  STUDENT_NATIONALITIES: "38",
  STAT_GRAD_OUTCOMES: "92",
  STAT_CLUBS: "24",
  STAT_HOUSING_OPTIONS: "3",
  STAT_SPORTS: "12",
  STAT_ACTIVE_PROJECTS: "18",
  STAT_INDUSTRY_PARTNERS: "26",
  STAT_RESEARCH_FUNDING_AED: "4", // AED million
  STAT_INTERNSHIPS: "310",
  STAT_EMPLOYER_PARTNERS: "45",

  // ── Why RKDF / admissions / life / careers copy ──
  MOBILITY_POLICY: { en: "Students can spend a semester in Bhopal from their second year.", ar: "يمكن للطلاب قضاء فصل دراسي في بوبال ابتداءً من سنتهم الثانية." },
  INTERNSHIP_PROGRAM_COUNT: "24",
  AVG_CLASS_SIZE: "28",
  FACULTY_PHD_PERCENT: "72",
  TUITION_UG_FROM_AED: "24,000",
  COST_COMPARISON_EVIDENCE: { en: "Instalment plans spread fees across the academic year.", ar: "تتيح خطط التقسيط توزيع الرسوم على مدار العام الدراسي." },
  VISA_OUTCOME_EVIDENCE: { en: "The university sponsors the student residence visa for every enrolled international student.", ar: "تكفل الجامعة تأشيرة إقامة الطالب لكل طالب دولي مسجّل." },
  OFFER_TURNAROUND_DAYS: "10",
  SAFETY_SOURCE: { en: "(Numbeo Safety Index)", ar: "(مؤشر نومبيو للأمان)" },
  CAMPUS_TRANSPORT_DETAIL: { en: "A free university shuttle runs from the nearest metro station every 20 minutes.", ar: "تعمل حافلة جامعية مجانية من أقرب محطة مترو كل 20 دقيقة." },
  MONTHLY_LIVING_COST_AED: "2,500",
  ACCOM_SHARED_AED: "2,400",
  ACCOM_STUDIO_AED: "4,800",
  ACCOM_ARRANGED_AED: "3,200",
  CAREERS_ADVICE_DETAIL: { en: "Every student is matched with a careers adviser in their first semester.", ar: "يُخصَّص لكل طالب مستشار مهني في فصله الأول." },
  INTERNSHIP_POLICY: { en: "Placements last eight to twelve weeks in the summer of the penultimate year.", ar: "يستمر التدريب من ثمانية إلى اثني عشر أسبوعاً في صيف السنة قبل الأخيرة." },
  EMPLOYER_EVENTS_DETAIL: { en: "Two careers fairs run each year, in October and March.", ar: "يُقام معرضان مهنيان كل عام، في أكتوبر ومارس." },
  TOUR_SCHEDULE: { en: "Monday to Thursday at 10am and 2pm, and last about an hour", ar: "من الاثنين إلى الخميس في العاشرة صباحاً والثانية ظهراً، وتستغرق نحو ساعة" },
  VIRTUAL_TOUR_URL: { en: "available from January 2027", ar: "متاحة ابتداءً من يناير 2027" },
  CHANCELLOR_PORTRAIT: { en: "Dr. Sadhna Kapoor", ar: "د. سادهنا كابور" },
  CHANCELLOR_NAME: { en: "Dr. Sadhna Kapoor", ar: "د. سادهنا كابور" },
  CHANCELLOR_QUOTE: {
    en: "Education is the prerequisite for socio-economic development of the Nation in general and people in particular.",
    ar: "التعليم شرط أساسي للتنمية الاجتماعية والاقتصادية للأمة عموماً وللناس خصوصاً.",
  },

  // ── Accessibility statement ──
  ACCESSIBILITY_KNOWN_ISSUES: { en: "We are converting older PDFs to accessible formats and expect to finish by March 2027.", ar: "نعمل على تحويل ملفات PDF القديمة إلى صيغ متاحة ونتوقع الانتهاء بحلول مارس 2027." },
  ACCESSIBILITY_EMAIL: "accessibility@rkdfdubai.ac.ae",
  ACCESSIBILITY_RESPONSE_DAYS: "5",
  ACCESSIBILITY_REVIEW_DATE: { en: "23 November 2026", ar: "23 نوفمبر 2026" },

  // ── Admissions FAQ ──
  FAQ_INTAKE_ANSWER: { en: "The first intake begins in September 2027, with a second intake in January 2028.", ar: "تبدأ الدفعة الأولى في سبتمبر 2027، تليها دفعة ثانية في يناير 2028." },
  FAQ_INTAKE_ANSWER_AR: "تبدأ الدفعة الأولى في سبتمبر 2027، تليها دفعة ثانية في يناير 2028.",
  FAQ_RECOGNITION_ANSWER: { en: "The Dubai campus is licensed by KHDA. Degrees are attested through the UAE Ministry of Higher Education for employment and further study.", ar: "حرم دبي مرخّص من هيئة المعرفة، وتُصدَّق الشهادات عبر وزارة التعليم العالي لأغراض العمل ومتابعة الدراسة." },
  FAQ_RECOGNITION_ANSWER_AR: "حرم دبي مرخّص من هيئة المعرفة، وتُصدَّق الشهادات عبر وزارة التعليم العالي لأغراض العمل ومتابعة الدراسة.",
  FAQ_VISA_ANSWER: { en: "Yes. The university sponsors a student residence visa for full-time international students.", ar: "نعم، تكفل الجامعة تأشيرة إقامة الطالب للطلاب الدوليين المتفرغين." },
  FAQ_VISA_ANSWER_AR: "نعم، تكفل الجامعة تأشيرة إقامة الطالب للطلاب الدوليين المتفرغين.",
  FAQ_INSTALMENTS_ANSWER: { en: "Yes. Tuition can be paid in two semester instalments or in four quarterly payments.", ar: "نعم، يمكن دفع الرسوم على قسطين فصليين أو أربع دفعات ربع سنوية." },
  FAQ_INSTALMENTS_ANSWER_AR: "نعم، يمكن دفع الرسوم على قسطين فصليين أو أربع دفعات ربع سنوية.",

  // ── Inner pages ──
  ABOUT_MISSION_STATEMENT: { en: "To offer an Indian university education of recognised quality to students across the Gulf, in a setting connected to the region’s economy.", ar: "تقديم تعليم جامعي هندي بجودة معترف بها لطلاب الخليج، في بيئة مرتبطة باقتصاد المنطقة." },
  ABOUT_HISTORY_COPY: { en: "RKDF University was launched in Bhopal on 14 February 2012, sponsored by the Ayushmati Education and Social Society. The Dubai campus is its first international campus.", ar: "انطلقت جامعة RKDF في بوبال في 14 فبراير 2012 برعاية جمعية أيوشماتي للتعليم والخدمة الاجتماعية، ويُعدّ حرم دبي أول حرم دولي لها." },
  ABOUT_VALUES: { en: "Rigour, access, integrity and service to the community.", ar: "الرصانة وإتاحة الفرص والنزاهة وخدمة المجتمع." },
  CHANCELLOR_MESSAGE: { en: "Education is the prerequisite for socio-economic development of the Nation in general and people in particular. Our Dubai campus extends that conviction to students across the Gulf.", ar: "التعليم شرط أساسي للتنمية الاجتماعية والاقتصادية للأمة عموماً وللناس خصوصاً، وحرم دبي يمدّ هذه القناعة إلى طلاب الخليج." },
  VC_NAME: { en: "Prof. Vijay K. Agrawal, Vice-Chancellor", ar: "أ.د. فيجاي ك. أغراوال، نائب رئيس الجامعة" },
  LEADERSHIP_TEAM: { en: "Chancellor: Dr. Sadhna Kapoor · Vice-Chancellor: Prof. Vijay K. Agrawal · Campus Director, Dubai: to be announced", ar: "رئيسة الجامعة: د. سادهنا كابور · نائب الرئيس: أ.د. فيجاي ك. أغراوال · مدير حرم دبي: يُعلن لاحقاً" },
  BOARD_MEMBERS: { en: "The Board of Management oversees both campuses and meets quarterly.", ar: "يشرف مجلس الإدارة على الحرمين ويجتمع كل ثلاثة أشهر." },
  GOVERNANCE_STRUCTURE: { en: "Governing Body, Board of Management, Academic Council and Boards of Studies, as at the Bhopal campus.", ar: "الهيئة الحاكمة ومجلس الإدارة والمجلس الأكاديمي ومجالس الدراسات، كما في حرم بوبال." },
  CAMPUS_FACILITIES: { en: "Teaching labs, a 300-seat auditorium, library and learning commons, prayer rooms and a student café.", ar: "مختبرات تعليمية وقاعة تتسع لـ300 مقعد ومكتبة ومركز تعلم ومصليات ومقهى للطلاب." },
  CAMPUS_PHOTOGRAPHY: { en: "Campus photography will be published when the building opens.", ar: "ستُنشر صور الحرم عند افتتاح المبنى." },
  TUITION_TABLE_AED: { en: "Annual tuition ranges from AED 18,000 (diploma) to AED 62,000 (MBA). See each program page for its fee.", ar: "تتراوح الرسوم السنوية بين 18,000 درهم (دبلوم) و62,000 درهم (ماجستير إدارة الأعمال). راجع صفحة كل برنامج." },
  PAYMENT_PLANS: { en: "Pay annually, per semester, or in four quarterly instalments.", ar: "ادفع سنوياً أو فصلياً أو على أربعة أقساط ربع سنوية." },
  REFUND_POLICY: { en: "Full refund less a AED 1,000 administration fee before the start of term.", ar: "استرداد كامل مع خصم رسوم إدارية قدرها 1,000 درهم قبل بداية الفصل." },
  VAT_NOTE: { en: "Tuition for qualifying programs is zero-rated for VAT in the UAE.", ar: "تخضع رسوم البرامج المؤهلة لنسبة صفر من ضريبة القيمة المضافة في الإمارات." },
  SCHOLARSHIP_MERIT: { en: "Merit: up to 50% for applicants scoring 90% or above.", ar: "التفوق: حتى 50% للمتقدمين الحاصلين على 90% فأكثر." },
  SCHOLARSHIP_NEED: { en: "Need-based: up to 30%, assessed on family income.", ar: "حسب الحاجة: حتى 30% وفق دخل الأسرة." },
  SCHOLARSHIP_EARLY_BIRD: { en: "Early bird: 10% for deposits paid before 31 March 2027.", ar: "التسجيل المبكر: 10% عند دفع العربون قبل 31 مارس 2027." },
  SCHOLARSHIP_SIBLING: { en: "Sibling: 10% for each additional enrolled sibling.", ar: "الأشقاء: 10% لكل أخ أو أخت مسجّل." },
  SCHOLARSHIP_ALUMNI: { en: "Alumni: 15% for RKDF graduates progressing to postgraduate study.", ar: "الخريجون: 15% لخريجي RKDF الملتحقين بالدراسات العليا." },
  DOCUMENT_CHECKLIST: { en: "Passport copy, photo, school transcripts, English test result, and Emirates ID (UAE residents).", ar: "نسخة جواز السفر وصورة شخصية وكشوف الدرجات ونتيجة اختبار اللغة الإنجليزية والهوية الإماراتية (للمقيمين)." },
  APPLICATION_FEE_AED: { en: "AED 500, non-refundable", ar: "500 درهم، غير مستردة" },
  APPLICATION_PORTAL_URL: { en: "The online application portal opens on 1 February 2027.", ar: "تفتح بوابة التقديم الإلكتروني في 1 فبراير 2027." },
  APPLICATION_FORM_PDF: { en: "Application form (PDF, 2027 intake)", ar: "نموذج التقديم (PDF، دفعة 2027)" },
  PROSPECTUS_PDF: { en: "Prospectus 2027–28 (PDF)", ar: "دليل الجامعة 2027–2028 (PDF)" },
  POLICY_DOCUMENTS: { en: "Academic regulations, admissions policy, refund policy, code of conduct.", ar: "اللوائح الأكاديمية وسياسة القبول وسياسة الاسترداد وقواعد السلوك." },
  VISA_PROCESS: { en: "Accept your offer and pay the deposit; we apply for your entry permit, then your residence visa and Emirates ID after arrival.", ar: "اقبل العرض وادفع العربون، ونتقدم بطلب تصريح الدخول ثم تأشيرة الإقامة والهوية الإماراتية بعد الوصول." },
  VISA_FEES_AED: { en: "AED 3,500 per year, including medical screening and Emirates ID.", ar: "3,500 درهم سنوياً، شاملة الفحص الطبي والهوية الإماراتية." },
  ATTESTATION_STEPS: { en: "School certificates must be attested in the country of issue and by the UAE embassy there before enrolment.", ar: "يجب تصديق الشهادات المدرسية في بلد الإصدار ولدى سفارة الإمارات هناك قبل التسجيل." },
  ARRIVAL_GUIDE: { en: "Airport pickup, orientation week and a buddy from the student union for every new international student.", ar: "استقبال في المطار وأسبوع تعريفي وزميل مرشد من اتحاد الطلاب لكل طالب دولي جديد." },
  AGENT_PORTAL_URL: { en: "Agent portal opens January 2027.", ar: "تفتح بوابة الوكلاء في يناير 2027." },
  AGENT_AGREEMENT_PROCESS: { en: "Agents are appointed after a due-diligence review and sign a code of practice.", ar: "يُعيَّن الوكلاء بعد مراجعة دقيقة ويوقّعون على مدونة ممارسة." },
  APPROVED_AGENT_LIST: { en: "The list of approved agents is published here and updated monthly.", ar: "تُنشر قائمة الوكلاء المعتمدين هنا وتُحدَّث شهرياً." },
  ACCOM_PARTNERS: { en: "Partner residences within 10 minutes of campus, with shared and studio rooms.", ar: "سكن شريك على بعد 10 دقائق من الحرم، بغرف مشتركة واستوديوهات." },
  CLUBS_LIST: { en: "Debating, robotics, film, cricket, football, Model UN, photography and community service, among others.", ar: "المناظرات والروبوتات والسينما والكريكيت وكرة القدم ونموذج الأمم المتحدة والتصوير والخدمة المجتمعية وغيرها." },
  SPORTS_FACILITIES: { en: "Shared access to Academic City’s sports hall, pool and pitches.", ar: "إمكانية استخدام القاعة الرياضية والمسبح والملاعب في المدينة الأكاديمية." },
  COUNSELLING_SERVICE: { en: "Free, confidential counselling with qualified counsellors, in English, Arabic and Hindi.", ar: "إرشاد نفسي مجاني وسري مع مرشدين مؤهلين، بالإنجليزية والعربية والهندية." },
  DISABILITY_SUPPORT: { en: "Individual learning plans, exam adjustments and an accessible campus.", ar: "خطط تعلّم فردية وتعديلات في الامتحانات وحرم ميسّر الوصول." },
  EMERGENCY_CONTACTS: { en: "Campus security 24/7 · Police 999 · Ambulance 998", ar: "أمن الحرم على مدار الساعة · الشرطة 999 · الإسعاف 998" },
  RESEARCH_STRATEGY: { en: "Applied research in sustainable technology, health and digital economy, aligned with UAE national priorities.", ar: "بحث تطبيقي في التقنيات المستدامة والصحة والاقتصاد الرقمي، بما يتوافق مع الأولويات الوطنية لدولة الإمارات." },
  RESEARCH_ETHICS_POLICY: { en: "All research involving people is reviewed by the university’s research ethics committee.", ar: "تراجع لجنة أخلاقيات البحث في الجامعة جميع الأبحاث التي تشمل البشر." },
  CAREERS_SERVICE_DETAIL: { en: "One-to-one advice, CV clinics, mock interviews and an employer network across the UAE.", ar: "إرشاد فردي وعيادات للسيرة الذاتية ومقابلات تجريبية وشبكة جهات توظيف في أنحاء الإمارات." },
  EMPLOYER_PARTNERS: { en: "Partner employers will be listed here as agreements are signed.", ar: "ستُدرج جهات التوظيف الشريكة هنا عند توقيع الاتفاقيات." },
  MOBILITY_POLICY_DETAIL: { en: "A semester in Bhopal from year two.", ar: "فصل دراسي في بوبال ابتداءً من السنة الثانية." },
  TRANSFER_PATHWAYS: { en: "Students may transfer between Dubai and Bhopal at the end of any academic year, subject to program availability.", ar: "يمكن للطلاب التحويل بين دبي وبوبال في نهاية أي عام دراسي، حسب توفر البرنامج." },
  EXCHANGE_PARTNERS: { en: "Exchange agreements with partner universities are being developed.", ar: "يجري تطوير اتفاقيات تبادل مع جامعات شريكة." },
  DEPARTMENT_DIRECTORY: { en: "Admissions · Student Services · Finance · Careers · Registry", ar: "القبول · خدمات الطلاب · المالية · المسار المهني · التسجيل" },
  PRIVACY_NOTICE_TEXT: { en: "We collect only the personal data needed to process your enquiry or application, and never sell it.", ar: "نجمع فقط البيانات الشخصية اللازمة لمعالجة استفسارك أو طلبك، ولا نبيعها أبداً." },
  DATA_PROTECTION_OFFICER_CONTACT: "privacy@rkdfdubai.ac.ae",
  TERMS_TEXT: { en: "By using this website you agree to these terms of use.", ar: "باستخدامك هذا الموقع فإنك توافق على شروط الاستخدام هذه." },
  OTHER: { en: "Other", ar: "أخرى" },
  CRM_ENDPOINT: "CRM",
};

/** Resolve one token key to text for a locale (undefined when there is no dummy value). */
export function dummyText(key: string, locale: "en" | "ar" = "en"): string | undefined {
  if (!DUMMY_MODE) return undefined;
  const v = DUMMY[key];
  if (v === undefined) return undefined;
  return typeof v === "string" ? v : v[locale];
}

/** A dummy numeric value for a stat token like "[[STAT_FACULTY]]", or null. */
export function dummyNumber(token: string): number | null {
  const v = dummyText(token.replace(/^\[\[|\]\]$/g, ""));
  if (v === undefined) return null;
  const n = Number(v.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}
