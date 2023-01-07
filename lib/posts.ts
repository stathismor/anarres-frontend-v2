import fs from "fs";
import { compareDesc } from "date-fns";
import path from "path";
import matter from "gray-matter";

const POSTS_PATH = "posts";

interface MatterData {
  date: Date;
  title: string;
  description: string;
  thumbnail: string;
  subtitle: string;
}

export interface PostData extends Omit<MatterData, "date"> {
  slug: string;
  date: string;
  content: string;
}

export function getPostsData(): Array<PostData> {
  const postPaths = fs.readdirSync(path.resolve(POSTS_PATH));

  const postsData = postPaths.map((postPath) => {
    return getMatterData(postPath);
  });

  // Sort posts by date
  const sortedData = postsData.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  return sortedData;
}

export function getPostData(slug: string) {
  const postPath = path.resolve(POSTS_PATH, `${slug}.md`);

  return getMatterData(postPath);
}

export function getPostSlugs() {
  const postPaths = fs.readdirSync(path.resolve(POSTS_PATH));

  return postPaths.map((postPath) => postPath.replace(".md", ""));
}

function getMatterData(postPath: string) {
  const fileContents = fs
    .readFileSync(path.resolve(POSTS_PATH, postPath))
    .toString();

  const slug = postPath.replace(".md", "");

  const matterResult = matter(fileContents);
  const data = matterResult.data as MatterData;
  const content = matterResult.content;

  return {
    slug,
    ...data,
    date: data.date.toISOString(),
    content,
  };
}
