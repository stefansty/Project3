const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  createdDate: { type: Date, default: Date.now}
});

module.exports = mongoose.model("Persons", personSchema);
