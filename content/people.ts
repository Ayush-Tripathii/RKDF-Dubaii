import type { ImageRef, L } from "./types";

/**
 * Testimonials — DUMMY: fictional people with stock portraits, for the preview only.
 * Replace with real, consented testimonials before launch.
 * The Chancellor is a real person (Dr. Sadhna Kapoor, per rkdf.ac.in) — no stock photo may stand in
 * for her; her portrait stays a slot until an official photograph is supplied.
 */
export type Testimonial = { quote: L; name: string; program: L; nationality: L; year: string; role: "student" | "faculty"; portrait: ImageRef };

const portrait = (n: number, height: number, en: string, ar: string): ImageRef => ({ src: `/images/temp/portrait-${n}.webp`, width: 1800, height, alt: { en, ar }, temp: true });

export const testimonials: Testimonial[] = [
  {
    quote: { en: "I wanted an Indian degree I could build a career on in the Gulf. Studying in Dubai means my internship and my classes are in the same city.", ar: "أردت شهادة هندية أبني عليها مسيرتي في الخليج. الدراسة في دبي تعني أن تدريبي وصفوفي في المدينة نفسها." },
    name: "Ananya Rao",
    program: { en: "B.E. Computer Science & Engineering", ar: "بكالوريوس الهندسة في علوم الحاسوب" },
    nationality: { en: "Indian", ar: "هندية" },
    year: "2027",
    role: "student",
    portrait: portrait(1, 1200, "Portrait of Ananya Rao", "صورة أنانيا راو"),
  },
  {
    quote: { en: "Our pharmacy students train with the same curriculum as Bhopal, but their placements are with hospitals and manufacturers across the UAE.", ar: "يتدرب طلاب الصيدلة لدينا وفق منهج بوبال نفسه، لكن تدريبهم العملي في مستشفيات ومصانع في أنحاء الإمارات." },
    name: "Dr. Omar Siddiqui",
    program: { en: "Faculty of Pharmacy", ar: "كلية الصيدلة" },
    nationality: { en: "Emirati", ar: "إماراتي" },
    year: "2026",
    role: "faculty",
    portrait: portrait(2, 2700, "Portrait of Dr. Omar Siddiqui", "صورة د. عمر صديقي"),
  },
  {
    quote: { en: "The MBA cohort is small enough that every professor knows my work. Half of my classmates are already working in Dubai.", ar: "مجموعة ماجستير إدارة الأعمال صغيرة بما يكفي ليعرف كل أستاذ عملي. ونصف زملائي يعملون بالفعل في دبي." },
    name: "Grace Mensah",
    program: { en: "Master of Business Administration", ar: "ماجستير إدارة الأعمال" },
    nationality: { en: "Ghanaian", ar: "غانية" },
    year: "2028",
    role: "student",
    portrait: portrait(3, 2700, "Portrait of Grace Mensah", "صورة غريس منساه"),
  },
];

export const chancellor = {
  name: "[[CHANCELLOR_NAME]]",
  quote: "[[CHANCELLOR_QUOTE]]",
  portrait: null as string | null,
};
