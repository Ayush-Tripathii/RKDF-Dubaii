# CONTENT-TODO — RKDF University Dubai

**Preview mode:** `DUMMY_MODE = true` in `web/content/dummy.ts`, so every token below currently shows the *dummy* value noted beside it. None of it is verified. Before launch, replace each dummy value with confirmed information, then set `DUMMY_MODE = false` — any token still unconfirmed then shows as a visible red placeholder.

**Already real** (from rkdf.ac.in, fetched 23 Nov 2026): the 16 faculties; program names, durations and entry requirements; the Chancellor (Dr. Sadhna Kapoor) and Vice-Chancellor (Prof. Vijay K. Agrawal); the 2012 launch date.

**Dummy content written directly in data files** (not tokens — review each file): program tuition (AED), intakes and summaries in `content/programs.ts`; school summaries in `content/schools.ts`; news and events in `content/news.ts`; research centres in `content/research.ts`; testimonials (fictional people, stock portraits) in `content/people.ts`; entry requirements by curriculum in `content/admissions.ts`; employer names in `src/components/home/Sections.tsx`.

Regenerate: `node scripts/content-todo.mjs` (from /web).

## Site-wide (header, footer, contact, persistent UI)

_Edit in: `web/content/site.ts`, `web/src/components/Footer.tsx`, `web/src/components/PersistentUI.tsx`, `web/src/app/[locale]/layout.tsx`, `web/src/app/api/enquiry/route.ts`_

- [ ] `[[CAMPUS_LOCATION]]` — dummy: Dubai International Academic City
- [ ] `[[CRM_ENDPOINT]]` — dummy: CRM
- [ ] `[[DATE]]` — dummy: 31 July 2027
- [ ] `[[DUBAI_ADDRESS]]` — dummy: Block 4, Dubai International Academic City, Dubai, UAE
- [ ] `[[EMAIL]]` — dummy: admissions@rkdfdubai.ac.ae
- [ ] `[[ENQUIRY_RESPONSE_DAYS]]` — dummy: 2
- [ ] `[[INTAKES]]` — dummy: September & January intakes
- [ ] `[[INTAKE_TERM]]` — dummy: September 2027
- [ ] `[[KHDA_PERMIT_STATUS]]` — dummy: Licensed
- [ ] `[[LICENCE_STATUS]]` — dummy: KHDA-licensed campus
- [ ] `[[MOHESR_CAA_STATUS]]` — dummy: Program accreditation in progress
- [ ] `[[OFFICE_HOURS]]` — dummy: Monday–Friday, 8:30am–5:30pm
- [ ] `[[PHONE]]` — dummy: 4 555 0100
- [ ] `[[REGULATOR]]` — dummy: the Knowledge and Human Development Authority (KHDA)

## Homepage copy & sections

_Edit in: `web/content/translations.ts`, `web/src/components/home/Sections.tsx`, `web/content/stats.ts`, `web/content/images.ts`_

