export type NavigationItem = {
  label: string;
  href?: string;
  children?: NavigationItem[];
};

export const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Business",
    children: [
      { label: "Businesses", href: "/businesses" },
      { label: "Locations", href: "/locations" },
      { label: "Google Accounts", href: "/settings/google" },
    ],
  },
  {
    label: "Management",
    children: [
      { label: "Overview", href: "/management" },
      { label: "Profile Management", href: "/profile-management" },
      { label: "Reviews", href: "/reviews" },
      { label: "Posts", href: "/posts" },
      { label: "Products & Services", href: "/products" },
      { label: "Media", href: "/media" },
    ],
  },
  {
    label: "Local SEO",
    children: [
      { label: "Local Rankings", href: "/rankings" },
      { label: "Geo-Grid", href: "/geo-grid" },
      { label: "Keyword Research", href: "/keywords" },
      { label: "Competitors", href: "/competitors" },
    ],
  },
  {
    label: "Local Presence",
    children: [
      { label: "Directories", href: "/directories" },
      { label: "NAP / Citation Health", href: "/directories/nap" },
    ],
  },
  {
    label: "Tasks",
    href: "/tasks",
  },
  {
    label: "Reports",
    href: "/reports",
  },
  {
    label: "Settings",
    href: "/settings/organization",
  },
];