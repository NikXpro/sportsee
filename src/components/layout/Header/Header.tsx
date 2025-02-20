/**
 * @fileoverview Header component containing the logo and main navigation
 * @module Header
 */

import { navList } from "@/main.const";
import { Link } from "react-router-dom";
import "./Header.scss";

/**
 * Props for the Header component
 * @interface HeaderProps
 * @property {string} pageActive - Identifier of the currently active page
 */
type HeaderProps = {
  pageActive: string;
};

/**
 * Header component that displays the application logo and main navigation
 * Highlights the currently active navigation item
 *
 * @component
 * @param {HeaderProps} props - Component props
 * @param {string} props.pageActive - Identifier of the currently active page
 * @returns {JSX.Element} The rendered header with navigation
 *
 * @example
 * ```tsx
 * <Header pageActive="home" />
 * ```
 */
export function Header({ pageActive }: HeaderProps) {
  return (
    <>
      <header className="header">
        <img className="logo" src="/logo.png" alt="logo" />
        <nav className="nav">
          {navList.map((navitem) => (
            <Link
              to={navitem.path}
              key={navitem.id}
              className={`nav-item ${
                pageActive === navitem.id ? "active" : ""
              }`}
            >
              {navitem.name}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