- [ ] `[[ACCESSIBILITY_KNOWN_ISSUES]]` — dummy: We are converting older PDFs to accessible formats and expect to finish by March 2027.
- [ ] `[[ACCOM_ARRANGED_AED]]` — dummy: 3,200
- [ ] `[[ACCOM_SHARED_AED]]` — dummy: 2,400
- [ ] `[[ACCOM_STUDIO_AED]]` — dummy: 4,800
- [ ] `[[AR_COPY_REVIEW]]`
- [ ] `[[ATTESTATION_GUIDANCE]]` — dummy: Our Student Services team guides every graduate through attestation with the UAE Ministry of Higher Education and Scientific Research.
- [ ] `[[AVG_CLASS_SIZE]]` — dummy: 28
- [ ] `[[CAA_REFERENCE]]` — dummy: Initial accreditation application submitted in 2026
- [ ] `[[CAMPUS_TRANSPORT_DETAIL]]` — dummy: A free university shuttle runs from the nearest metro station every 20 minutes.
- [ ] `[[CAREERS_ADVICE_DETAIL]]` — dummy: Every student is matched with a careers adviser in their first semester.
- [ ] `[[CHANCELLOR_PORTRAIT]]` — dummy: Dr. Sadhna Kapoor
- [ ] `[[COST_COMPARISON_EVIDENCE]]` — dummy: Instalment plans spread fees across the academic year.
- [ ] `[[DUBAI_CAMPUS_ADDRESS]]` — dummy: Block 4, Dubai International Academic City, Dubai, UAE
- [ ] `[[DUBAI_CAMPUS_MAP_EMBED]]`
- [ ] `[[EMPLOYER_EVENTS_DETAIL]]` — dummy: Two careers fairs run each year, in October and March.
- [ ] `[[FACULTY_PHD_PERCENT]]` — dummy: 72
- [ ] `[[HOME_CAMPUS_ACCREDITATION]]` — dummy: NAAC A+ accreditation
- [ ] `[[HOME_CAMPUS_ACCREDITATION_REF]]` — dummy: National Assessment and Accreditation Council, India · UGC recognised
- [ ] `[[HOME_CAMPUS_ESTABLISHING_ACT]]` — dummy: an Act of the Madhya Pradesh Legislature
- [ ] `[[INTERNSHIP_POLICY]]` — dummy: Placements last eight to twelve weeks in the summer of the penultimate year.
- [ ] `[[INTERNSHIP_PROGRAM_COUNT]]` — dummy: 24
- [ ] `[[KHDA_PERMIT_NO]]` — dummy: HE-2026-0418
- [ ] `[[MOBILITY_POLICY]]` — dummy: Students can spend a semester in Bhopal from their second year.
- [ ] `[[MONTHLY_LIVING_COST_AED]]` — dummy: 2,500
- [ ] `[[MONTHS]]` — dummy: 6
- [ ] `[[OFFER_TURNAROUND_DAYS]]` — dummy: 10
- [ ] `[[REGULATOR_VERIFY_URL]]` — dummy: https://www.khda.gov.ae/
- [ ] `[[SAFETY_SOURCE]]` — dummy: (Numbeo Safety Index)
- [ ] `[[SOCIAL_LINKS]]` — dummy: Instagram · LinkedIn · YouTube · X
- [ ] `[[STAT_ACTIVE_PROJECTS]]` — dummy: 18
- [ ] `[[STAT_CLUBS]]` — dummy: 24
- [ ] `[[STAT_EMPLOYER_PARTNERS]]` — dummy: 45
- [ ] `[[STAT_FACULTY]]` — dummy: 64
- [ ] `[[STAT_GRAD_OUTCOMES]]` — dummy: 92
- [ ] `[[STAT_HOUSING_OPTIONS]]` — dummy: 3
- [ ] `[[STAT_INDUSTRY_PARTNERS]]` — dummy: 26
- [ ] `[[STAT_INTERNSHIPS]]` — dummy: 310
- [ ] `[[STAT_PROGRAMS]]`
- [ ] `[[STAT_RESEARCH_CENTRES]]`
- [ ] `[[STAT_RESEARCH_FUNDING_AED]]` — dummy: 4
- [ ] `[[STAT_SPORTS]]` — dummy: 12
- [ ] `[[STAT_STUDENTS]]` — dummy: 850
- [ ] `[[STAT_STUDENTS_AS_OF]]` — dummy: September 2027
- [ ] `[[STUDENT_NATIONALITIES]]` — dummy: 38
- [ ] `[[TOUR_SCHEDULE]]` — dummy: Monday to Thursday at 10am and 2pm, and last about an hour
- [ ] `[[TUITION_UG_FROM_AED]]` — dummy: 24,000
- [ ] `[[VIRTUAL_TOUR_URL]]` — dummy: available from January 2027
- [ ] `[[VISA_OUTCOME_EVIDENCE]]` — dummy: The university sponsors the student residence visa for every enrolled international student.
- [ ] `[[YEAR]]` — dummy: 2026
- [ ] `[[YEAR_BHOPAL_ESTABLISHED]]` — dummy: 2012
- [ ] `[[YEAR_DUBAI_LICENSED]]` — dummy: 2026
- [ ] `[[YEAR_FIRST_INTAKE]]` — dummy: 2027
- [ ] `[[YEAR_HOME_ACCREDITATION]]` — dummy: 2024

