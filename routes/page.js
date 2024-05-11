const express = require("express");

const { page_s1 } = require('../views/page_s1');
const { inbound_tourism_arrivals } = require('../util/inbound_tourism_arrivals');

const router = express.Router();

router.get("/stage1", page_s1);

router.get("/all", async (req, res, next) => {
    const a = await inbound_tourism_arrivals();
    return res.status(200).json(a)
});

module.exports = router;