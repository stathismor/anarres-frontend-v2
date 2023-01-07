import Player from "./Player";
import Navbar from "./Navbar";

interface PayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: PayoutProps) {
  return (
    <div className="text-center">
      <Navbar />
      <main className="bg-black">{children}</main>
      <Player />
    </div>
  );
}
