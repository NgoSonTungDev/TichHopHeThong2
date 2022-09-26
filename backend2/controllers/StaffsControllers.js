const bcrypt = require("bcrypt");
const staff = require("../models/staff");
const { Op } = require("sequelize");

class StaffsControllers {
  // [GET] /users ?search?page?limit
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
        return  res.json({ total: count, data: rows });
      }
      if (limit) {
        const { count, rows } = await staff.findAndCountAll({
          limit: parseInt(limit),
        });
        return  res.json({ total: count, data: rows });
      } else {
        const { count, rows } = await staff.findAndCountAll();
        return res.json({ total: count, data: rows });
      }
    } catch (err) {
      console.log("lỗi");
    }
  }
  // [GET] /users
  async get(req, res) {
    try {
      const users = await staff.findAll({
        where: {
          id: req.params.id,
        },
      });
      res.json(users);
    } catch (err) {
      console.log("lỗi");
    }
  }
  // [DELETE] /users/id
  async delete(req, res) {
    try {
      await staff.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send("succesfully !!!");
    } catch (err) {
      console.log("lỗi");
    }
  }

  // [POST] /register
  async add(req, res) {
    try {
      await staff.create(req.body);
      res.send({ msg: "succesfully !!!" });
    } catch (err) {
      console.log(err);
    }
  }

}

module.exports = new StaffsControllers();
