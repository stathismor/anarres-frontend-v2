// import Navbar from "./navbar";
// import Footer from "./footer";
import Player from "./Player";
import Navbar from "./Navbar";

interface PayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: PayoutProps) {
  return (
    <>
      <div className="text-center">
        <div className="flex flex-col h-screen justify-between">
          <Navbar />
          <header className="h-10 bg-red-500">Header</header>
          <main className="mb-auto flex-grow bg-black">{children}</main>
          <Player />
        </div>
      </div>
    </>
  );
}
