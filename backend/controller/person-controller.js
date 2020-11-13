const HttpError = require("../models/http-error");

const Person = require("../models/person");

const getPersons = async (req, res, next) => {
  let persons;
  try {
    persons = await Person.find();
  } catch (err) {
    new HttpError("Could not find the person", 500);
    return next(error);
  }
  if (!persons) {
    const error = new HttpError("Could not find persons.", 404);
    return next(error);
  }

  res.json({
    persons: persons.map((person) => person.toObject({ getters: true })),
  });
};

const getPersonById = async (req, res, next) => {
  const personId = req.params.pid;

  let person;
  try {
    person = await Person.findById(personId);
  } catch (err) {
    const error = new HttpError("Could not find the person", 500);
    return next(error);
  }

  if (!person) {
    const error = new HttpError(
      "Could not find the person for the provided id",
      404
    );
    return next(error);
  }
  res.json({ person: person.toObject({ getters: true }) });
};

const createPerson = async (req, res, next) => {
  const { name, surname, city, address, phone, createdDate } = req.body;


  const createdPerson = new Person({
    name,
    surname,
    city,
    address,
    phone,
    createdDate
  });

  try {
    await createdPerson.save();
  } catch (err) {
    const error = new HttpError("Creating person failed.", 500);
    return next(error);
  }
  res.status(201).json({ person: createdPerson });
};

const updatePerson = async (req, res, next) => {
  const { name, surname, city, address, phone } = req.body;
  const personId = req.params.pid;

  let updatedPerson;
  try {
    updatedPerson = await Person.findById(personId);
  } catch (err) {
    const error = new HttpError("Could not find the person", 500);
    return next(error);
  }

  updatedPerson.name = name;
  updatedPerson.surname = surname;
  updatedPerson.city = city;
  updatedPerson.address = address;
  updatedPerson.phone = phone;

  try {
    await updatedPerson.save();
  } catch (err) {
    const error = new HttpError("Could not save the person", 500);
    return next(error);
  }

  res.status(200).json({ person: updatedPerson.toObject({ getters: true }) });
};

const deletePerson = async (req, res, next) => {
  const personId = req.params.pid;

  let deletedPerson;
  try {
    deletedPerson = await Person.findById(personId);
  } catch (err) {
    const error = new HttpError("Could not delete the person", 500);
    return next(error);
  }

  try {
    deletedPerson.remove();
  } catch (err) {
    const error = new HttpError("Could not delete the person", 500);
    return next(error);
  }

  res.status(200).json({ message: "Deleted person" });
};

exports.getPersons = getPersons;
exports.getPersonById = getPersonById;
exports.createPerson = createPerson;
exports.updatePerson = updatePerson;
exports.deletePerson = deletePerson;
