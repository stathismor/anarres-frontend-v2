import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostData {
  id: string;
  date: string;
  title: string;
}

export function getSortedPostsData(): Array<PostData> {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // console.log("matterResult", matterResult);
    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: Date; title: string }), // TODO: Is this the best way?
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
