import type { Dict } from "./translations";

/** Header & footer navigation. Labels for plain paths come from the route registry (routes.ts). */
export type NavKey = keyof Dict["nav"];

export type MegaColumn = { heading: NavKey; links: string[] /* paths */ };
export type MainNavItem = {
  key: NavKey;
  href: string;
  mega?: {
    overview: NavKey;
    columns: MegaColumn[];
    featured: { eyebrow: NavKey; title: NavKey; href: string; image: string; imageW: number; imageH: number };
  };
};

export const mainNav: MainNavItem[] = [
  { key: "about", href: "/about" },
  {
    key: "academics",
    href: "/academics",
    mega: {
      overview: "academicsOverview",
      columns: [
        { heading: "schools", links: ["@schools"] },
        { heading: "study", links: ["/programs", "/research", "/global"] },
        { heading: "university", links: ["/about/accreditation", "/about/campus", "/downloads"] },
      ],
      featured: { eyebrow: "featuredAcademicsEyebrow", title: "featuredAcademicsTitle", href: "/programs", image: "/images/temp/campus-study.webp", imageW: 1800, imageH: 1200 },
    },
  },
  {
    key: "admissions",
    href: "/admissions",
    mega: {
      overview: "admissionsOverview",
      columns: [
        { heading: "applying", links: ["/admissions/how-to-apply", "/admissions/entry-requirements", "/apply"] },
        { heading: "costs", links: ["/admissions/tuition-fees", "/admissions/scholarships", "/student-life/accommodation"] },
        { heading: "international", links: ["/admissions/international", "/admissions/agents", "/events"] },
      ],
      featured: { eyebrow: "featuredAdmissionsEyebrow", title: "featuredAdmissionsTitle", href: "/visit", image: "/images/temp/visit-campus.webp", imageW: 1800, imageH: 1202 },
    },
  },
  { key: "research", href: "/research" },
  { key: "campusLife", href: "/student-life" },
  { key: "careers", href: "/careers" },
  { key: "news", href: "/news" },
];

export const footerColumns: { heading: keyof Dict["footer"]; links: string[] }[] = [
  { heading: "university", links: ["/about", "/about/chancellor", "/about/leadership", "/about/accreditation", "/about/campus", "/global"] },
  { heading: "admissions", links: ["/admissions", "/admissions/entry-requirements", "/admissions/tuition-fees", "/admissions/scholarships", "/admissions/international", "/admissions/agents"] },
  { heading: "academics", links: ["/academics", "/programs", "/research", "/careers"] },
  { heading: "resources", links: ["/student-life", "/student-life/accommodation", "/student-life/clubs", "/student-life/support", "/downloads"] },
  { heading: "connect", links: ["/news", "/events", "/visit", "/contact", "/apply"] },
];