## People: Chancellor & testimonials (portraits are slots, never stock)

_Edit in: `web/content/people.ts`_

- [ ] `[[CHANCELLOR_NAME]]` — dummy: Dr. Sadhna Kapoor
- [ ] `[[CHANCELLOR_QUOTE]]` — dummy: Education is the prerequisite for socio-economic development of the Nation in general and people in particular.

## Admissions: entry requirements & FAQs

_Edit in: `web/content/admissions.ts`_

- [ ] `[[FAQ_INSTALMENTS_ANSWER]]` — dummy: Yes. Tuition can be paid in two semester instalments or in four quarterly payments.
- [ ] `[[FAQ_INSTALMENTS_ANSWER_AR]]` — dummy: نعم، يمكن دفع الرسوم على قسطين فصليين أو أربع دفعات ربع سنوية.
- [ ] `[[FAQ_INTAKE_ANSWER]]` — dummy: The first intake begins in September 2027, with a second intake in January 2028.
- [ ] `[[FAQ_INTAKE_ANSWER_AR]]` — dummy: تبدأ الدفعة الأولى في سبتمبر 2027، تليها دفعة ثانية في يناير 2028.
- [ ] `[[FAQ_RECOGNITION_ANSWER]]` — dummy: The Dubai campus is licensed by KHDA. Degrees are attested through the UAE Ministry of Higher Education for employment and further study.
- [ ] `[[FAQ_RECOGNITION_ANSWER_AR]]` — dummy: حرم دبي مرخّص من هيئة المعرفة، وتُصدَّق الشهادات عبر وزارة التعليم العالي لأغراض العمل ومتابعة الدراسة.
- [ ] `[[FAQ_VISA_ANSWER]]` — dummy: Yes. The university sponsors a student residence visa for full-time international students.
- [ ] `[[FAQ_VISA_ANSWER_AR]]` — dummy: نعم، تكفل الجامعة تأشيرة إقامة الطالب للطلاب الدوليين المتفرغين.

## Inner pages (route registry — /about, /admissions/*, /student-life/* …)

_Edit in: `web/content/routes.ts`, `web/src/app/[locale]/[...slug]/page.tsx`_

