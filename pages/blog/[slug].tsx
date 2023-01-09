import { format } from "date-fns";
import { motion } from "framer-motion";
import { NextPage } from "next";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { getPostData, PostData, getPostSlugs } from "../../lib/posts";

import {
  childVariants,
  EnterTransition,
} from "../../components/EnterTransition";

const PostPage: NextPage<PostData> = (postData) => {
  return (
    <EnterTransition>
      <section className="max-w-screen-lg m-auto dark:prose-invert">
        {postData.thumbnail && (
          <motion.div variants={childVariants} className="mb-4">
            <h1 className="mb-8 text-5xl leading-none font-extrabold text-center">
              {postData.title}
            </h1>

            <Image
              className="rounded"
              src={postData.thumbnail}
              alt="ALT IMAGE HERE"
              height={800}
              width={600}
            />
          </motion.div>
        )}

        <motion.div variants={childVariants}>
          <h2 className="mb-4 text-2xl leading-none font-semibold">
            {postData.subtitle}
          </h2>

          <time className="italic">
            {format(new Date(postData.date), "MMMM do, yyyy")}
          </time>

          <hr className="text-red-500 mt-4 mb-10" />
        </motion.div>
      </section>

      <motion.div variants={childVariants}>
        <article className="prose prose-lg dark:prose-invert max-w-screen-lg m-auto">
          <ReactMarkdown>{postData.content}</ReactMarkdown>
        </article>
      </motion.div>
    </EnterTransition>
  );
};

export async function getStaticPaths() {
  const postSlugs = getPostSlugs();

  return {
    paths: postSlugs.map((postSlug) => ({ params: { slug: postSlug } })),
    fallback: false,
  };
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return { props: getPostData(slug) };
}

export default PostPage;
