/**
 * @fileoverview Sidebar component with activity icons and main content wrapper
 * @module Sidebar
 */

import "./Sidebar.scss";

/**
 * Props for the Sidebar component
 * @interface SidebarProps
 * @property {React.ReactNode} children - Content to be rendered in the main area
 */
type SidebarProps = {
  children: React.ReactNode;
};

/**
 * Sidebar component that provides the vertical navigation bar with activity icons
 * and wraps the main content area
 *
 * @component
 * @param {SidebarProps} props - Component props
 * @param {React.ReactNode} props.children - Content to be rendered in the main area
 * @returns {JSX.Element} The rendered sidebar with main content
 *
 * @example
 * ```tsx
 * <Sidebar>
 *   <MainContent />
 * </Sidebar>
 * ```
 */
export function Sidebar({ children }: SidebarProps) {
  return (
    <main className="sidebar-container">
      <aside className="sidebar">
        <div className="icons">
          <img src="/icons/zen.png" alt="zen icon" />
          <img src="/icons/swim.png" alt="swim icon" />
          <img src="/icons/becycle.png" alt="bike icon" />
          <img src="/icons/muscle.png" alt="muscle icon" />
        </div>
        <small className="copyright">Copght, SportSee 2020</small>
      </aside>
      <div className="children">{children}</div>
    </main>
  );
}
