/**
 * @fileoverview Main layout component that wraps the application content
 * @module Layout
 */

import { Header } from "@components/layout/Header";
import { Sidebar } from "@components/layout/Sidebar";

/**
 * Props for the Layout component
 * @interface LayoutProps
 * @property {string} pageActive - Current active page identifier
 * @property {React.ReactNode} children - Child components to be rendered within the layout
 */
type LayoutProps = {
  pageActive: string;
  children: React.ReactNode;
};

/**
 * Layout component that provides the main structure of the application
 * Includes the header and sidebar navigation, wrapping the main content
 *
 * @component
 * @param {LayoutProps} props - Component props
 * @param {string} props.pageActive - Identifier of the currently active page
 * @param {React.ReactNode} props.children - Content to be rendered within the layout
 * @returns {JSX.Element} The rendered layout structure
 */
export function Layout({ pageActive, children }: LayoutProps) {
  return (
    <>
      <Header pageActive={pageActive} />
      <Sidebar>{children}</Sidebar>
    </>
  );
}
