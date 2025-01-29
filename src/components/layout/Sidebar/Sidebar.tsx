import "./Sidebar.scss";

type SidebarProps = {
  children: React.ReactNode;
};

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
