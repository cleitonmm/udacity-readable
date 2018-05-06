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

export function putPost(id, title, body) {
  return fetch(`http://localhost:3001/posts/${id}`, {
    method: "PUT",
    headers: HEADER.headers,
    body: JSON.stringify({
      title,
      body
    })
  }).then(res => res.json());
}

export function deletePost(id) {
  console.log(id, "DELETE")
  return fetch(`http://localhost:3001/posts/${id}`, {
    method: "DELETE",
    headers: HEADER.headers
  }).then(res => res.json());
}


export function postPost(post) {
  const { title, body, author, category } = post;

  const id = guid();
  const timestamp = Date.now();

  return fetch(`http://localhost:3001/posts`, {
    method: "POST",
    headers: HEADER.headers,
    body: JSON.stringify({
      id,
      timestamp,
      title,
      body,
      author,
      category
    })
  }).then(res => res.json());
}

export function postPostVote(id, vote) {
  return fetch(`http://localhost:3001/posts/${id}`, {
    method: "POST",
    headers: HEADER.headers,
    body: JSON.stringify({
      option: vote
    })
  }).then(res => res.json());
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

export function putComment(id, body) {
  const timestamp = Date.now();

  return fetch(`http://localhost:3001/comments/${id}`, {
    method: "PUT",
    headers: HEADER.headers,
    body: JSON.stringify({
      timestamp,
      body
    })
  }).then(res => res.json());
}

export function deleteComment(id) {
  console.log(id, "DELETE")
  return fetch(`http://localhost:3001/comments/${id}`, {
    method: "DELETE",
    headers: HEADER.headers
  }).then(res => res.json());
}

export function postComment(comment) {
  const { body, author, parentId } = comment;

  const id = guid();
  const timestamp = Date.now();

  return fetch(`http://localhost:3001/comments`, {
    method: "POST",
    headers: HEADER.headers,
    body: JSON.stringify({
      id,
      timestamp,
      body,
      author,
      parentId
    })
  }).then(res => res.json());
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}
