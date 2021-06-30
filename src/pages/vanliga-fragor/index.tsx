import { GetStaticProps } from "next";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import QuestionList from "../../components/QuestionList";
import config from "../../lib/config";
import { countQuestions, listQuestionsContent, QuestionContent } from "../../lib/questions";
import { listCategories, CategoryContent } from "../../lib/categories";
import Head from "next/head";

type Props = {
  questions: QuestionContent[];
  categories: CategoryContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Index({ questions, categories, pagination }: Props) {
  const url = "/vanliga-fragor";
  const title = "Vanliga frågor";
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <QuestionList questions={questions} categories={categories} pagination={pagination} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const questions = listQuestionsContent(1, config.questions_per_page);
  const categories = listCategories();
  const pagination = {
    current: 1,
    pages: Math.ceil(countQuestions() / config.questions_per_page),
  };
  return {
    props: {
      questions,
      categories,
      pagination,
    },
  };
};
