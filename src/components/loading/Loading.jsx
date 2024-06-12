import React from "react";
import "./loading.scss";
const Loading = () => {
  let loadingCard = (
    <div className="loading__card">
      <div className="loading__info">
        <div className="loading__desc bg__animation"></div>
        <div className="loading__desc bg__animation"></div>
      </div>
      <div className="loading__img bg__animation"></div>
    </div>
  );
  return <div className="container loading">{loadingCard}</div>;
};

export default Loading;
