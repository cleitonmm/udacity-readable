export const isFetchingCategories = state => state.categories.isFetching;

export const getCategoriesError = state => state.categories.errorMessage;

const getAllCategories = state =>
  Object.keys(state.categories.byIds).map(id => state.categories.byIds[id]);

export const filterCategory = (state, path) => {
  let categories = getAllCategories(state);

  if (path) {
    categories = categories.filter(category => category.path === path);
  }

  return categories;
};