- [ ] `[[ABOUT_HISTORY_COPY]]` — dummy: RKDF University was launched in Bhopal on 14 February 2012, sponsored by the Ayushmati Education and Social Society. The Dubai campus is its first international campus.
- [ ] `[[ABOUT_MISSION_STATEMENT]]` — dummy: To offer an Indian university education of recognised quality to students across the Gulf, in a setting connected to the region’s economy.
- [ ] `[[ABOUT_VALUES]]` — dummy: Rigour, access, integrity and service to the community.
- [ ] `[[ACCESSIBILITY_EMAIL]]` — dummy: accessibility@rkdfdubai.ac.ae
- [ ] `[[ACCESSIBILITY_RESPONSE_DAYS]]` — dummy: 5
- [ ] `[[ACCESSIBILITY_REVIEW_DATE]]` — dummy: 23 November 2026
- [ ] `[[ACCOM_PARTNERS]]` — dummy: Partner residences within 10 minutes of campus, with shared and studio rooms.
- [ ] `[[AGENT_AGREEMENT_PROCESS]]` — dummy: Agents are appointed after a due-diligence review and sign a code of practice.
- [ ] `[[AGENT_PORTAL_URL]]` — dummy: Agent portal opens January 2027.
- [ ] `[[APPLICATION_FEE_AED]]` — dummy: AED 500, non-refundable
- [ ] `[[APPLICATION_FORM_PDF]]` — dummy: Application form (PDF, 2027 intake)
- [ ] `[[APPLICATION_PORTAL_URL]]` — dummy: The online application portal opens on 1 February 2027.
- [ ] `[[APPROVED_AGENT_LIST]]` — dummy: The list of approved agents is published here and updated monthly.
- [ ] `[[ARRIVAL_GUIDE]]` — dummy: Airport pickup, orientation week and a buddy from the student union for every new international student.
- [ ] `[[ATTESTATION_STEPS]]` — dummy: School certificates must be attested in the country of issue and by the UAE embassy there before enrolment.
- [ ] `[[BOARD_MEMBERS]]` — dummy: The Board of Management oversees both campuses and meets quarterly.
- [ ] `[[CAMPUS_FACILITIES]]` — dummy: Teaching labs, a 300-seat auditorium, library and learning commons, prayer rooms and a student café.
- [ ] `[[CAMPUS_PHOTOGRAPHY]]` — dummy: Campus photography will be published when the building opens.
- [ ] `[[CAREERS_SERVICE_DETAIL]]` — dummy: One-to-one advice, CV clinics, mock interviews and an employer network across the UAE.
- [ ] `[[CHANCELLOR_MESSAGE]]` — dummy: Education is the prerequisite for socio-economic development of the Nation in general and people in particular. Our Dubai campus extends that conviction to students across the Gulf.
- [ ] `[[CLUBS_LIST]]` — dummy: Debating, robotics, film, cricket, football, Model UN, photography and community service, among others.
- [ ] `[[COUNSELLING_SERVICE]]` — dummy: Free, confidential counselling with qualified counsellors, in English, Arabic and Hindi.
- [ ] `[[DATA_PROTECTION_OFFICER_CONTACT]]` — dummy: privacy@rkdfdubai.ac.ae
- [ ] `[[DEPARTMENT_DIRECTORY]]` — dummy: Admissions · Student Services · Finance · Careers · Registry
- [ ] `[[DISABILITY_SUPPORT]]` — dummy: Individual learning plans, exam adjustments and an accessible campus.
- [ ] `[[DOCUMENT_CHECKLIST]]` — dummy: Passport copy, photo, school transcripts, English test result, and Emirates ID (UAE residents).
- [ ] `[[EMERGENCY_CONTACTS]]` — dummy: Campus security 24/7 · Police 999 · Ambulance 998
- [ ] `[[EMPLOYER_PARTNERS]]` — dummy: Partner employers will be listed here as agreements are signed.
- [ ] `[[EXCHANGE_PARTNERS]]` — dummy: Exchange agreements with partner universities are being developed.
- [ ] `[[GOVERNANCE_STRUCTURE]]` — dummy: Governing Body, Board of Management, Academic Council and Boards of Studies, as at the Bhopal campus.
- [ ] `[[LEADERSHIP_TEAM]]` — dummy: Chancellor: Dr. Sadhna Kapoor · Vice-Chancellor: Prof. Vijay K. Agrawal · Campus Director, Dubai: to be announced
- [ ] `[[PAYMENT_PLANS]]` — dummy: Pay annually, per semester, or in four quarterly instalments.
- [ ] `[[POLICY_DOCUMENTS]]` — dummy: Academic regulations, admissions policy, refund policy, code of conduct.
- [ ] `[[PRIVACY_NOTICE_TEXT]]` — dummy: We collect only the personal data needed to process your enquiry or application, and never sell it.
- [ ] `[[PROSPECTUS_PDF]]` — dummy: Prospectus 2027–28 (PDF)
- [ ] `[[REFUND_POLICY]]` — dummy: Full refund less a AED 1,000 administration fee before the start of term.
- [ ] `[[RESEARCH_ETHICS_POLICY]]` — dummy: All research involving people is reviewed by the university’s research ethics committee.
- [ ] `[[RESEARCH_STRATEGY]]` — dummy: Applied research in sustainable technology, health and digital economy, aligned with UAE national priorities.
- [ ] `[[SCHOLARSHIP_ALUMNI]]` — dummy: Alumni: 15% for RKDF graduates progressing to postgraduate study.
- [ ] `[[SCHOLARSHIP_EARLY_BIRD]]` — dummy: Early bird: 10% for deposits paid before 31 March 2027.
- [ ] `[[SCHOLARSHIP_MERIT]]` — dummy: Merit: up to 50% for applicants scoring 90% or above.
- [ ] `[[SCHOLARSHIP_NEED]]` — dummy: Need-based: up to 30%, assessed on family income.
- [ ] `[[SCHOLARSHIP_SIBLING]]` — dummy: Sibling: 10% for each additional enrolled sibling.
- [ ] `[[SPORTS_FACILITIES]]` — dummy: Shared access to Academic City’s sports hall, pool and pitches.
- [ ] `[[TERMS_TEXT]]` — dummy: By using this website you agree to these terms of use.
- [ ] `[[TRANSFER_PATHWAYS]]` — dummy: Students may transfer between Dubai and Bhopal at the end of any academic year, subject to program availability.
- [ ] `[[TUITION_TABLE_AED]]` — dummy: Annual tuition ranges from AED 18,000 (diploma) to AED 62,000 (MBA). See each program page for its fee.
- [ ] `[[VAT_NOTE]]` — dummy: Tuition for qualifying programs is zero-rated for VAT in the UAE.
- [ ] `[[VC_NAME]]` — dummy: Prof. Vijay K. Agrawal, Vice-Chancellor
- [ ] `[[VISA_FEES_AED]]` — dummy: AED 3,500 per year, including medical screening and Emirates ID.
- [ ] `[[VISA_PROCESS]]` — dummy: Accept your offer and pay the deposit; we apply for your entry permit, then your residence visa and Emirates ID after arrival.
- [ ] `[[WHATSAPP_NUMBER]]` — dummy: +971 50 555 0100

