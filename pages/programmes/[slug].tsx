import { format } from "date-fns";
import { motion } from "framer-motion";
import { NextPage } from "next";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { getBroadcastData, BroadcastData, getBroadcastsSlugs } from "../../lib/broadcasts";

import {
  childVariants,
  EnterTransition,
} from "../../components/EnterTransition";

const BroadcastPage: NextPage<BroadcastData> = (broadcast) => {
  return (
    <EnterTransition>
      <section className="max-w-screen-lg m-auto dark:prose-invert">
        <motion.div variants={childVariants}>
          <h1 className="mb-4 text-1xl leading-none font-semibold">
            {broadcast.subtitle}
          </h1>
          <h2 className="mb-4 text-2xl leading-none font-semibold">
            {broadcast.title}
          </h2>
          <time className="italic text-base">
          {broadcast.weekday}s {broadcast.startTime} - {broadcast.endTime}
          </time>
          <hr className="text-red-500 mt-4 mb-10" />
        </motion.div>
      </section>

      <motion.div variants={childVariants}>
        <article className="prose prose-lg dark:prose-invert max-w-screen-lg m-auto">
          <ReactMarkdown>{broadcast.content}</ReactMarkdown>
        </article>
      </motion.div>
    </EnterTransition>
  );
};

export async function getStaticPaths() {
  const broadcastSlugs = getBroadcastsSlugs();

  return {
    paths: broadcastSlugs.map((broadcastSlug) => ({ params: { slug: broadcastSlug } })),
    fallback: false,
  };
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return { props: getBroadcastData(slug) };
}

export default BroadcastPage;
