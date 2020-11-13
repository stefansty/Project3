import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Errormsg from "../../Shared/FormElements/Errormsg";
import moment from 'moment'

import "./PersonItems.css";

const PersonItems = (props) => {
  const [error, setError] = useState();

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/person/${props.id}`,
        {
          method: "DELETE",
        }
      );
      const responseData = response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      props.onDelete(props.id);
    } catch (err) {
      setError(err.message);
    }
  };



  return (
    <React.Fragment>
      <div className="center">
      {error && <Errormsg error={error} />}
      </div>
      <tbody className="table">
        <tr>
          <td>{props.id}</td>
          <td>{props.name}</td>
          <td>{props.surname}</td>
          <td>{props.city}</td>
          <td>{props.address}</td>
          <td>{props.phone}</td>
          <td>{moment(props.date).format("DD/MM/YYYY")}</td>
          <td>
            <Button>
              <Link to={`/person/${props.id}`}>Edit</Link>
            </Button>
            <Button onClick={deleteHandler}>Delete</Button>
          </td>
        </tr>
      </tbody>
    </React.Fragment>
  );
};

export default PersonItems;
