import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BROADCAST_DATA_FOLDER = "schedule/broadcasts";

interface MatterData {
  title: string;
  subtitle: string;
  weekday: string;
  startTime: string;
  endTime: string;
  isLive: boolean;
}

export type BroadcastData = MatterData & {
  slug: string;
  content: string;
}

export function getBroadcasts(): Array<BroadcastData> {
  const broadcastsPath = fs.readdirSync(path.resolve(BROADCAST_DATA_FOLDER));

  const broadcastsData = broadcastsPath.map((programPath) => {
    return getMatterData(programPath);
  });

  return broadcastsData;
}

export function getBroadcastData(slug: string): BroadcastData {
  const programsPath = path.resolve(BROADCAST_DATA_FOLDER, `${slug}.md`);

  return getMatterData(programsPath);
}

export function getBroadcastsSlugs() {
  const programPaths = fs.readdirSync(path.resolve(BROADCAST_DATA_FOLDER));

  return programPaths.map((p) => p.replace(".md", ""));
}

function getMatterData(broadcastPath: string) {
  const fileContents = fs
    .readFileSync(path.resolve(BROADCAST_DATA_FOLDER, broadcastPath))
    .toString();

  const slug = broadcastPath.replace(".md", "");

  const matterResult = matter(fileContents);
  const data = matterResult.data as MatterData;
  const content = matterResult.content;

  return {
    slug,
    content,
    ...data,
  };
}
