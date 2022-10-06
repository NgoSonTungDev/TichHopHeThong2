const bcrypt = require("bcrypt");
const staff = require("../models/staff");
const { Op } = require("sequelize");

class StaffsControllers {
  async add(req, res) {
    try {
      await staff.create(req.body);
      res.send({ msg: "succesfully !!!" });
    } catch (err) {
      console.log(err);
    }
  }

  async update(req, res) {
    try {
      await staff.update(
        {
          Name: req.body.Name,
          IdentityCard: req.body.IdentityCard,
          IsShareholder: req.body.IsShareholder,
          Earnings: req.body.Earnings,
          DayOff: req.body.DayOff,
          PaidLastYear: req.body.PaidLastYear,
          PaidToCate: req.body.PaidToCate,
        },
        {
          where: {
            ShareholderID: req.params.id,
          },
        }
      );
      res.send({ msg: "succesfully !!!" });
    } catch (err) {
      console.log(err);
    }
  }

  async getAll(req, res) {
    try {
      const search = req.query.q;
      let page = 1;
      const limit = req.query.limit;
      page = (req.query.page - 1) * limit;
      if (search && limit) {
        const { count, rows } = await staff.findAndCountAll({
          limit: parseInt(limit),
          where: {
            account: { [Op.substring]: `${search}` },
          },
        });
        return res.json({ total: count, data: rows });
      }
      if (page && limit) {
        const { count, rows } = await staff.findAndCountAll({
          offset: parseInt(page),
          limit: parseInt(limit),
        });
        return res.json({ total: count, data: rows });
      }
      if (search) {
        const { count, rows } = await staff.findAndCountAll({
          offset: parseInt(page),
          limit: parseInt(limit),
          where: {
            account: { [Op.substring]: `${search}` },
          },
        });
        return res.json({ total: count, data: rows });
      }
      if (limit) {
        const { count, rows } = await staff.findAndCountAll({
          limit: parseInt(limit),
        });
        return res.json({ total: count, data: rows });
      } else {
        const { count, rows } = await staff.findAndCountAll();
        return res.json({ total: count, data: rows });
      }
    } catch (err) {
      console.log("lỗi");
    }
  }

  async delete(req, res) {
    try {
      await staff.destroy({
        where: {
          ShareholderID: req.params.id,
        },
      });
      res.send("succesfully !!!");
    } catch (err) {
      console.log("lỗi");
    }
  }
}

module.exports = new StaffsControllers();
