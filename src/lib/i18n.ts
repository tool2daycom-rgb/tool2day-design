import type { Locale } from "@/lib/prefs";

const messages = {
  en: {
    tools: "← Tools",
    tagline: "Web & App UI templates",
    getTemplates: "Get templates",
    heroTitle: "Design templates for web & apps",
    heroBody:
      "Bento-style UI kits and landing systems — browse now, buy soon. Inspired by modern product galleries; we'll refine together.",
    discover: "Discover",
    webDesign: "Web Design",
    appUi: "App UI",
    uiKits: "UI Kits",
    filterAll: "All",
    filterDark: "Dark",
    filterLight: "Light",
    free: "Free",
    empty: "No templates in this filter yet — more coming soon.",
    footer: "Tool2Day Design",
    lang: "Language",
    appearance: "Appearance",
    light: "Light",
    dark: "Dark",
    system: "System",
    english: "EN",
    arabic: "عربي",
  },
  ar: {
    tools: "→ الأدوات",
    tagline: "قوالب واجهات الويب والتطبيقات",
    getTemplates: "احصل على القوالب",
    heroTitle: "قوالب تصميم للويب والتطبيقات",
    heroBody:
      "أطقم واجهات بأسلوب Bento وأنظمة هبوط — تصفّح الآن، والشراء قريباً. مستوحى من معارض المنتجات الحديثة؛ نطوّرها معاً.",
    discover: "اكتشف",
    webDesign: "تصميم ويب",
    appUi: "واجهة تطبيق",
    uiKits: "أطقم UI",
    filterAll: "الكل",
    filterDark: "داكن",
    filterLight: "فاتح",
    free: "مجاني",
    empty: "لا قوالب في هذا الفلتر بعد — المزيد قريباً.",
    footer: "Tool2Day Design",
    lang: "اللغة",
    appearance: "الإضاءة",
    light: "نهاري",
    dark: "ليلي",
    system: "نظام",
    english: "EN",
    arabic: "عربي",
  },
} as const;

export type MessageKey = keyof (typeof messages)["en"];
export type Messages = Record<MessageKey, string>;

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
