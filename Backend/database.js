// Connecting to the database
const mongoose = require("mongoose");

module.exports = () => {
	const connectionParams = {
        // These Parameters are depreciated
		// useNewUrlParser: true,
		// useUnifiedTopology: true,
	};
	try {
		mongoose.connect(process.env.DB_URL, connectionParams);
		mongoose.connection.useDb("B2-Database");
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};