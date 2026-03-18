import type { ReactNode } from "react";
import MainHeader from "../headers/MainHeader";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="border-b border-zinc-800 sticky top-0 z-50 bg-black">
        <MainHeader />
      </header>
      <main className="max-w-6xl flex flex-col justify-center mx-auto">
        {children}
      </main>
    </>
  );
};

export default Layout;
