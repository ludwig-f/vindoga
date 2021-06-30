import { QuestionContent } from "../lib/questions";
import Date from "./Date";
import Link from "next/link";
import { parseISO } from "date-fns";

type Props = {
  question: QuestionContent;
};
export default function QuestionItem({ question }: Props) {
  return (
    <Link href={"/vanliga-fragor/" + question.slug}>
      <a>
        <h2>&gt; {question.question}</h2>
        <style jsx>
          {`
            a {
              color: #222;
              display: inline-block;
            }
            h2 {
              margin: 0;
              font-weight: 500;
            }
          `}
        </style>
      </a>
    </Link>
  );
}
