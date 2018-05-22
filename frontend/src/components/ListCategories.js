import React from "react";
import { Link } from "react-router-dom";

export default function ListCategories({ cats, selected }) {
    console.log(cats)
  if (!selected) selected = { path: null };
  return (
    <div className="btn-group d-block">
      {cats.map(cat => (
        <Link
          key={cat.path}
          to={{
            pathname: `/category/${cat.path}`
          }}
        >
          <div
            className={
              cat.path === selected.path
                ? "d-inline-block btn btn-dark p-3 m-3 btn-cat"
                : "d-inline-block btn btn-primary p-3 m-3 btn-cat"
            }
          >
            {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
          </div>
        </Link>
      ))}
    </div>
  );
}
