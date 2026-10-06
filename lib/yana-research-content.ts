/**
 * YANA research screens (Discover chapter, reference PDF part 2, pages
 * 1–8), reproduced verbatim from the PDF. One source typo is corrected
 * on purpose: "Openess to Help" → "Openness to Help". Nothing else is
 * reworded, and every number below is exactly as the PDF shows it.
 */

export type YanaBracketBlock = { title: string; lines: string[] };

export const yanaAwareness = {
  challengesLabel: "Challenges :-",
  challenges: [
    "Despite these efforts, there is a significant treatment gap, with many individuals lacking access to necessary mental health care.",
    "Stigma and financial barriers continue to prevent timely treatment for many.",
  ],
  question: "How Has Mental Health Awareness and Support Evolved in India?",
  timeline: [
    { title: "Historical Challenges", lines: ["- High stigma", "- Lack of awareness"] },
    {
      title: "Turning Point: Deepika Padukone’s",
      lines: ["Public Disclosure (2015)", "- Sparked national conversations"],
    },
    {
      title: "COVID-19 Exposed the Crisis",
      lines: ["- Increased mental health issues", "- Lack of accessible & affordable mental health services"],
    },
    {
      title: "Need for Holistic Support",
      lines: ["- Policy reforms", "- Awareness campaigns", "- Community-driven interventions"],
    },
    {
      title: "Future Priority: Stigma-Free & Accessible Mental Healthcare",
      lines: ["- Affordable therapy", "- Digital & community-based support", "- Policy-backed reforms"],
    },
  ] satisfies YanaBracketBlock[],
} as const;

export const yanaData = {
  heading: "Mental Health Data",
  stigmaChart: {
    title: "Mental Health Stigma in India",
    bars: [
      { label: "2015–2016", value: 80 },
      { label: "2024", value: 67 },
    ],
  },
  covidImage: {
    src: "/images/yana/research-covid-impact.jpg",
    alt: "Infographic from The Lancet (Santomauro et al., 2021): “The COVID-19 pandemic has had a large and uneven impact on global mental health.” Cases of major depressive disorder rose from 193m baseline by 53.2m additional cases, and anxiety disorders from 298m by 76.2m; younger people were hardest hit, and increases were higher among females (35.5m and 51.8m) than males (17.7m and 24.4m).",
  },
  impactHeading: "Economic and Social Impact",
  impact: [
    "The economic loss due to mental health conditions in India between 2012 and 2030 is projected to be USD 1.03 trillion.",
    "The age-adjusted suicide rate is 21.1 per 100,000 population, highlighting the severity of untreated mental health issues.",
  ],
  audienceLabel: "Target Audience",
  audienceRange: "18-29",
  attributes: ["High Mental Health Risk", "Openness to Help", "Student Crisis", "Digital First"],
} as const;

export const yanaSupport = {
  heading: "Can Mental Health Conditions Be Addressed Without Support?",
  whoLabel: "WHO",
  whoSuffix: "said :-",
  whoQuote: "“Neglecting professional support can lead to worsening symptoms and reduced quality of life ! ”",
  reasonLabel: "Reason",
  reasonIntro: "India faces a major mental health workforce gap:",
  reasons: [
    "Only 0.75 psychiatrists per 100,000 people",
    "Even fewer clinical psychologists and counselors",
    "Group therapy requires skilled facilitators, who are often unavailable or overburdened",
  ],
  reasonConclusion: "Hence , Shortage of Trained Professionals",
  factsLabel: "FACTS",
  facts: [
    "\"Unless one realises that he or she is unwell or sick, how would they seek treatment? Often there is a huge gap between the time when symptoms are identified and treatment is initiated, thus aggravating the complexities,\" he said.",
    "\"The treatment cost is quite high in the private sector while at government setups there is a lot of rush and people do not want to go through that inconvenience,\" said Asthana who was the chief coordinator of the mental health festival organised recently by Mental Health Foundation (India) along with AIIMS-Delhi and Deepak Chopra Foundation, USA.",
  ],
  survey:
    "The survey of 2,800 student-respondents drawn from 30 colleges was carried out by Mpower, a mental healthcare initiative of a trust. It highlights the severe lack of mental health support system in educational institutions.",
  chart: [
    { label: "Seek Professional Help", value: 15 },
    { label: "Confided in Friends", value: 58 },
    { label: "Counsellors", value: 25 },
    { label: "Miscellaneous", value: 2 },
  ],
  chartNote:
    "The Following data percentage is calculated individually on scale of 100 and made in one pie chart for reference",
} as const;

export const yanaGroupTherapy = {
  heading: "Group Therapy in India",
  models: [
    { term: "Community-based models", detail: "(peer-led emotional support)" },
    { term: "Integrated health program", detail: "(like WHO’s mhGAP)" },
    { term: "NGO & Urban initiatives", detail: "(youth-focused support groups)" },
  ],
  challengesHeading: "But major challenges persist:",
  challenges: [
    "Urban-centric access, with rural areas left behind",
    "Cultural stigma limiting openness and participation",
    "Shortage of trained facilitators",
    "Lack of standardization across services",
    "Poor public infrastructure for safe, effective sessions",
  ],
} as const;

/** `true` = has it, `false` = doesn't, `"limited"` = has it, marked "(Limited)" in the source. */
export type YanaFeatureSupport = boolean | "limited";

