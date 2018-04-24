const HEADER = {
  headers: {
    Authorization: "123456",
    Accept: "application/json",
    "Content-Type": "application/json"
  }
};

export function getCategories() {
  return fetch("http://localhost:3001/categories", HEADER)
    .then(res => res.json())
    .then(res => res.categories);
}

export function getPosts() {
  return fetch("http://localhost:3001/posts", HEADER).then(res => res.json());
}

export function getCategoryPosts(category) {
  return fetch(`http://localhost:3001/${category}/posts`, HEADER).then(res =>
    res.json()
  );
}

export function getPost(id) {
  return fetch(`http://localhost:3001/posts/${id}`, HEADER).then(res =>
    res.json()
  );
}

export function getPostComments(id) {
  return fetch(`http://localhost:3001/posts/${id}/comments`, HEADER).then(res =>
    res.json()
  );
}

export function getComment(id) {
  return fetch(`http://localhost:3001/comments/${id}`, HEADER).then(res =>
    res.json()
  );
}

export function postCommentVote(id, vote) {
  return fetch(`http://localhost:3001/comments/${id}`, {
    method: "POST",
    headers: HEADER.headers,
    body: JSON.stringify({
      option: vote
    })
  }).then(res => res.json());
}
