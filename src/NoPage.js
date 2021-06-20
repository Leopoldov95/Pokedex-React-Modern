import React from "react";
import "./NoPage.css";
function noPage() {
  return (
    <div className="NoPage">
      <img src="/404.jpeg" alt="404_img" />
      <h1>Sorry, the page you're looking for doesn't exist...</h1>
    </div>
  );
}

export default noPage;
