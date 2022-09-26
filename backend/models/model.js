const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ShareholderSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique: true,
  },
  Birthday: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  IdentityCard: {
    type: Number,
    required: true,
  },
  Ethnic: {
    type: String,
    required: true,
  },
  TypeOfEmployee: {
    type: String,
    required: true,
  },
  Earnings: {
    type: Number,
    required: true,
  },
});

let Users = mongoose.model("AccountUSers", userSchema);

let Shareholder = mongoose.model("Shareholders", ShareholderSchema);

module.exports = {
  Users,
  Shareholder,
};
