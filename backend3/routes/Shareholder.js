const ShareholderController = require("../controllers/ShareholderController")
const router = require("express").Router();

router.get("/all-shareholder",ShareholderController.getAllShareholder)
router.post("/add-shareholder",ShareholderController.addShareholder)
router.put("/update-shareholder/:id",ShareholderController.UpdateShareholder)
router.delete("/delete/:id",ShareholderController.deleteShareholder)

module.exports = router