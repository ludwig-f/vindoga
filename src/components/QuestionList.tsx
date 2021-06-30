import React from "react";
import { QuestionContent } from "../lib/questions";
import QuestionItem from "./QuestionItem";
import CategoryLink from "./CategoryLink";
import Pagination from "./Pagination";
import { CategoryContent } from "../lib/categories";

type Props = {
  questions: QuestionContent[];
  categories: CategoryContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function QuestionList({ questions, categories, pagination }: Props) {
  return (
    <div className={"container"}>
      <div className={"questions"}>
        <h1>Vanliga frågor</h1>
        <ul className={"question-list"}>
          {questions.map((it, i) => (
            <li key={i}>
              <QuestionItem question={it} />
            </li>
          ))}
        </ul>
        <Pagination
          current={pagination.current}
          pages={pagination.pages}
          link={{
            href: (page) => (page === 1 ? "/vanliga-fragor" : "/vanliga-fragor/sida/[sida]"),
            as: (page) => (page === 1 ? null : "/vanliga-fragor/sida/" + page),
          }}
        />
      </div>
      <ul className={"categories"}>
        {categories.map((it, i) => (
          <li key={i}>
            <CategoryLink category={it} />
          </li>
        ))}
      </ul>
      <style jsx>{`
        .container {
          display: flex;
          margin: 0 auto;
          max-width: 1200px;
          width: 100%;
          padding: 0 1.5rem;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        .questions {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
        }
        .questions li {
          margin-bottom: 1.5rem;
        }
        .question-list {
          flex: 1 0 auto;
        }
        .categories {
          display: none;
        }
        .categories li {
          margin-bottom: 0.75em;
        }

        @media (min-width: 769px) {
          .categories {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
