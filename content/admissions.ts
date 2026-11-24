import type { L } from "./types";

/**
 * Entry requirements by curriculum — DUMMY equivalences derived from the Bhopal campus’s published
 * 10+2 requirements (minimum 45–50%). Must be confirmed by Admissions before launch.
 */
export type Curriculum = { id: string; name: L; undergraduate: L; foundation: L; english: L };

export const curricula: Curriculum[] = [
  { id: "cbse-icse", name: { en: "CBSE / ICSE (India)", ar: "CBSE / ICSE (الهند)" },
    undergraduate: { en: "Class XII with an overall 50% (45% for some programs); subject prerequisites per program", ar: "الصف الثاني عشر بمعدل 50% (45% لبعض البرامج) مع المواد المطلوبة لكل برنامج" },
    foundation: { en: "Class X with 35% for diploma programs", ar: "الصف العاشر بنسبة 35% لبرامج الدبلوم" },
    english: { en: "Class XII English, 60% or above", ar: "اللغة الإنجليزية في الصف الثاني عشر بنسبة 60% فأكثر" } },
  { id: "ib", name: { en: "International Baccalaureate", ar: "البكالوريا الدولية" },
    undergraduate: { en: "IB Diploma with 24 points; HL subjects per program", ar: "دبلوم البكالوريا الدولية بـ24 نقطة مع مواد المستوى الأعلى المطلوبة" },
    foundation: { en: "IB courses with 18 points", ar: "مقررات البكالوريا الدولية بـ18 نقطة" },
    english: { en: "English A or B at SL 4", ar: "الإنجليزية A أو B بمستوى SL 4" } },
  { id: "a-level", name: { en: "British A-Level", ar: "الشهادة البريطانية A-Level" },
    undergraduate: { en: "Two A-Levels at grade C or above, plus five IGCSEs", ar: "مادتان في A-Level بدرجة C فأعلى، إضافة إلى خمس مواد IGCSE" },
    foundation: { en: "Five IGCSEs at grade C or above", ar: "خمس مواد IGCSE بدرجة C فأعلى" },
    english: { en: "IGCSE English grade C", ar: "الإنجليزية في IGCSE بدرجة C" } },
  { id: "american", name: { en: "American High School Diploma", ar: "شهادة الثانوية الأمريكية" },
    undergraduate: { en: "High School Diploma with a GPA of 2.5; SAT optional", ar: "شهادة الثانوية بمعدل 2.5؛ واختبار SAT اختياري" },
    foundation: { en: "Grade 10 completion with a GPA of 2.0", ar: "إتمام الصف العاشر بمعدل 2.0" },
    english: { en: "Grade 12 English with C or above", ar: "الإنجليزية في الصف الثاني عشر بدرجة C فأعلى" } },
  { id: "waec", name: { en: "WAEC (West Africa)", ar: "WAEC (غرب أفريقيا)" },
    undergraduate: { en: "WASSCE with five credits (C6 or above), including Mathematics", ar: "شهادة WASSCE بخمس مواد بدرجة C6 فأعلى، منها الرياضيات" },
    foundation: { en: "WASSCE with three credits", ar: "شهادة WASSCE بثلاث مواد ناجحة" },
    english: { en: "WASSCE English credit (C6)", ar: "الإنجليزية في WASSCE بدرجة C6" } },
  { id: "other", name: { en: "UAE Ministry certificate & other national curricula", ar: "شهادة الوزارة الإماراتية والمناهج الوطنية الأخرى" },
    undergraduate: { en: "Secondary school certificate with 60%, assessed for equivalence", ar: "شهادة الثانوية بنسبة 60% مع تقييم المعادلة" },
    foundation: { en: "Grade 10 certificate with 50%", ar: "شهادة الصف العاشر بنسبة 50%" },
    english: { en: "IELTS 5.5, TOEFL iBT 61, or the university’s English test", ar: "IELTS بدرجة 5.5 أو TOEFL iBT بدرجة 61 أو اختبار اللغة الإنجليزية في الجامعة" } },
];

/** Admissions FAQ — questions are editorial; answers are tokens. Feeds FAQPage JSON-LD. */
export const admissionsFaqs: { q: L; a: L }[] = [
  {
    q: { en: "When does the next intake start?", ar: "متى تبدأ الدفعة القادمة؟" },
    a: { en: "[[FAQ_INTAKE_ANSWER]]", ar: "[[FAQ_INTAKE_ANSWER_AR]]" },
  },
  {
    q: { en: "Is my degree recognised in the UAE?", ar: "هل شهادتي معترف بها في الإمارات؟" },
    a: { en: "[[FAQ_RECOGNITION_ANSWER]]", ar: "[[FAQ_RECOGNITION_ANSWER_AR]]" },
  },
  {
    q: { en: "Can the university sponsor my student visa?", ar: "هل يمكن للجامعة كفالة تأشيرة الطالب؟" },
    a: { en: "[[FAQ_VISA_ANSWER]]", ar: "[[FAQ_VISA_ANSWER_AR]]" },
  },
  {
    q: { en: "Can I pay tuition in instalments?", ar: "هل يمكنني دفع الرسوم على أقساط؟" },
    a: { en: "[[FAQ_INSTALMENTS_ANSWER]]", ar: "[[FAQ_INSTALMENTS_ANSWER_AR]]" },
  },
];

export const countryCodes = [
  { code: "+971", label: "UAE +971" },
  { code: "+966", label: "Saudi Arabia +966" },
  { code: "+974", label: "Qatar +974" },
  { code: "+968", label: "Oman +968" },
  { code: "+973", label: "Bahrain +973" },
  { code: "+965", label: "Kuwait +965" },
  { code: "+91", label: "India +91" },
  { code: "+92", label: "Pakistan +92" },
  { code: "+880", label: "Bangladesh +880" },
  { code: "+977", label: "Nepal +977" },
  { code: "+94", label: "Sri Lanka +94" },
  { code: "+20", label: "Egypt +20" },
  { code: "+962", label: "Jordan +962" },
  { code: "+961", label: "Lebanon +961" },
  { code: "+234", label: "Nigeria +234" },
  { code: "+254", label: "Kenya +254" },
  { code: "+233", label: "Ghana +233" },
  { code: "+27", label: "South Africa +27" },
  { code: "+44", label: "United Kingdom +44" },
  { code: "+1", label: "USA / Canada +1" },
  { code: "+7", label: "Russia / Kazakhstan +7" },
  { code: "+86", label: "China +86" },
  { code: "+63", label: "Philippines +63" },
  { code: "+62", label: "Indonesia +62" },
];
