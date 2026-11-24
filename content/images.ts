import type { ImageRef } from "./types";

/** Page-level imagery. Every `temp: true` image is royalty-free stock and MUST be replaced before launch. */
const t = (name: string, width: number, height: number, en: string, ar: string): ImageRef => ({
  src: `/images/temp/${name}.webp`,
  width,
  height,
  alt: { en, ar },
  temp: true,
});

export const images = {
  hero: t("hero-dubai", 1800, 1350, "The Burj Khalifa and Downtown Dubai under a bright sky, framed by palm trees", "برج خليفة ووسط مدينة دبي تحت سماء صافية تحيط بها أشجار النخيل"),
  heritage: t("campus-heritage", 1800, 1179, "A university building beyond a broad lawn", "مبنى جامعي خلف مرج واسع"),
  graduation: t("graduation", 1800, 1200, "Graduates throwing their caps into the air", "خريجون يقذفون قبعاتهم في الهواء"),
  lifeSkyline: t("life-skyline", 1800, 1200, "The Dubai skyline at dusk", "أفق دبي عند الغسق"),
  lifeCoast: t("life-coast", 1800, 2700, "An aerial view of the Dubai coastline and the Burj Al Arab", "منظر جوي لساحل دبي وبرج العرب"),
  lifeStudents: t("life-students", 1800, 1200, "Friends sharing a meal at a long table", "أصدقاء يتشاركون وجبة على طاولة طويلة"),
  lifeSport: t("life-sport", 1800, 1200, "An athlete in the starting blocks on a running track", "عداء في وضع الانطلاق على مضمار الجري"),
  lifeLandmark: t("life-landmark", 1800, 2700, "The Burj Al Arab seen from the beach", "برج العرب كما يُرى من الشاطئ"),
  accommodation: t("life-accommodation", 1800, 1201, "A bright shared student bedroom", "غرفة نوم طلابية مشتركة ومضيئة"),
  careers1: t("careers-1", 1800, 1200, "Colleagues in discussion around a laptop", "زملاء يتناقشون حول حاسوب محمول"),
  careers2: t("careers-2", 1800, 1200, "Students working together at a café table", "طلاب يعملون معاً على طاولة مقهى"),
  visit: t("visit-campus", 1800, 1202, "A bright, modern interior corridor", "ممر داخلي حديث ومضيء"),
  campusStudy: t("campus-study", 1800, 1200, "A large open study hall with students at desks", "قاعة دراسة واسعة يجلس فيها الطلاب إلى المكاتب"),
} satisfies Record<string, ImageRef>;
