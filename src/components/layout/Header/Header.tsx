import { navList } from "@/App.const";
import { Link } from "react-router";
import "./Header.scss";

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
