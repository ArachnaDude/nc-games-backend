// need to return [slug, description]

exports.formatCategoryData = (categoryData) => {
  categoryData.map((category) => {
    return [category.slug, category.description];
  });
};
