import type { ImageRef, L } from "./types";

/**
 * News & events — DUMMY content for the preview.
 * The homepage filters events against today's date (re-evaluated hourly), so a past event can
 * never sit on the homepage as "upcoming"; when nothing is upcoming the section says so.
 */
export type NewsItem = { slug: string; title: L; excerpt: L; body: L; date: string | null; category: L; image: ImageRef };
export type EventItem = { slug: string; title: L; kind: "open-day" | "webinar" | "info-session" | "campus-tour"; date: string | null; time: L; location: L };

const img = (n: number, en: string, ar: string, height = 1200): ImageRef => ({ src: `/images/temp/news-${n}.webp`, width: 1800, height, alt: { en, ar }, temp: true });

const cat = {
  campus: { en: "Campus", ar: "الحرم الجامعي" },
  admissions: { en: "Admissions", ar: "القبول" },
  research: { en: "Research", ar: "البحث" },
  community: { en: "Community", ar: "المجتمع" },
} satisfies Record<string, L>;

export const news: NewsItem[] = [
  {
    slug: "dubai-campus-announced",
    title: { en: "RKDF University announces its first international campus, in Dubai", ar: "جامعة RKDF تعلن عن أول حرم دولي لها في دبي" },
    excerpt: { en: "The Dubai campus will welcome its first students in September 2027, offering programs across all sixteen faculties of the Bhopal university.", ar: "يستقبل حرم دبي أول طلابه في سبتمبر 2027، ويقدّم برامج في الكليات الست عشرة لجامعة بوبال." },
    body: { en: "RKDF University, Bhopal, has confirmed plans for its first international campus in Dubai International Academic City. The campus will open for its first intake in September 2027, with undergraduate, postgraduate, diploma and doctoral programs drawn from the university’s sixteen faculties.", ar: "أكدت جامعة RKDF في بوبال خططها لإنشاء أول حرم دولي لها في مدينة دبي الأكاديمية العالمية. ويفتح الحرم أبوابه لأول دفعة في سبتمبر 2027، ببرامج للبكالوريوس والدراسات العليا والدبلوم والدكتوراه من الكليات الست عشرة للجامعة." },
    date: "2026-11-10",
    category: cat.campus,
    image: img(1, "Students taking notes together in a seminar", "طلاب يدوّنون الملاحظات معاً في حلقة نقاش"),
  },
  {
    slug: "applications-open-2027",
    title: { en: "Applications open for the September 2027 intake", ar: "فتح باب التقديم لدفعة سبتمبر 2027" },
    excerpt: { en: "Early-bird scholarships of 10% are available for deposits paid before 31 March.", ar: "منح التسجيل المبكر بنسبة 10% متاحة عند دفع العربون قبل 31 مارس." },
    body: { en: "Applications are now open for all programs starting in September 2027. Applicants who accept their offer and pay a deposit before 31 March 2027 receive a 10% early-bird scholarship.", ar: "باب التقديم مفتوح الآن لجميع البرامج التي تبدأ في سبتمبر 2027. ويحصل المتقدمون الذين يقبلون عرضهم ويدفعون العربون قبل 31 مارس 2027 على منحة تسجيل مبكر بنسبة 10%." },
    date: "2026-11-03",
    category: cat.admissions,
    image: img(2, "A lecturer presenting to a seated class", "محاضر يقدّم أمام صف من الطلاب"),
  },
  {
    slug: "sustainable-construction-centre",
    title: { en: "New centre to research sustainable construction in arid climates", ar: "مركز جديد لأبحاث البناء المستدام في المناخات الجافة" },
    excerpt: { en: "The Faculty of Engineering & Technology will lead the centre’s first projects with partners in Dubai.", ar: "تقود كلية الهندسة والتكنولوجيا أولى مشاريع المركز مع شركاء في دبي." },
    body: { en: "The Centre for Sustainable Built Environments will study low-carbon materials, cooling and water reuse for buildings in hot, arid climates.", ar: "يدرس مركز البيئات المبنية المستدامة المواد منخفضة الكربون والتبريد وإعادة استخدام المياه في المباني بالمناخات الحارة والجافة." },
    date: "2026-10-21",
    category: cat.research,
    image: img(3, "A speaker addressing a full auditorium", "متحدث أمام قاعة ممتلئة"),
  },
  {
    slug: "bhopal-convocation-2026",
    title: { en: "Bhopal convocation honours the class of 2026", ar: "حفل تخريج بوبال يكرّم دفعة 2026" },
    excerpt: { en: "Gold and silver medals were awarded for academic sessions 2024–25 and 2025–26.", ar: "مُنحت الميداليات الذهبية والفضية للعامين الأكاديميين 2024–2025 و2025–2026." },
    body: { en: "The Bhopal campus held its annual convocation, awarding degrees and medals across its faculties.", ar: "أقام حرم بوبال حفل التخريج السنوي، ومنح الشهادات والميداليات في مختلف كلياته." },
    date: "2026-10-08",
    category: cat.community,
    image: img(4, "A tiered lecture theatre", "قاعة محاضرات متدرجة", 1350),
  },
  {
    slug: "student-ambassadors",
    title: { en: "Meet the first Dubai student ambassadors", ar: "تعرّف على أول سفراء طلاب في دبي" },
    excerpt: { en: "Eight students from Bhopal will help welcome new arrivals to Dubai next September.", ar: "ثمانية طلاب من بوبال سيساعدون في استقبال الطلاب الجدد في دبي في سبتمبر المقبل." },
    body: { en: "The ambassadors will run orientation week, campus tours and peer mentoring for the first Dubai intake.", ar: "سيتولى السفراء تنظيم الأسبوع التعريفي والجولات في الحرم والإرشاد بين الأقران للدفعة الأولى في دبي." },
    date: "2026-09-25",
    category: cat.campus,
    image: img(5, "A group of students sitting together outdoors", "مجموعة طلاب يجلسون معاً في الهواء الطلق", 2328),
  },
];

