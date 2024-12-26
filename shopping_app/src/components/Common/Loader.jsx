import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div>
    <div className="lds-ring">  {/*taken code from 'https://loading.io/css' website*/}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    </div>
  );
};

export default Loader;