## Hero headline options

Set the live one with `site.heroHeadline` (0–2) in `web/content/site.ts`. Currently **1**.

0. Bhopal’s rigour, Dubai’s ambition — one university between them.
1. A university of two cities, built for the work of this one.
2. An Indian academic tradition, now teaching at the crossroads of the Gulf.

## Brand & assets (not tokens, but required before launch)

- [ ] **Dubai logo lockup.** The supplied crest reads "NAAC A+" and "BHOPAL". NAAC is an Indian accreditation of the Bhopal campus; showing it on the Dubai site may imply the Dubai campus holds it. Confirm with compliance, or supply a Dubai lockup. File: `web/public/brand/rkdf-crest.png`.
- [ ] Vector (SVG) crest. The supplied PNG is 164×243 px.
- [ ] Replace all temporary stock photography in `web/public/images/temp/` (every image with `temp: true` in /content).
- [ ] Hero video (≤2 MB, MP4/WebM) + poster frame, if wanted. A still is used now.
- [ ] Chancellor portrait, testimonial portraits (slots).
- [ ] Employer logos (12 marquee slots) — only for confirmed partners.
- [ ] Map embed URL (`site.mapEmbedUrl`), virtual tour URL (`site.virtualTourUrl`), prospectus PDF (`site.prospectus.href`), regulator verification URL (`site.regulator.verifyUrl`).
- [ ] Phone (E.164), WhatsApp number, email, social profile URLs in `web/content/site.ts`.
- [ ] Production domain: set `NEXT_PUBLIC_SITE_URL` (canonical, hreflang, sitemap, OG).
- [ ] CRM endpoint for enquiry / tour / RSVP forms (`web/src/app/api/enquiry/route.ts`). Submissions are validated but **not stored** yet.
- [ ] Native-speaker review of all Arabic copy in `web/content/translations.ts`.
- [ ] Legal text for /privacy and /terms.
