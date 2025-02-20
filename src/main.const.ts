type NavItem = {
  id: string;
  name: string;
  path: string;
  newTab?: boolean;
};

export const navList: NavItem[] = [
  { id: "home", name: "Accueil", path: "/", newTab: false },
  { id: "profile", name: "Profil", path: "/profile/", newTab: false },
  { id: "settings", name: "Réglages", path: "/settings", newTab: false },
  { id: "community", name: "Communauté", path: "/community", newTab: false },
];
