const { Users } = require("../models/model");
const bcrypt = require("bcrypt");

const userController = {
  getAllUser: async (req, res) => {
    try {
      const allUSer = await Users.find();
      res.status(200).json(allUSer);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAnUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id)
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateUser: async (req, res) => {
    console.log("er",req.body);
    try {
      const user = await Users.findById(req.params.id);
      await user.updateOne({ $set: req.body });
      res.status(200).json("Update Successfully !");
    } catch (error) {
      console.log("err" , error);
      res.status(500).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await Users.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete Successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
