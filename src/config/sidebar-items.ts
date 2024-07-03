export type TSidebarItemProps = {
  path: string;
  label: string;
};

export const SIDEBAR_ITEMS: TSidebarItemProps[] = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/admin/user-management", label: "user management" },
  // { path: "/dashboard/profile", label: "Profile" },
  // { path: "/dashboard/settings", label: "Settings" },
  { path: "/dashboard/nurseries", label: "Nurseries" },
  { path: "/dashboard/parents", label: "Parents" },
];
