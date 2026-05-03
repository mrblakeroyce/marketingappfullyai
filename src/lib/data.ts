import {
  BarChart3,
  CalendarClock,
  Car,
  CheckCircle2,
  ChefHat,
  Clock3,
  Facebook,
  Instagram,
  MessageSquareText,
  Scissors,
  Settings2,
  Sparkles,
  Store,
  Wand2,
  Zap,
} from "lucide-react";

export const productName = "LocalSpark AI";

export const promptExamples = [
  "5:00 happy hour",
  "Free oil change Saturday",
  "Now hiring barbers",
  "Accepting fleet accounts",
  "Lunch special under $12",
  "Book your weekend appointment",
];

export const examplePrompts = promptExamples;

export const industryModes = [
  {
    id: "auto",
    label: "Auto Shop",
    icon: Car,
    description: "Repairs, oil changes, tires, fleet accounts, inspections.",
    color: "from-sky-500 to-blue-600",
  },
  {
    id: "restaurant",
    label: "Restaurant",
    icon: ChefHat,
    description: "Specials, happy hours, events, catering, seasonal menus.",
    color: "from-orange-500 to-rose-500",
  },
  {
    id: "barbershop",
    label: "Barbershop",
    icon: Scissors,
    description: "Appointments, walk-ins, fades, beard trims, hiring.",
    color: "from-violet-500 to-fuchsia-600",
  },
  {
    id: "general",
    label: "Local Business",
    icon: Store,
    description: "Services, promos, reviews, hiring, announcements.",
    color: "from-emerald-500 to-teal-600",
  },
];

export const industries = industryModes;

export const brandVoiceOptions = [
  "Friendly expert",
  "Premium and polished",
  "Direct and promotional",
  "Warm neighborhood voice",
  "Bold and energetic",
];

export const demoBusinessProfile = {
  business_name: "River City Auto",
  businessName: "River City Auto",
  industry: "auto",
  cities: ["Austin", "Round Rock"],
  services: ["oil changes", "brake repair", "fleet maintenance"],
  brand_colors: ["#0f172a", "#f59e0b", "#22c55e"],
  colors: ["#0f172a", "#f59e0b", "#22c55e"],
  brand_voice: "Friendly, clear, local, professional",
  brandVoice: "Friendly, clear, local, professional",
  phone: "(512) 555-0198",
  email: "hello@rivercityauto.example",
  website: "https://rivercityauto.example",
};

export const sampleBusinessProfile = demoBusinessProfile;

export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    price: "$49",
    description: "For owners who want consistent weekly content.",
    limit: "40 AI posts / month",
    features: [
      "Caption, hashtag, and image generation",
      "Brand profile and saved templates",
      "Instagram/Facebook/TikTok bios",
      "Mock posting and draft exports",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$99",
    description: "For busy teams that want scheduling and more volume.",
    limit: "120 AI posts / month",
    featured: true,
    features: [
      "Everything in Starter",
      "Calendar scheduling",
      "Platform-specific variants",
      "Social account connections",
      "Priority generation queue",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$149",
    description: "For multi-location businesses and auto content mode.",
    limit: "250 AI posts / month fair use",
    features: [
      "Everything in Growth",
      "Weekly auto content mode",
      "Higher image generation limits",
      "Advanced brand consistency",
      "Multi-location content planning",
    ],
  },
];

export const plans = [
  { name: "Starter", price: "$49/mo", posts: "40 posts monthly" },
  { name: "Growth", price: "$99/mo", posts: "120 posts + scheduling" },
  { name: "Pro", price: "$149/mo", posts: "250 posts + weekly auto mode" },
];

export const platformOptions = [
  {
    id: "instagram",
    name: "Instagram",
    label: "Instagram",
    icon: Instagram,
    description: "Feed posts, Reels captions, profile bios.",
    color: "from-pink-500 to-orange-400",
  },
  {
    id: "facebook",
    name: "Facebook",
    label: "Facebook",
    icon: Facebook,
    description: "Page posts, local announcements, offers.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "tiktok",
    name: "TikTok",
    label: "TikTok",
    icon: Sparkles,
    description: "Short-form ideas, captions, upload workflow.",
    color: "from-slate-900 to-slate-700",
  },
];

