import React, { useContext } from "react";
import Alert from "react-bootstrap/Alert";
import alertContext from "../context/alert/AlertContext";

const Alertx = () => {
  const { alert } = useContext(alertContext);
  return (
    <div>{alert && <Alert variant={alert.type}>{alert.message}</Alert>}</div>
  );
};

export default Alertx;