export const yanaComparison = {
  cornerLabel: "Features/ Platforms",
  platforms: ["Wysa", "MindPeers", "InnerHour/Amaha", "The Alternative Story", "Your DOST"],
  rows: [
    { feature: "Self-help tools (CBT, journaling)", support: [true, true, true, true, true] },
    { feature: "AI chatbot for mental support", support: [true, false, false, false, false] },
    { feature: "Access to therapists (1:1)", support: [true, true, true, true, true] },
    { feature: "Mood tracking", support: [true, true, true, false, false] },
    { feature: "Progress & habit tracking", support: [true, true, true, false, true] },
    { feature: "Group therapy sessions", support: [false, false, false, "limited", false] },
    { feature: "Community support forums", support: [false, true, false, true, true] },
    { feature: "Open journaling (social sharing)", support: [false, false, false, false, false] },
    { feature: "Voice journaling", support: [false, false, false, false, false] },
    { feature: "Safe space for self-expression", support: [true, true, true, true, true] },
    { feature: "Culturally relevant content", support: [true, true, true, true, true] },
  ] satisfies { feature: string; support: YanaFeatureSupport[] }[],
} as const;

export const yanaInsights = {
  heading: "Key Insights from Secondary Research:-",
  items: [
    {
      title: "High Vulnerability",
      points: [
        "Young adults (18–29) experience the highest rates of anxiety, depression, and mental distress.",
        "The COVID-19 pandemic worsened mental health for this group.",
      ],
    },
    {
      title: "Mental Health Literacy Gaps",
      points: [
        "Most students can't recognize warning signs (e.g., 69% miss suicide signs).",
        "94% haven’t accessed mental health first-aid resources.",
      ],
    },
    {
      title: "Stigma and Low Awareness",
      points: [
        "Over 80% of Indians with mental health issues don't seek help due to stigma, lack of awareness, and misidentification of symptoms.",
        "Only 15% of students seek professional help, preferring friends over counsellors.",
      ],
    },
    {
      title: "Access Barriers",
      points: [
        "Private care is costly; public services are overcrowded.",
        "Government programs exist but are underused due to poor awareness or complexity.",
      ],
    },
    {
      title: "Consequences of Inaction",
      points: [
        "Delayed help leads to worsening symptoms, poor academics, social problems, and rising suicide rates (1.3 lakh in 2016 to 1.64 lakh in 2021).",
      ],
    },
  ],
} as const;

export const yanaSurvey = {
  heading: "Survey Insights",
  subheading: "A Google Survey Form was conducted counting 50 responses",
  questionsLabel: "Questions Asked",
  questions: [
    "Which age group do you belong to?",
    "How would you rate your overall mental well-being in the past month?",
    "How often do you experience feelings of stress or anxiety?",
    "Have you experienced feelings of distress, sadness, or anxiety without a clear or identifiable reason?",
    "If yes, what did you do to try and understand these feelings?",
    "What are the biggest challenges you face when seeking mental health support?",
    "Do you feel comfortable discussing your mental health with others?",
    "What type of mental health support would you prefer?",
    "How much do you feel that social pressures affect your mental state?",
    "Is there a missing element in mental well-being support that you feel is needed in society—something you have personally thought but found unavailable?",
  ],
  /** Donut slices are drawn in proportion to `value` (49 : 38 : 29), exactly as the source chart is. */
  concerns: [
    { label: "Anxiety", percent: "49.1%", value: 49 },
    { label: "Career Stress", percent: "38.2%", value: 38 },
    { label: "Relationships", percent: "29.1%", value: 29 },
  ],
  concernsNote: "*The data percentage is calculated individually on scale of 100 and made in one pie chart for reference*",
  attitudes: [
    { label: "Awareness Gap", value: 50.9 },
    { label: "Willingness to Join Therapy", value: 58.3 },
    { label: "Relatability Matters - Join if peers their age also attend.", value: 32.7 },
    { label: "Online + Anonymous", value: 29.1 },
    { label: "Some Prefer 1-on-1", value: 18.2 },
    { label: "Trust Issues - wouldn’t attend at all — stigma and fear persist.", value: 23.6 },
  ],
} as const;

export const yanaPersonaData = {
  heading: "User Persona Data",
  intro:
    "From the following 2 questions recording 50 responses each personas are created in order to understand users more effectively",
  charts: [
    {
      src: "/images/yana/persona-understand-feelings.jpg",
      width: 940,
      height: 447,
      alt: "Google Forms bar chart — “If yes, what did you do to try and understand these feelings?”, 45 responses. Three answers were given by 3 respondents each (6.7%); every other answer was given by 1 respondent (2.2%). Visible answer labels include “Being aware”, “Don't know”, “Go outside from hom…”, “I mostly know the re…”, “I understand my feeli…”, “NA”, “Not sure”, “Sleep” and “Why is it mar…”.",
    },
    {
      src: "/images/yana/persona-missing-element.jpg",
      width: 940,
      height: 478,
      alt: "Google Forms bar chart — “Is there a missing element in mental well-being support that you feel is needed in society—something you have personally thought but found unavailable?”, 30 responses. Two answers were given by 3 respondents each (10%); every other answer was given by 1 respondent (3.3%). Visible answer labels include “.”, “I don't have much exper…”, “I generally remain distre…”, “Issues even the minor o…”, “More focus on group se…”, “No”, “Open conversation with…”, “Support service availabi…” and “kindness an…”.",
    },
  ],
} as const;
