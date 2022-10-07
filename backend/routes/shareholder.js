const ShareholderController = require("../controllers/ShareholderController")
const router = require("express").Router();

router.post("/add",ShareholderController.addShareholder)
router.get("/all",ShareholderController.getAll)
router.get("/:id",ShareholderController.GetAnShareholder)
router.put("/:id",ShareholderController.UpdateShareholder)
router.delete("/:id",ShareholderController.deleteShareholder)

module.exports = router