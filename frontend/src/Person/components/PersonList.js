import React from "react";

import PersonItems from "./PersonItems";
import "./PersonList.css";

const PersonList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No persons found</h2>
      </div>
    );
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>SURNAME</th>
          <th>CITY</th>
          <th>ADDRESS</th>
          <th>PHONE</th>
          <th>CREATED DATE</th>
          <th>ACTION</th>
        </tr>
      </thead>
      {props.items.map((person) => (
        <PersonItems
          key={person.id}
          id={person.id}
          name={person.name}
          surname={person.surname}
          city={person.city}
          address={person.address}
          phone={person.phone}
          date={person.createdDate}
          onDelete={props.onDeletePerson}
        />
      ))}
         </table>
  );
};

export default PersonList;