export const navItems = [
  { href: "/dashboard", label: "Home", icon: Sparkles },
  { href: "/create", label: "Create", icon: Wand2 },
  { href: "/calendar", label: "Calendar", icon: CalendarClock },
  { href: "/brand", label: "Brand", icon: Settings2 },
];

export const dashboardStats = [
  { label: "Posts this month", value: "18", icon: BarChart3, trend: "+42%" },
  { label: "Scheduled", value: "7", icon: Clock3, trend: "Next: Tue" },
  { label: "Accounts ready", value: "3", icon: CheckCircle2, trend: "Mock mode" },
];

export const recentPosts = [
  {
    title: "Fleet account announcement",
    platform: "Facebook + Instagram",
    status: "Scheduled",
    date: "Tue 9:00 AM",
    caption: "Keep every vehicle in your fleet road-ready...",
  },
  {
    title: "Saturday oil change special",
    platform: "Instagram",
    status: "Posted",
    date: "Yesterday",
    caption: "Saturday plans? Add an oil change to the list...",
  },
  {
    title: "Now hiring techs",
    platform: "TikTok",
    status: "Draft",
    date: "Needs approval",
    caption: "We’re growing and looking for skilled techs...",
  },
];

export const mockPosts = recentPosts.map((post, index) => ({
  id: String(index + 1),
  title: post.title,
  status: post.status,
  date: post.date,
  image: ["🚗", "🛠️", "📣"][index] ?? "✨",
}));

export const scheduledPosts = [
  {
    id: "sched-1",
    title: "Happy hour reminder",
    platform: "Instagram + Facebook",
    status: "scheduled" as const,
    date: "Today",
    time: "5:00 PM",
  },
  {
    id: "sched-2",
    title: "Fleet account CTA",
    platform: "Facebook",
    status: "draft" as const,
    date: "Tomorrow",
    time: "9:00 AM",
  },
  {
    id: "sched-3",
    title: "Oil change weekend special",
    platform: "Instagram",
    status: "posted" as const,
    date: "Yesterday",
    time: "11:30 AM",
  },
];

export const connectedAccounts = [
  {
    provider: "Instagram",
    handle: "@rivercityauto",
    status: "Ready",
    icon: Instagram,
    accent: "bg-pink-500",
  },
  {
    provider: "Facebook",
    handle: "River City Auto",
    status: "Ready",
    icon: Facebook,
    accent: "bg-blue-600",
  },
  {
    provider: "TikTok",
    handle: "Connect when approved",
    status: "Mock",
    icon: TikTok,
    accent: "bg-zinc-950",
  },
];

export const bioSuggestions = {
  instagram:
    "Local auto care made simple. Oil changes, brakes, tires & fleet service in Austin. Message us to book today. 🚗",
  facebook:
    "River City Auto helps Austin drivers stay safe with honest repairs, fast oil changes, tire service, and fleet maintenance.",
  tiktok:
    "Austin auto shop sharing quick car tips, behind-the-scenes repairs, and weekly service specials.",
};

export const brandBioIdeas = [
  { platform: "Instagram", bio: bioSuggestions.instagram },
  { platform: "Facebook", bio: bioSuggestions.facebook },
  { platform: "TikTok", bio: bioSuggestions.tiktok },
];

export const weeklyIdeas = [
  "Monday: maintenance tip",
  "Tuesday: customer review",
  "Wednesday: midweek offer",
  "Thursday: behind the scenes",
  "Friday: weekend booking push",
];

export const featureCards = [
  {
    icon: MessageSquareText,
    title: "Type one simple sentence",
    body: "No marketing degree needed. Write “5:00 happy hour” or “Now hiring” and let the AI build the campaign.",
  },
  {
    icon: Sparkles,
    title: "AI creates the whole post",
    body: "Professional image concept, caption, hashtags, platform variants, and call-to-action in seconds.",
  },
  {
    icon: Zap,
    title: "Approve, schedule, or autopost",
    body: "Connect official social accounts and let your AI employee keep the calendar full.",
  },
];
