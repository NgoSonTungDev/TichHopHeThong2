const { Shareholder } = require("../models/model");
const request = require("request");

const ShareholderController = {
  addShareholder: async (req, res) => {
    const ShareholderID = await Shareholder.findOne({
      ShareholderID: req.body.ShareholderID,
    });
    if (ShareholderID) return res.status(400).json({ msg: "Đã tồn tại" });
    try {
      const newShareholder = new Shareholder(req.body);
      const saveShareholder = await newShareholder.save();
      return res.status(200).json(saveShareholder);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const allShareholder = await Shareholder.find();
      return res.status(200).json(allShareholder);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  GetAnShareholder: async (req, res) => {
    try {
      const Shareholders = await Shareholder.findById(req.params.id);
      res.status(200).json(Shareholders);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  UpdateShareholder: async (req, res) => {
    try {
      const ShareholderID = await Shareholder.findById(req.params.id);
      await ShareholderID.updateOne({ $set: req.body });
      res.status(200).json("Update Successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteShareholder: async (req, res) => {
    try {
      await Shareholder.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete Succesfully !!!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = ShareholderController;
