let https = require('https');
let defaults = require('../defaults.json');
var express = require('express');

module.exports = function ()
{
	var app = express();
	let port = process.env.PORT || defaults.port;
	setInterval(function ()
	{
		try
		{
			https.get(defaults.herokoAppAddress);
		} catch (error)
		{
			console.log("Could not send the request", error);
		}
	}, 900000); // every 15 minutes (300000)

	app.get('/', (req, res) => res.send(new Date().toString()));
	app.listen(port, () => console.log(`Listening on port: ${port}!`));
}