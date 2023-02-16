import { motion } from "framer-motion";
import Link from "next/link";
import { childVariants, EnterTransition } from "../components/EnterTransition";
import { getBroadcasts, BroadcastData } from "../lib/broadcasts";

export async function getStaticProps() {
  const broadcasts = getBroadcasts();
  return {
    props: {
      broadcasts,
    },
  };
}

export default function Home({ broadcasts }: { broadcasts: Array<BroadcastData> }) {
  return (
    <EnterTransition>
      <section className="flex flex-col items-center max-w-screen-md mx-auto mt-10 mb-40">
        <h1>Schedule (EET)</h1>
        <ul className="list-none p-0">
          {broadcasts.map((broadcast) => (
            <motion.li
              variants={childVariants}
              key={broadcast.slug}
              className="mb-24 last:mb-0"
            >
              <div className="broadcast-item">
                <div>
                  <div className="broadcast-time">
                    <time className="italic text-base">
                      {broadcast.startTime} - {broadcast.endTime}
                    </time>
                  </div>
                  <div >
                    <span className="badge broadcast-badge">
                      {broadcast.isLive ? "live" : "playlist"}
                    </span>
                  </div>
                </div>
                <div  className="broadcast-title">
                  <Link
                    href={`/programmes/${broadcast.slug}`}
                    className="no-underline text-2xl font-bold"
                  >
                    {broadcast.title}
                  </Link>
                </div>
                <span  className="tag">{broadcast.subtitle}</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>
    </EnterTransition>
  );
}
