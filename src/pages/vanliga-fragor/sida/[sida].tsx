import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../../components/Layout";
import BasicMeta from "../../../components/meta/BasicMeta";
import OpenGraphMeta from "../../../components/meta/OpenGraphMeta";
import QuestionList from "../../../components/QuestionList";
import config from "../../../lib/config";
import { countQuestions, listQuestionsContent, QuestionContent } from "../../../lib/questions";
import { listCategories, CategoryContent } from "../../../lib/categories";

type Props = {
  questions: QuestionContent[];
  categories: CategoryContent[];
  page: number;
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Page({ questions, categories, pagination, page }: Props) {
  const url = `/vanliga-fragor/sida/${page}`;
  const title = "Vanliga frågor";
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <QuestionList questions={questions} categories={categories} pagination={pagination} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = parseInt(params.page as string);
  const questions = listQuestionsContent(page, config.questions_per_page);
  const categories = listCategories();
  const pagination = {
    current: page,
    pages: Math.ceil(countQuestions() / config.questions_per_page),
  };
  return {
    props: {
      page,
      questions,
      categories,
      pagination,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = Math.ceil(countQuestions() / config.questions_per_page);
  const paths = Array.from(Array(pages - 1).keys()).map((it) => ({
    params: { page: (it + 2).toString() },
  }));
  return {
    paths: paths,
    fallback: false,
  };
};
