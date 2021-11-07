var express = require("express");
var app = express();
require("dotenv").config();

console.log("Hello World");

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

app.use(express.static(__dirname + "/public"));

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
	var response = "Hello json".toUpperCase();

	if (process.env.VAR_NAME === "uppercase") {
		response = "Hello josn".toUpperCase();
	} else {
		response = "Hello json";
	}
	res.json({
		message: response,
	});
});

module.exports = app;
