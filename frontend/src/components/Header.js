import React from "react";
import { Link } from "react-router-dom";
import ButtonNewPost from "./ButtonNewPost";

const Header = categories => {
  return (
    <div>
      <div className="header bg-primary">
        <Link
          to={{
            pathname: `/`
          }}
        >
          <span className="">Readable</span>
        </Link>
      </div>
      <ButtonNewPost />
    </div>
  );
};

export default Header;
