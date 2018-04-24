import { schema } from "normalizr";

// Posts
export const post = new schema.Entity("post");
export const posts = [post];

// category
export const category = new schema.Entity(
  "category",
  {},
  { idAttribute: "path" }
);
export const categories = [category];

// Comments
export const comment = new schema.Entity(
  "comment",
  {},
  { processStrategy: entity => ({ ...entity, isManipulating: false, errorMessage: null }) }
);
export const comments = [comment];
