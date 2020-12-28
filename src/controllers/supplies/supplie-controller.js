
const router = require("express").Router();
const createInsumo = require("./create-supplie");
const addQuantityInsumo = require('./supplie-add-quantit');
const suppliesRunningOut = require('./supplies-running-out');
const getSupplies = require('./get-supplies');
const deleteSupplie = require('./delete-supplie');
const outputSupplies = require('./output-supplies');
const searchSupplies = require("./search-supplies");


router.post("/create", (req,res) => createInsumo(req,res));
router.post("/search", (req,res) => searchSupplies(req,res));

router.patch("/add_quantity", (req,res) => addQuantityInsumo(req,res));
router.get("/running-out",(req,res)=> suppliesRunningOut(req,res));
router.delete("/delete/:id",(req,res)=> deleteSupplie(req,res));
router.get("/all",(req,res)=> getSupplies(req,res));
router.patch("/output",(req,res)=> outputSupplies(req,res));


module.exports = router;