import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../../components/Layout";
import BasicMeta from "../../../components/meta/BasicMeta";
import OpenGraphMeta from "../../../components/meta/OpenGraphMeta";
import CategoryQuestionList from "../../../components/CategoryQuestionList";
import config from "../../../lib/config";
import { countQuestions, listQuestionsContent, QuestionContent } from "../../../lib/questions";
import { getCategory, listCategories, CategoryContent } from "../../../lib/categories";
import Head from "next/head";

type Props = {
  questions: QuestionContent[];
  category: CategoryContent;
  page?: string;
  pagination: {
    current: number;
    pages: number;
  };
};

export default function Index({ questions, category, pagination, page }: Props) {
  const url = `/vanliga-fragor/kategorier/${category.name}` + (page ? `/${page}` : "");
  const title = category.name;

  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <CategoryQuestionList questions={questions} category={category} pagination={pagination} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queries = params.slug as string[];
  const [slug, page] = [queries[0], queries[1]];
  const questions = listQuestionsContent(
    page ? parseInt(page as string) : 1,
    config.questions_per_page,
    slug,
  );
  const category = getCategory(slug);
  const pagination = {
    current: page ? parseInt(page as string) : 1,
    pages: Math.ceil(countQuestions(slug) / config.questions_per_page),
  };
  const props: {
    questions: QuestionContent[];
    category: CategoryContent;
    pagination: { current: number; pages: number };
    page?: string;
  } = { questions, category, pagination };
  if (page) {
    props.page = page;
  }
  return {
    props,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = listCategories().flatMap((category) => {
    const pages = Math.ceil(countQuestions(category.slug) / config.questions_per_page);
    return Array.from(Array(pages).keys()).map((page) =>
      page === 0
        ? {
            params: { slug: [category.slug] },
          }
        : {
            params: { slug: [category.slug, (page + 1).toString()] },
          }
    );
  });
  return {
    paths: paths,
    fallback: false,
  };
};
