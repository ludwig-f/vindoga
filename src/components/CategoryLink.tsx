import Link from "next/link";
import { CategoryContent } from "../lib/categories";

type Props = {
  category: CategoryContent;
};

export default function Category({ category }: Props) {
  return (
    <Link href={"/vanliga-fragor/kategorier/[[...slug]]"} as={`/vanliga-fragor/kategorier/${category.slug}`}>
      <a>{"#" + category.name}</a>
    </Link>
  );
}
