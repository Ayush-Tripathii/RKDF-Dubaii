import { programs } from "./programs";
import { schools } from "./schools";
import { researchCentres } from "./research";
import type { Stat } from "./types";

/**
 * Stats. A stat is either a confirmed number (value) or null (renders its [[TOKEN]]).
 * Count-up animation only runs on confirmed numbers, and the real number is always in the HTML.
 * Program/school/centre counts are COMPUTED from the data files so they can never disagree.
 */
const s = (
  key: string,
  value: number | null,
  token: string,
  label: Stat["label"],
  qualifier: Stat["qualifier"],
  extra: Partial<Stat> = {},
): Stat => ({ key, value, token, label, qualifier, ...extra });

export const universityInNumbers: Stat[] = [
  s("programs", programs.length, "[[STAT_PROGRAMS]]", { en: "Programs", ar: "برنامجاً" }, {
    en: `Across ${schools.length} schools, ${"[[INTAKE_TERM]]"} intake`,
    ar: `في ${schools.length} كليات، دفعة [[INTAKE_TERM]]`,
  }),
  s("students", null, "[[STAT_STUDENTS]]", { en: "Students", ar: "طالب" }, { en: "Enrolled, [[STAT_STUDENTS_AS_OF]]", ar: "مسجّلون، حتى [[STAT_STUDENTS_AS_OF]]" }),
  s("faculty", null, "[[STAT_FACULTY]]", { en: "Faculty", ar: "عضو هيئة تدريس" }, { en: "Full-time teaching staff", ar: "أعضاء هيئة تدريس متفرغون" }),
  s("nationalities", null, "[[STUDENT_NATIONALITIES]]", { en: "Nationalities", ar: "جنسية" }, { en: "In the student body", ar: "بين الطلاب" }, { suffix: "+" }),
  s("outcomes", null, "[[STAT_GRAD_OUTCOMES]]", { en: "Graduate outcomes", ar: "نتائج الخريجين" }, { en: "Employed or in further study, Class of [[YEAR]]", ar: "يعملون أو يتابعون الدراسة، دفعة [[YEAR]]" }, { suffix: "%" }),
  s("labs", researchCentres.length, "[[STAT_RESEARCH_CENTRES]]", { en: "Research centres", ar: "مراكز بحثية" }, { en: "Listed under Research & industry", ar: "مدرجة في قسم البحث والصناعة" }),
];

export const lifeStats: Stat[] = [
  s("clubs", null, "[[STAT_CLUBS]]", { en: "Clubs & societies", ar: "نادٍ وجمعية" }, { en: "Student-led", ar: "يقودها الطلاب" }),
  s("housing", null, "[[STAT_HOUSING_OPTIONS]]", { en: "Housing options", ar: "خيارات سكن" }, { en: "Arranged or partner residences", ar: "سكن جامعي أو سكن شريك" }),
  s("sport", null, "[[STAT_SPORTS]]", { en: "Sports", ar: "رياضة" }, { en: "Teams and recreational", ar: "فرق وأنشطة ترفيهية" }),
  s("nationalities", null, "[[STUDENT_NATIONALITIES]]", { en: "Nationalities", ar: "جنسية" }, { en: "On one campus", ar: "في حرم واحد" }, { suffix: "+" }),
];

export const researchStats: Stat[] = [
  s("centres", researchCentres.length, "[[STAT_RESEARCH_CENTRES]]", { en: "Research centres", ar: "مراكز بحثية" }, { en: "Dubai campus", ar: "حرم دبي" }),
  s("projects", null, "[[STAT_ACTIVE_PROJECTS]]", { en: "Active projects", ar: "مشروعاً قائماً" }, { en: "As of [[YEAR]]", ar: "حتى [[YEAR]]" }),
  s("partners", null, "[[STAT_INDUSTRY_PARTNERS]]", { en: "Industry partners", ar: "شريكاً صناعياً" }, { en: "Signed agreements", ar: "اتفاقيات موقّعة" }),
  s("funding", null, "[[STAT_RESEARCH_FUNDING_AED]]", { en: "Research funding", ar: "تمويل البحث" }, { en: "AED million, [[YEAR]]", ar: "مليون درهم، [[YEAR]]" }),
];

export const careerStats: Stat[] = [
  s("outcomes", null, "[[STAT_GRAD_OUTCOMES]]", { en: "Graduate outcomes", ar: "نتائج الخريجين" }, { en: "Within [[MONTHS]] months, Class of [[YEAR]]", ar: "خلال [[MONTHS]] أشهر، دفعة [[YEAR]]" }, { suffix: "%" }),
  s("internships", null, "[[STAT_INTERNSHIPS]]", { en: "Internship placements", ar: "فرصة تدريب" }, { en: "Academic year [[YEAR]]", ar: "العام الأكاديمي [[YEAR]]" }),
  s("employers", null, "[[STAT_EMPLOYER_PARTNERS]]", { en: "Employer partners", ar: "شريك توظيف" }, { en: "Confirmed agreements", ar: "اتفاقيات مؤكدة" }),
];
