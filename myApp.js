var express = require("express");
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

console.log("Hello World");

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

app.use(function (req, res, next) {
	console.log(req.method + " " + req.path + " - " + req.ip);
	next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/json", (req, res) => {
	const mySecret = process.env["MESSAGE_STYLE"];
	if (mySecret === "uppercase") {
		res.json({
			message: "HELLO JSON",
		});
	} else {
		res.json({
			message: "Hello json",
		});
	}
});

app.use(function middleware(req, res, next) {
	var string = req.method + " " + req.path + " - " + req.ip;
	console.log(string);
	next();
});

app.get(
	"/now",
	(req, res, next) => {
		req.time = new Date().toString();
		next();
	},
	(req, res) => {
		res.send({
			time: req.time,
		});
	}
);

app.get("/:word/echo", (req, res) => {
	const { word } = req.params;
	res.json({
		echo: word,
	});
});

app.get("/name", (req, res) => {
	var firstName = req.query.first;
	var lastName = req.query.last;

	res.json({
		name: `${firstName} ${lastName}`,
	});
});

app.post("/name", function (req, res) {
	var string = req.body.first + " " + req.body.last;
	res.json({ name: string });
});


module.exports = app;
