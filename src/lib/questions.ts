import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";

const questionsDirectory = path.join(process.cwd(), "content/questions");

export type QuestionContent = {
  readonly question: string;
	readonly slug: string;
	readonly categories: string[];
  readonly fullPath: string;
};

let questionCache: QuestionContent[];

export function fetchQuestionsContent(): QuestionContent[] {
  if (questionCache) {
    return questionCache;
  }
  // Get file names under /questions
  const fileNames = fs.readdirSync(questionsDirectory);
  const allQuestionsData = fileNames
    .filter((it) => it.endsWith(".mdx"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(questionsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the question metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      const matterData = matterResult.data as {
        question: string;
				slug: string;
				categories: string[];
        fullPath: string,
      };
      matterData.fullPath = fullPath;

      const slug = fileName.replace(/\.mdx$/, "");

      // Validate slug string
      if (matterData.slug !== slug) {
        throw new Error(
          "slug field not match with the path of its content source"
        );
      }

      return matterData;
    });

  questionCache = allQuestionsData;

  return questionCache;
}

export function countQuestions(category?: string): number {
  return fetchQuestionsContent().filter(
    (it) => !category || (it.categories && it.categories.includes(category))
  ).length;
}

export function listQuestionsContent(
  page: number,
  limit: number,
  tag?: string
): QuestionContent[] {
  return fetchQuestionsContent()
    .filter((it) => !tag || (it.categories && it.categories.includes(tag)))
    .slice((page - 1) * limit, page * limit);
}
