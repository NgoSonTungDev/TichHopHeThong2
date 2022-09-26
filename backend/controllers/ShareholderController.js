const { Shareholder } = require("../models/model");

const ShareholderController = {
  addShareholder: async (req, res) => {
    try {
      const newShareholder = new Shareholder(req.body);
      const saveShareholder = await newShareholder.save();
      res.status(200).json(saveShareholder);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const allShareholder = await Shareholder.find();
      res.status(200).json(allShareholder);
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
  functionShareholder: async (req, res) => {
    try {
      // START REGION
      var productName = req.query?.name;
      var page = req.query?.page;

      if (productName) {
        var condition = productName
          ? { NameProduct: { $regex: new RegExp(productName), $options: "i" } }
          : {};

        Shareholder.find(condition)
          .then((data) => {
            return res.status(200).json(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving shareholder.",
            });
          });
      }

      // END REGION

      if (page) {
        page = parseInt(page);
        var SkipNumber = (page - 1) * 6;
        const result = await Shareholder.find().skip(SkipNumber).limit(6);
        return res.status(200).json(result);
      }

      // END REGION
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = ShareholderController;
