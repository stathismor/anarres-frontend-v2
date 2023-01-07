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
      <main className="bg-black">{children}</main>
      <Player />
    </div>
  );
}
