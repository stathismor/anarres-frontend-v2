import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsPath = path.join(process.cwd(), "posts");

interface MatterData {
  slug: string;
  date: Date;
  title: string;
  description: string;
  thumbnail: string;
}

export interface Post extends Omit<MatterData, "date"> {
  date: string;
  content: string;
}

export function getPosts(): Array<Post> {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsPath);
  const allPostsData = fileNames.map((fileName) => {
    // Read markdown file as string
    const fullPath = path.join(postsPath, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    const data = matterResult.data as MatterData;
    const content = matterResult.content;

    return {
      ...data,
      content,
    };
  });

  // Sort posts by date
  const sortedData = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  const formattedData = sortedData.map((datum) => ({
    ...datum,
    date: datum.date.toISOString(),
  }));

  return formattedData;
}
