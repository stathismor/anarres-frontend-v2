import { motion } from "framer-motion";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "react-feather";
import { childVariants, EnterTransition } from "../components/EnterTransition";
import { getPostsData, PostData } from "../lib/posts";

export async function getStaticProps() {
  const posts = getPostsData();
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }: { posts: Array<PostData> }) {
  return (
    <EnterTransition>
      <section className="flex flex-col items-center max-w-screen-md mx-auto">
        <ul className="list-none p-0">
          {posts.map((post) => (
            <motion.li
              variants={childVariants}
              key={post.slug}
              className="mb-24 last:mb-0"
            >
              <Link href={`/blog/${post.slug}`} className="no-underline">
                <Image
                  className="m-auto"
                  src={post.thumbnail ?? ""}
                  alt="ALT IMAGE"
                  width={800}
                  height={600}
                />
              </Link>
              <h3>
                <Link
                  href={`/blog/${post.slug}`}
                  className="no-underline text-2xl font-bold"
                >
                  {post.title}
                </Link>
              </h3>
              <time className="italic text-base">
                {format(new Date(post.date), "MMMM do, yyyy")}
              </time>
              <p className="mt-8 mb-4 text-lg">{post.description}</p>
              <div>
                <Link
                  href={`/blog/${post.slug}`}
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
