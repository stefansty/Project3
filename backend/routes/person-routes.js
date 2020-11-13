const express = require("express");

const personController = require("../controller/person-controller");

const router = express.Router();

router.get("/", personController.getPersons);

router.get("/:pid", personController.getPersonById);

router.post("/new", personController.createPerson);

router.patch("/:pid", personController.updatePerson);

router.delete("/:pid", personController.deletePerson);

module.exports = router;
