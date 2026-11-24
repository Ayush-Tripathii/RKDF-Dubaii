import type { ImageRef, L } from "./types";

/**
 * Schools & faculties — the 16 faculties of RKDF University, Bhopal, as listed at
 * https://rkdf.ac.in/academic&departments.php (fetched 23 Nov 2026). Disciplines come from each
 * faculty page. Summaries are DUMMY copy for the Dubai preview.
 * Status: mirrored from Bhopal — to be confirmed for the Dubai campus.
 * Every count on the site (carousel, headings, stats) is computed from this array and programs.ts.
 */
export type School = {
  slug: string;
  name: L;
  disciplines: [string, string, string];
  summary: L;
  image: ImageRef;
};

const img = (slug: string, height: number, en: string, ar: string): ImageRef => ({
  src: `/images/temp/school-${slug}.webp`,
  width: 1800,
  height,
  alt: { en, ar },
  temp: true,
});

export const schools: School[] = [
  {
    slug: "engineering",
    name: { en: "Faculty of Engineering & Technology", ar: "كلية الهندسة والتكنولوجيا" },
    disciplines: ["Computer Science & Engineering", "Civil & Mechanical Engineering", "Electronics & Communication"],
    summary: {
      en: "Undergraduate, postgraduate and diploma engineering, taught through laboratory work and industry projects with Dubai’s construction, energy and technology sectors.",
      ar: "برامج هندسية للبكالوريوس والدراسات العليا والدبلوم، تُدرَّس عبر العمل المخبري ومشاريع مع قطاعات البناء والطاقة والتكنولوجيا في دبي.",
    },
    image: img("engineering", 1201, "An engineer working at a robotics test bench", "مهندسة تعمل على منصة اختبار روبوتية"),
  },
  {
    slug: "management",
    name: { en: "Faculty of Management", ar: "كلية الإدارة" },
    disciplines: ["Business Administration (MBA)", "BBA", "Doctoral research in Management"],
    summary: {
      en: "Business education built around the Gulf economy — strategy, finance, operations and entrepreneurship, with case work drawn from UAE companies.",
      ar: "تعليم إداري يرتكز على اقتصاد الخليج — الاستراتيجية والتمويل والعمليات وريادة الأعمال، مع دراسات حالة من شركات إماراتية.",
    },
    image: img("management", 1200, "A professional in a suit on an office staircase", "مهني ببدلة رسمية على درج مكتبي"),
  },
  {
    slug: "computer-science",
    name: { en: "Faculty of Computer Science & Application", ar: "كلية علوم وتطبيقات الحاسوب" },
    disciplines: ["MCA", "BCA", "PGDCA & DCA"],
    summary: {
      en: "Software development, data and cloud computing, from one-year diplomas to the Master of Computer Applications.",
      ar: "تطوير البرمجيات والبيانات والحوسبة السحابية، من دبلومات السنة الواحدة إلى ماجستير تطبيقات الحاسوب.",
    },
    image: img("computer-science", 1200, "Students working together at computer screens", "طلاب يعملون معاً أمام شاشات الحاسوب"),
  },
  {
    slug: "pharmacy",
    name: { en: "Faculty of Pharmacy", ar: "كلية الصيدلة" },
    disciplines: ["B.Pharm & D.Pharm", "M.Pharm Pharmaceutics", "M.Pharm Pharmacology"],
    summary: {
      en: "Pharmaceutical sciences from diploma to doctorate, with practice-based training for the region’s healthcare and pharmaceutical industries.",
      ar: "العلوم الصيدلانية من الدبلوم إلى الدكتوراه، مع تدريب عملي لقطاعي الرعاية الصحية والصناعات الدوائية في المنطقة.",
    },
    image: img("pharmacy", 1202, "Capsules spilling from a pill bottle", "كبسولات تنسكب من عبوة دواء"),
  },
  {
    slug: "law",
    name: { en: "Faculty of Law", ar: "كلية الحقوق" },
    disciplines: ["BA LLB (integrated)", "LLB", "LLM"],
    summary: {
      en: "Integrated and graduate-entry law degrees with moot court practice and a focus on commercial and international law.",
      ar: "شهادات قانونية متكاملة وللخريجين مع تدريب في المحكمة الصورية وتركيز على القانون التجاري والدولي.",
    },
    image: img("law", 1200, "A statue of Justice holding scales", "تمثال العدالة يحمل الميزان"),
  },
  {
    slug: "science",
    name: { en: "Faculty of Science", ar: "كلية العلوم" },
    disciplines: ["Biotechnology & Microbiology", "Physics & Chemistry", "Botany & Zoology"],
    summary: {
      en: "Laboratory-led study in the life and physical sciences, from the B.Sc. through M.Sc. specialisations to doctoral research.",
      ar: "دراسة قائمة على المختبر في علوم الحياة والعلوم الفيزيائية، من البكالوريوس إلى تخصصات الماجستير والدكتوراه.",
    },
    image: img("science", 1200, "Laboratory glassware on a bench", "أدوات زجاجية مخبرية على طاولة"),
  },
  {
    slug: "commerce",
    name: { en: "Faculty of Commerce", ar: "كلية التجارة" },
    disciplines: ["B.Com & B.Com (Hons.)", "B.Com (CS)", "M.Com"],
    summary: {
      en: "Accounting, taxation and corporate practice, preparing graduates for finance roles and professional qualifications.",
      ar: "المحاسبة والضرائب والممارسات المؤسسية، لإعداد الخريجين لوظائف مالية ومؤهلات مهنية.",
    },
    image: img("commerce", 1033, "Financial documents and a calculator on a desk", "مستندات مالية وآلة حاسبة على مكتب"),
  },
  {
    slug: "architecture",
    name: { en: "Faculty of Architecture", ar: "كلية العمارة" },
    disciplines: ["Architectural design", "Building technology", "Urban studies"],
    summary: {
      en: "Studio-based architectural education in a city that is itself a living case study in contemporary design.",
      ar: "تعليم معماري قائم على الاستوديو في مدينة تُعدّ بحد ذاتها دراسة حالة حية في التصميم المعاصر.",
    },
    image: img("architecture", 1200, "A geometric glass building against a pale sky", "مبنى زجاجي هندسي أمام سماء صافية"),
  },
  {
    slug: "education",
    name: { en: "Faculty of Education", ar: "كلية التربية" },
    disciplines: ["B.Ed", "M.Ed", "D.Ed"],
    summary: {
      en: "Teacher education and educational leadership, with school placements built into every program.",
      ar: "إعداد المعلمين والقيادة التربوية، مع تدريب ميداني في المدارس ضمن كل برنامج.",
    },
    image: img("education", 1120, "A teacher in front of a classroom of students", "معلم أمام صف من الطلاب"),
  },
  {
    slug: "social-science",
    name: { en: "Faculty of Social Science", ar: "كلية العلوم الاجتماعية" },
    disciplines: ["Arts (BA, MA)", "Social Work (MSW)", "Humanities & Languages"],
    summary: {
      en: "The study of society, language and public life, with community-based fieldwork for social work students.",
      ar: "دراسة المجتمع واللغة والحياة العامة، مع عمل ميداني مجتمعي لطلاب الخدمة الاجتماعية.",
    },
    image: img("social-science", 1013, "Friends sitting arm in arm looking out at the hills", "أصدقاء يجلسون متشابكي الأذرع ينظرون إلى التلال"),
  },
  {
    slug: "agriculture",
    name: { en: "Faculty of Agriculture", ar: "كلية الزراعة" },
    disciplines: ["B.Sc. (Hons) Agriculture", "Agronomy", "Food security"],
    summary: {
      en: "Agricultural science with an eye on arid-climate farming, water use and food security — priorities for the UAE.",
      ar: "العلوم الزراعية مع اهتمام بالزراعة في المناخ الجاف واستخدام المياه والأمن الغذائي — وهي أولويات لدولة الإمارات.",
    },
    image: img("agriculture", 1200, "Rows of young maize plants in a field", "صفوف من نباتات الذرة الصغيرة في حقل"),
  },
  {
    slug: "nursing",
    name: { en: "Faculty of Nursing", ar: "كلية التمريض" },
    disciplines: ["B.Sc. Nursing", "Post Basic B.Sc. Nursing", "GNM"],
    summary: {
      en: "Professional nursing education combining clinical skills laboratories with supervised hospital placements.",
      ar: "تعليم تمريضي مهني يجمع بين مختبرات المهارات السريرية والتدريب الإشرافي في المستشفيات.",
    },
    image: img("nursing", 1200, "A carer holding a patient’s hands", "مقدّم رعاية يمسك يدي مريض"),
  },
  {
    slug: "paramedical",
    name: { en: "Faculty of Paramedical", ar: "كلية العلوم الطبية المساعدة" },
    disciplines: ["Optometry", "Medical laboratory technology", "Operation theatre technology"],
    summary: {
      en: "Allied health programs that train the technologists and specialists modern hospitals depend on.",
      ar: "برامج صحية مساندة تُعدّ الفنيين والاختصاصيين الذين تعتمد عليهم المستشفيات الحديثة.",
    },
    image: img("paramedical", 1200, "A modern hospital operating theatre", "غرفة عمليات حديثة في مستشفى"),
  },
  {
    slug: "ayurveda",
    name: { en: "Faculty of Ayurveda", ar: "كلية الأيورفيدا" },
    disciplines: ["BAMS", "Herbal medicine", "Panchakarma"],
    summary: {
      en: "The Bachelor of Ayurvedic Medicine and Surgery, combining classical Ayurveda with modern clinical science.",
      ar: "بكالوريوس الطب والجراحة الأيورفيدية، الذي يجمع الأيورفيدا التقليدية مع العلوم السريرية الحديثة.",
    },
    image: img("ayurveda", 1200, "Handmade herbal soaps beside sprigs of lavender", "صابون عشبي مصنوع يدوياً بجانب أغصان الخزامى"),
  },
  {
    slug: "homoeopathy",
    name: { en: "Faculty of Homoeopathy", ar: "كلية المعالجة المثلية" },
    disciplines: ["BHMS", "Materia medica", "Clinical practice"],
    summary: {
      en: "The Bachelor of Homoeopathic Medicine and Surgery, with supervised clinical training.",
      ar: "بكالوريوس الطب والجراحة المثلية، مع تدريب سريري تحت الإشراف.",
    },
    image: img("homoeopathy", 2391, "Assorted capsules and tablets", "كبسولات وأقراص متنوعة"),
  },
  {
    slug: "library",
    name: { en: "Faculty of Library & Information Science", ar: "كلية علوم المكتبات والمعلومات" },
    disciplines: ["B.Lib", "M.Lib", "Digital archives"],
    summary: {
      en: "Information management for libraries, archives and the digital knowledge economy.",
      ar: "إدارة المعلومات للمكتبات والأرشيف واقتصاد المعرفة الرقمي.",
    },
    image: img("library", 1664, "A long library aisle lit by hanging bulbs", "ممر طويل في مكتبة تضيئه مصابيح معلقة"),
  },
];

export const getSchool = (slug: string) => schools.find((s) => s.slug === slug);
