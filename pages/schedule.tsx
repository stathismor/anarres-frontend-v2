import { useState } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import { childVariants, EnterTransition } from "../components/EnterTransition";
import { Weekday, groupByDay, getBroadcasts, BroadcastData } from "../lib/broadcasts";

export async function getStaticProps() {
  const broadcasts = getBroadcasts();
  const broadcastsByDay = groupByDay(broadcasts);

  return {
    props: {
      days: broadcastsByDay
    },
  };
}


const DaysProgramme = ({ broadcasts }: { broadcasts: Array<BroadcastData> })  => {
  return (
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
  );
}

export default function Schedule({ days }:
  {
    days: {
      [key in Weekday]: Array<BroadcastData>
    }
  }) {
  const [selectedDay, setDay] = useState("Monday");


  return (
    <EnterTransition>
      <section className="flex flex-col items-center max-w-screen-md mx-auto mt-10 mb-40">
        <h1>Schedule (EET)</h1>
        <div>
          {Object.keys(days).map(day =>
            <button
              className={day === selectedDay ? "font-extrabold": ""}
              key={day}
              onClick={() => setDay(day)}>{`${day} `}
            </button>)}
        </div>
        <DaysProgramme broadcasts={days[selectedDay]} />
      </section>
    </EnterTransition>
  );
}