const DIAC: L = { en: "Dubai International Academic City", ar: "مدينة دبي الأكاديمية العالمية" };
const ONLINE: L = { en: "Online", ar: "عبر الإنترنت" };

export const events: EventItem[] = [
  { slug: "open-day-december", title: { en: "Winter Open Day", ar: "اليوم المفتوح الشتوي" }, kind: "open-day", date: "2026-12-12", time: { en: "10:00–14:00", ar: "10:00–14:00" }, location: DIAC },
  { slug: "webinar-scholarships", title: { en: "Scholarships & fees explained", ar: "شرح المنح والرسوم" }, kind: "webinar", date: "2027-01-14", time: { en: "18:00 GST", ar: "18:00 بتوقيت الخليج" }, location: ONLINE },
  { slug: "info-engineering", title: { en: "Engineering & Technology information session", ar: "جلسة معلومات الهندسة والتكنولوجيا" }, kind: "info-session", date: "2027-02-06", time: { en: "16:00–17:30", ar: "16:00–17:30" }, location: DIAC },
  { slug: "tour-february", title: { en: "Guided campus tour for families", ar: "جولة إرشادية في الحرم للعائلات" }, kind: "campus-tour", date: "2027-02-20", time: { en: "10:00–11:00", ar: "10:00–11:00" }, location: DIAC },
];

export const getNews = (slug: string) => news.find((x) => x.slug === slug);

export function sortedNews() {
  return [...news].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

/** Events on or after `todayISO`, soonest first. Unconfirmed (null-date) events are kept, after dated ones. */
export function upcomingEvents(todayISO: string) {
  const dated = events.filter((x) => x.date && x.date >= todayISO).sort((a, b) => a.date!.localeCompare(b.date!));
  return [...dated, ...events.filter((x) => !x.date)];
}
