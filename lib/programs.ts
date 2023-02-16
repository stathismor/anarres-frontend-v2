import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROGRAM_DATA = "content/schedule";

interface MatterData {
  title: string;
}

export type ProgramData = MatterData & {
  slug: string;
  content: string;
}

export function getProgramsData(): Array<ProgramData> {
  const programsPath = fs.readdirSync(path.resolve(PROGRAM_DATA));

  const programData = programsPath.map((programPath) => {
    return getMatterData(programPath);
  });

  return programData;
}

export function getProgramData(slug: string) {
  const programsPath = path.resolve(PROGRAM_DATA, `${slug}.md`);

  return getMatterData(programsPath);
}

export function getProgramsSlugs() {
  const programPaths = fs.readdirSync(path.resolve(PROGRAM_DATA));

  return programPaths.map((p) => p.replace(".md", ""));
}

function getMatterData(programPath: string) {
  const fileContents = fs
    .readFileSync(path.resolve(PROGRAM_DATA, programPath))
    .toString();

  const slug = programPath.replace(".md", "");

  const matterResult = matter(fileContents);
  const data = matterResult.data as MatterData;
  const content = matterResult.content;

  return {
    slug,
    content,
    ...data,
  };
}
