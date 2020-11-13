import React, { useEffect, useState } from "react";
import { useForm } from "../../Shared/Hooks/formhook";
import Input from "../../Shared/FormElements/Input";
import { Button } from "react-bootstrap";
import { VALIDATOR_REQUIRE } from "../../Shared/FormElements/validator";
import { useParams, useHistory } from "react-router-dom";
import Errormsg from "../../Shared/FormElements/Errormsg";

import "./PersonForm.css";

const UpdatedPerson = () => {
  const personId = useParams().personId;

  const history = useHistory();

  const [loadedPerson, setLoadedPerson] = useState();
  const [error, setError] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      surname: {
        value: "",
        isValid: false,
      },
      city: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/person/${personId}`
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoadedPerson(responseData.person);

        setFormData(
          {
            name: {
              value: responseData.person.name,
              isValid: true,
            },
            surname: {
              value: responseData.person.surname,
              isValid: true,
            },
            city: {
              value: responseData.person.city,
              isValid: true,
            },
            address: {
              value: responseData.person.address,
              isValid: true,
            },
            phone: {
              value: responseData.person.phone,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPerson();
  }, [personId, setFormData]);

  const updatePersonSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/person/${personId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            surname: formState.inputs.surname.value,
            city: formState.inputs.city.value,
            address: formState.inputs.address.value,
            phone: formState.inputs.phone.value,
          }),
        }
      );
      const responseData = response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      history.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <React.Fragment>
      {loadedPerson && (
        <form className="person-form" onSubmit={updatePersonSubmitHandler}>
      <div className="center">
      {error && <Errormsg error={error} />}
      </div>
          <Input
            id="name"
            type="text"
            label="NAME"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
            initialValue={loadedPerson.name}
            initialValid={true}
          />
          <Input
            id="surname"
            label="SURNAME"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a surname."
            onInput={inputHandler}
            initialValue={loadedPerson.surname}
            initialValid={true}
          />
          <Input
            id="city"
            label="CITY"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a city."
            onInput={inputHandler}
            initialValue={loadedPerson.city}
            initialValid={true}
          />
          <Input
            id="address"
            label="ADDRESS"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter an address."
            onInput={inputHandler}
            initialValue={loadedPerson.address}
            initialValid={true}
          />
          <Input
            id="phone"
            label="PHONE"
            type="number"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a phone number."
            onInput={inputHandler}
            initialValue={loadedPerson.phone}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PERSON
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatedPerson;
