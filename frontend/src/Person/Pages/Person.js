import React, { useEffect, useState } from "react";
import Errormsg from "../../Shared/FormElements/Errormsg";
import PersonList from "../components/PersonList";

const Person = () => {
  const [loadedPersons, setLoadedPersons] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const sendReaquest = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/person");

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadedPersons(responseData.persons);
      } catch (err) {
        setError(err.message);
      }
    };

    sendReaquest();
  }, []);

  const personDeleteHandler = (deletedPersonId) => {
    setLoadedPersons((prevPerson) =>
      prevPerson.filter((person) => person.id !== deletedPersonId)
    );
  };

  return (
    <React.Fragment>
      <div className="center">
      {error && <Errormsg error={error} />}
      </div>
      {loadedPersons && (
        <PersonList
          items={loadedPersons}
          onDeletePerson={personDeleteHandler}
        />
      )}
    </React.Fragment>
  );
};

export default Person;
