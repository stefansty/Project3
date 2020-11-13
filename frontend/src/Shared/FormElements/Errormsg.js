import React from "react";

import "./Errormsg.css";

const errorMsg = (props) => {
  return (
    <div className="errormsg">
      <h2>{props.error}</h2>
    </div>
  );
};
export default errorMsg;
