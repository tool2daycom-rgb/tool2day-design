export type TemplateCategory = "discover" | "web" | "app" | "ui";

export type ThemeMode = "dark" | "light";

export type DesignTemplate = {
  id: string;
  title: string;
  category: TemplateCategory;
  theme: ThemeMode;
  variants?: number;
  price: number | "free";
  accent: string;
  layout: "a" | "b" | "c" | "d" | "e" | "f" | "g";
  tags: string[];
  href?: string;
};

export const templates: DesignTemplate[] = [
  {
    id: "velocity-motors",
    title: "Velocity Motors Showroom",
    category: "web",
    theme: "dark",
    variants: 1,
    price: 89,
    accent: "#e8a317",
    layout: "g",
    tags: ["Cars", "Showroom", "Landing"],
    href: "/templates/velocity",
  },
  {
    id: "nova-saas",
    title: "Nova SaaS Landing",
    category: "web",
    theme: "dark",
    variants: 4,
    price: 49,
    accent: "#7c6cff",
    layout: "a",
    tags: ["Landing", "SaaS"],
  },
  {
    id: "orbit-dashboard",
    title: "Orbit Analytics Dashboard",
    category: "web",
    theme: "dark",
    variants: 3,
    price: 69,
    accent: "#22d3ee",
    layout: "b",
    tags: ["Dashboard", "Charts"],
  },
  {
    id: "pulse-mobile",
    title: "Pulse Mobile App UI",
    category: "app",
    theme: "dark",
    variants: 6,
    price: 59,
    accent: "#f472b6",
    layout: "c",
    tags: ["iOS", "Android"],
  },
  {
    id: "atelier-portfolio",
    title: "Atelier Portfolio",
    category: "web",
    theme: "light",
    variants: 2,
    price: 39,
    accent: "#fbbf24",
    layout: "d",
    tags: ["Portfolio"],
  },
  {
    id: "ledger-fintech",
    title: "Ledger Fintech Kit",
    category: "ui",
    theme: "dark",
    variants: 5,
    price: 79,
    accent: "#34d399",
    layout: "e",
    tags: ["Fintech", "Components"],
  },
  {
    id: "spark-ai",
    title: "Spark AI Companion",
    category: "web",
    theme: "dark",
    variants: 3,
    price: 55,
    accent: "#a78bfa",
    layout: "f",
    tags: ["AI", "Product"],
  },
  {
    id: "market-storefront",
    title: "Market Storefront",
    category: "web",
    theme: "light",
    variants: 2,
    price: 45,
    accent: "#fb7185",
    layout: "a",
    tags: ["Ecommerce"],
  },
  {
    id: "relay-chat",
    title: "Relay Chat App UI",
    category: "app",
    theme: "dark",
    variants: 4,
    price: 52,
    accent: "#38bdf8",
    layout: "b",
    tags: ["Messaging"],
  },
  {
    id: "frame-onboarding",
    title: "Frame Onboarding Pack",
    category: "app",
    theme: "dark",
    variants: 8,
    price: "free",
    accent: "#f5c518",
    layout: "c",
    tags: ["Onboarding", "Free"],
  },
  {
    id: "glyph-design-system",
    title: "Glyph Design System",
    category: "ui",
    theme: "dark",
    variants: 12,
    price: 99,
    accent: "#c084fc",
    layout: "d",
    tags: ["Design System"],
  },
  {
    id: "coast-agency",
    title: "Coast Agency Site",
    category: "web",
    theme: "light",
    variants: 2,
    price: 42,
    accent: "#2dd4bf",
    layout: "e",
    tags: ["Agency"],
  },
  {
    id: "nexus-admin",
    title: "Nexus Admin Console",
    category: "ui",
    theme: "dark",
    variants: 4,
    price: 74,
    accent: "#60a5fa",
    layout: "f",
    tags: ["Admin", "CRM"],
  },
];
