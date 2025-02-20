/**
 * @fileoverview Main application constants and navigation configuration
 * @module MainConstants
 */

/**
 * Navigation item structure
 * @interface NavItem
 * @property {string} id - Unique identifier for the navigation item
 * @property {string} name - Display name of the navigation item
 * @property {string} path - URL path for the navigation item
 * @property {boolean} [newTab] - Whether to open the link in a new tab
 */
type NavItem = {
  id: string;
  name: string;
  path: string;
  newTab?: boolean;
};

/**
 * List of navigation items for the main application menu
 * Defines the structure of the main navigation
 *
 * @constant
 * @type {NavItem[]}
 *
 * @example
 * ```tsx
 * // Using in a navigation component
 * {navList.map(item => (
 *   <Link key={item.id} to={item.path}>
 *     {item.name}
 *   </Link>
 * ))}
 * ```
 */
export const navList: NavItem[] = [
  { id: "home", name: "Accueil", path: "/", newTab: false },
  { id: "profile", name: "Profil", path: "/profile/", newTab: false },
  { id: "settings", name: "Réglages", path: "/settings", newTab: false },
  { id: "community", name: "Communauté", path: "/community", newTab: false },
];
