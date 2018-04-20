import { schema } from "normalizr";

// Posts
export const post = new schema.Entity("post");

export const posts = [post];

// category
export const category = new schema.Entity("category", {}, {idAttribute: 'path'});

export const categories = [category];

