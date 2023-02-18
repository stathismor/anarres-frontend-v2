import { format } from "date-fns";
import { motion } from "framer-motion";
import { NextPage } from "next";
import Image, { ImageProps } from "next/image";
import ReactMarkdown from "react-markdown";
import { getPostData, PostData, getPostSlugs } from "../../lib/posts";
import {
  childVariants,
  EnterTransition,
} from "../../components/EnterTransition";

const Paragraph = (props: any) => (
  <p className="text-base pt-3 sm:pt-5">{props.children}</p>
);

const components = {
  p: Paragraph,
};

const PostPage: NextPage<PostData> = (postData) => {
  return (
    <EnterTransition>
      <section className="max-w-screen-lg m-auto">
        {postData.thumbnail && (
          <motion.div variants={childVariants}>
            <h1 className="pb-4 text-xl sm:text-3xl leading-none font-extrabold text-center">
              {postData.title}
            </h1>
            <Image
              className="rounded"
              src={postData.thumbnail}
              alt="ALT"
              height={500}
              width={1024}
            />
          </motion.div>
        )}

        <motion.div variants={childVariants}>
          <h2 className="mb-1 text-base sm:text-lg leading-none font-semibold">
            {postData.subtitle}
          </h2>

          <time className="italic text-sm text-gray-400">
            {format(new Date(postData.date), "MMMM do, yyyy")}
          </time>

          <hr className="border-red-500 my-3" />
        </motion.div>
      </section>
      <motion.div variants={childVariants}>
        <article className="max-w-screen-lg m-auto">
          <ReactMarkdown className="bg-zinc-900" components={components}>
            {postData.content}
          </ReactMarkdown>
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
