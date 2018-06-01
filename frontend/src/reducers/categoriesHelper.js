export const isFetchingCategories = state => state.categories.isFetching;

export const getCategoriesError = state => state.categories.errorMessage;

export const getAllCategories = state =>
  Object.keys(state.categories.byIds).map(id => state.categories.byIds[id]);


