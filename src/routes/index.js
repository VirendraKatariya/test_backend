const router = require("express").Router();

router.get("/", (req, res) => {
	res.status(200).json({ msg: `API is working fine` });
});

router.use("/member", require("./member"));

module.exports = router;
