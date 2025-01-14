import { Link } from "react-router";
import "./Header.scss";

type NavItem = {
  id: string;
  name: string;
  path: string;
  newTab?: boolean;
};

const navList: NavItem[] = [
  { id: "home", name: "Accueil", path: "", newTab: false },
  { id: "profile", name: "Profil", path: "", newTab: false },
  { id: "settings", name: "Réglages", path: "", newTab: false },
  { id: "community", name: "Communauté", path: "", newTab: false },
];

export function Header({ pageActive }: { pageActive: string }) {
  return (
    <>
      <header className="header">
        <div className="logo"></div>
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
