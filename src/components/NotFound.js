import React from "react";
import "./notfound.css";

const NotFound = () => {
  return (
    <div className="pt-5 mt-5">
      <h1>404 Error Page </h1>

      <section class="error-container ">
        <span class="four">
          <span class="screen-reader-text ">4</span>
        </span>
        <span class="zero">
          <span class="screen-reader-text">0</span>
        </span>
        <span class="four">
          <span class="screen-reader-text">4</span>
        </span>
      </section>
      <div class="link-container">
        <a target="_blank" href="/homepage" class="more-link">
          Go Back
        </a>
      </div>
    </div>
  );
};

export default NotFound;
