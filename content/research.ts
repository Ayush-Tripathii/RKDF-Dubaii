import type { ImageRef, L } from "./types";

/** Research centres — DUMMY names, focus areas and leads for the preview. */
export type ResearchCentre = { slug: string; name: L; focus: L; lead: L; image: ImageRef };

const image = (n: number, en: string, ar: string, height = 1200): ImageRef => ({ src: `/images/temp/research-${n}.webp`, width: 1800, height, alt: { en, ar }, temp: true });

export const researchCentres: ResearchCentre[] = [
  {
    slug: "digital-systems",
    name: { en: "Centre for Applied AI & Digital Systems", ar: "مركز الذكاء الاصطناعي التطبيقي والأنظمة الرقمية" },
    focus: { en: "Machine learning for logistics, smart-city data and Arabic-language computing.", ar: "تعلم الآلة للخدمات اللوجستية وبيانات المدن الذكية والحوسبة باللغة العربية." },
    lead: { en: "Faculty of Computer Science & Application", ar: "كلية علوم وتطبيقات الحاسوب" },
    image: image(1, "A researcher working beside illuminated server racks", "باحثة تعمل بجوار خوادم حاسوبية مضاءة", 1202),
  },
  {
    slug: "health-sciences",
    name: { en: "Centre for Pharmaceutical & Health Sciences", ar: "مركز العلوم الصيدلانية والصحية" },
    focus: { en: "Drug formulation, regulatory science and community health in the Gulf.", ar: "تركيب الأدوية والعلوم التنظيمية وصحة المجتمع في الخليج." },
    lead: { en: "Faculty of Pharmacy", ar: "كلية الصيدلة" },
    image: image(2, "A stethoscope resting on a laptop keyboard", "سماعة طبية على لوحة مفاتيح حاسوب"),
  },
  {
    slug: "built-environment",
    name: { en: "Centre for Sustainable Built Environments", ar: "مركز البيئات المبنية المستدامة" },
    focus: { en: "Low-carbon materials, cooling and water reuse for buildings in arid climates.", ar: "المواد منخفضة الكربون والتبريد وإعادة استخدام المياه في المباني بالمناخات الجافة." },
    lead: { en: "Faculty of Engineering & Technology", ar: "كلية الهندسة والتكنولوجيا" },
    image: image(3, "A team collaborating around laptops on a shared table", "فريق يتعاون حول حواسيب على طاولة مشتركة"),
  },
];
