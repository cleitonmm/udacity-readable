const HEADER = { headers: { Authorization: "123456" } };

export function getCategories() {
  return fetch("http://localhost:3001/categories", HEADER)
    .then(res => res.json())
    .then(res => res.categories);
}

export function getPosts() {
  return fetch("http://localhost:3001/posts", HEADER)
    .then(res => res.json())
}

export function getCategoryPosts(category) {
  return fetch(`http://localhost:3001/${category}/posts`, HEADER)
    .then(res => res.json())
}
