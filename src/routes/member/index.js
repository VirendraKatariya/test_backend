// @ts-check

const router = require("express").Router();

// * Helpers
const catchAsync = require("../../helpers/catchAsync");
const prisma = require("../../helpers/prisma");

/**
 * @desc Get All Members
 */
router.get(
	"/",
	catchAsync(async (req, res) => {
		const members = await prisma.member.findMany({});

		if (!members)
			return res.status(404).json({
				msg: `Members Not Found`,
				data: {},
			});

		res.status(200).json({
			msg: `All Members`,
			data: members,
		});
	})
);

module.exports = router;
