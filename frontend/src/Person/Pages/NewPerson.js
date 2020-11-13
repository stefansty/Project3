import React, { useState } from "react";
import Input from "../../Shared/FormElements/Input";
import { Button } from "react-bootstrap";
import { VALIDATOR_REQUIRE } from "../../Shared/FormElements/validator";
import { useForm } from "../../Shared/Hooks/formhook";
import { useHistory } from "react-router-dom";
import Errormsg from "../../Shared/FormElements/Errormsg";

import "./PersonForm.css";

const NewPerson = () => {
  const [error, setError] = useState();

  const history = useHistory();

  const [formState, inputHandler] = useForm(
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

  const personSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/person/new", {
        method: "POST",
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
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      history.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="person-form" onSubmit={personSubmitHandler}>
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
      />
      <Input
        id="surname"
        label="SURNAME"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a surname."
        onInput={inputHandler}
      />
      <Input
        id="city"
        label="CITY"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a city."
        onInput={inputHandler}
      />
      <Input
        id="address"
        label="ADDRESS"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter an address."
        onInput={inputHandler}
      />
      <Input
        id="phone"
        label="PHONE"
        type="number"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a phone number."
        onInput={inputHandler}
      />

      <Button type="submit" disabled={!formState.isValid}>
        ADD PERSON
      </Button>
    </form>
  );
};

export default NewPerson;
