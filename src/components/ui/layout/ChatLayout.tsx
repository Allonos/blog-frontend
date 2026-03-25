import MainHeader from "../headers/MainHeader";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col">
      <header className="border-b border-zinc-800 sticky top-0 z-50 bg-black">
        <MainHeader />
      </header>
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default ChatLayout;
