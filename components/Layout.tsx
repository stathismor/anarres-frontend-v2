import Player from "./Player";
import Navbar from "./Navbar";

interface PayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: PayoutProps) {
  return (
    <div className="flex flex-col h-screen justify-between text-center">
      <Navbar />
      <main className="mb-auto flex-grow bg-black">{children}</main>
      <Player />
    </div>
  );
}
