const express = require("express");
const router = express.Router();
const { pool } = require("../data/dbinfo");
const sql = require("mssql");

const ShareholderController = {
  getAllShareholder: async (req, res) => {
    try {
      await pool.connect();
      const result = await pool.request().query("select * from Shareholder");
      const data = result.recordset;
      res.json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addShareholder: async (req, res) => {
    try {
      await pool.connect();
      let shareholder = { ...req.body };
      let insert = await pool
        .request()
        .input("ShareholderID", sql.Int, shareholder.ShareholderID)
        .input(
          "NameShareholder",
          sql.NVarChar(100),
          shareholder.NameShareholder
        )
        .input("IdentityCard", sql.Int, shareholder.IdentityCard)
        .input("Birthday", sql.NVarChar(100), shareholder.Birthday)
        .input("Gender", sql.NVarChar(10), shareholder.Gender)
        .input("Ethnic", sql.NVarChar(10), shareholder.Ethnic)
        .input("TypeOfEmployee", sql.NVarChar(10), shareholder.TypeOfEmployee)
        .query(
          "insert into Shareholder (ShareholderID , NameShareholder,IdentityCard,Birthday,Gender,Ethnic,TypeOfEmployee) values (@ShareholderID,@NameShareholder,@IdentityCard,@Birthday,@Gender,@Ethnic,@TypeOfEmployee)"
        );
      res.json("insert successfullly");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteShareholder: async (req, res) => {
    try {
      const ShareholderID = req.params.id;
      await pool.connect();
      const result = await pool
        .request()
        .query(`delete Shareholder where ShareholderID=${ShareholderID}`);
      res.json("delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = ShareholderController;
