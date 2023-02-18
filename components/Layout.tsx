import Head from "next/head";
import Player from "./Player";
import Navbar from "./Navbar";

interface PayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: PayoutProps) {
  return (
    <div>
      <Head>
        <title>ararres.fm</title>
      </Head>
      <Navbar />
      <main className="bg-zinc-900 pb-28 sm:pb-32 pt-4 sm:pt-10">
        {children}
      </main>
      <Player />
    </div>
  );
}
