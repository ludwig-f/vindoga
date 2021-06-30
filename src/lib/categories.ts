import categories from "../../meta/categories.yml";

export type CategoryContent = {
  readonly slug: string;
  readonly name: string;
};

const categoryMap: { [key: string]: CategoryContent } = generateCategoryMap();

function generateCategoryMap(): { [key: string]: CategoryContent } {
  let result: { [key: string]: CategoryContent } = {};
  for (const category of categories.categories) {
    result[category.slug] = category;
  }
  return result;
}

export function getCategory(slug: string) {
  return categoryMap[slug];
}

export function listCategories(): CategoryContent[] {
  return categories.categories;
}
