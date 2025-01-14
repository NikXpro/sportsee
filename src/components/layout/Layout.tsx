import { Header } from "@components/layout/Header";
import { Sidebar } from "@components/layout/Sidebar/Sidebar";

type LayoutProps = {
  pageActive: string;
  children: React.ReactNode;
};

export function Layout({ pageActive, children }: LayoutProps) {
  return (
    <>
      <Header pageActive={pageActive} />
      <Sidebar>{children}</Sidebar>
    </>
  );
}
