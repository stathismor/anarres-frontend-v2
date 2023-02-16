import { motion } from "framer-motion";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "react-feather";
import { childVariants, EnterTransition } from "../components/EnterTransition";
import { getProgramsData, ProgramData } from "../lib/programs";

export async function getStaticProps() {
  const programs = getProgramsData();
  return {
    props: {
      programs,
    },
  };
}

export default function Home({ programs }: { programs: Array<ProgramData> }) {
  return (
    <EnterTransition>
      <section className="flex flex-col items-center max-w-screen-md mx-auto mt-10 mb-40">
        <ul className="list-none p-0">
          {programs.map((program) => (
            <motion.li
              variants={childVariants}
              key={program.slug}
              className="mb-24 last:mb-0"
            >
              <h3>
                <Link
                  href={`/blog/${program.slug}`}
                  className="no-underline text-2xl font-bold"
                >
                  {program.title}
                </Link>
              </h3>
              <time className="italic text-base">
                {program.title}
              </time>
              <p className="mt-8 mb-4 text-lg">Alo</p>
              <div>
                <Link
                  href={`/blog/${program.slug}`}
                  className="underline inline-flex items-center"
                >
                  <span className="mr-1 hover:text-red-500">Read</span>{" "}
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>
    </EnterTransition>
  );
}
