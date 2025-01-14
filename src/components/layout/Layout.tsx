import { Header } from "@components/layout/Header";

type LayoutProps = {
  pageActive: string;
  children: React.ReactNode;
};

export function Layout({ pageActive, children }: LayoutProps) {
  return (
    <>
      <Header pageActive={pageActive} />
      <main>{children}</main>
    </>
  );
}
