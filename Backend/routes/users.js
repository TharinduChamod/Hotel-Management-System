const express = require('express');
const router = express.Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

// Route for user registration
router.post("/", async (req, res) => {
	try {

        // Validating the user
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

        // Check whether there is a user with same email address
		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

        // Creating Salt and has the password with that salt
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user
		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
        
		// Catch the error
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;