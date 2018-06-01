import React from "react";

export default function Page404() {
  return (
    <div>
      <h3 className="position-absolute text-dark w-100 text-center">We are looking for your page...but we can't find it</h3>
      <video
        poster="https://www.theuselesswebindex.com/static/videos/error.jpg"
        autobuffer=""
        autoplay=""
        loop=""
      >
        <source
          src="https://www.theuselesswebindex.com/static/videos/error.mp4"
          type="video/mp4"
        />
        <source
          src="https://www.theuselesswebindex.com/static/videos/error.ogv"
          type="video/ogg"
        />
        <source
          src="https://www.theuselesswebindex.com/static/videos/error.webm"
          type="video/webm"
        />
      </video>
    </div>
  );
}
