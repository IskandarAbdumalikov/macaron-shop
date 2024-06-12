import React, { useState } from "react";
import "./Model.scss";
import { useSearchParams } from "react-router-dom";

const Model = ({ children, close, width = 400 }) => {
 


  return (
    <>
      <div onClick={() => close(false)} className="overlay"></div>
      <div style={{ width }} className="model">
        {children}
      </div>
    </>
  );
};

export default Model;
