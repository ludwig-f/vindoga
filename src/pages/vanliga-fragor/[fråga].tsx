import { GetStaticProps, GetStaticPaths } from "next";
import renderToString from "next-mdx-remote/render-to-string";
import { MdxRemote } from "next-mdx-remote/types";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import { fetchQuestionsContent } from "../../lib/questions";
import fs from "fs";
import yaml from "js-yaml";
import QuestionLayout from "../../components/QuestionLayout";

export type Props = {
  question: string;
  slug: string;
  categories: string[];
  description?: string;
  source: MdxRemote.Source;
};

const slugToQuestionContent = (questionContents => {
  let hash = {}
  questionContents.forEach(it => hash[it.slug] = it)
  return hash;
})(fetchQuestionsContent());

export default function Question({
  question,
  slug,
  categories,
  description = "",
  source,
}: Props) {
  const content = hydrate(source)
  return (
    <QuestionLayout
      question={question}
      slug={slug}
      categories={categories}
      description={description}
    >
      {content}
    </QuestionLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchQuestionsContent().map(it => encodeURI(`/vanliga-fragor/${it.slug}`));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.fråga as string;
  const source = fs.readFileSync(slugToQuestionContent[slug].fullPath, "utf8");
  const { content, data } = matter(source, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object }
  });
  const mdxSource = await renderToString(content, { scope: data });
  return {
    props: {
      question: data.question,
      slug: data.slug,
      description: "",
      categories: data.categories,
      source: mdxSource
    },
  };
};

