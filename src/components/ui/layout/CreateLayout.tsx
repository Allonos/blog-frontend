import type { ReactNode } from "react";
import MainHeader from "../headers/MainHeader";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="border-b border-zinc-800 sticky top-0 z-50 bg-black">
        <MainHeader />
      </header>
      <main className="max-w-3xl flex flex-col justify-center mx-auto">
        {children}
      </main>
    </>
  );
};

export default ProfileLayout;
