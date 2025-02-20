import { navList } from "@/main.const";
import { Link } from "react-router-dom";
import "./Header.scss";

export function Header({ pageActive }: { pageActive: string }) {
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
