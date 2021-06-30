import Link from "next/link";
import { CategoryContent } from "../lib/categories";

type Props = {
  category: CategoryContent;
};
export default function CategoryButton({ category }: Props) {
  return (
    <>
      <Link href={"/vanliga-fragor/kategorier/[[...slug]]"} as={`/vanliga-fragor/kategorier/${category.slug}`}>
        <a>{category.name}</a>
      </Link>
      <style jsx>{`
        a {
          display: inline-block;
          border-radius: 3px;
          background-color: rgba(21, 132, 125, 0.2);
          color: #15847d;
          transition: background-color 0.3s ease;
          padding: 0.25em 0.5em;
        }
        a:active,
        a:hover {
          background-color: rgba(21, 132, 125, 0.4);
        }
      `}</style>
    </>
  );
}
