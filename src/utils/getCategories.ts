type Categories = {
  product_id: number;
  category_id: number;
};

export function getCategories(
  productId: number,
  categoriesArray: number[]
): Categories[] {
  const obj: Categories[] = [];
  categoriesArray.forEach((el: number) => {
    obj.push({
      product_id: productId,
      category_id: el,
    });
  });
  return obj;
}
