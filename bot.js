"use strict"
let twitter = require('./twitter');
let defaults = require('./defaults.json');
let Twit = require('twit');
let sec = require('./sec');
const commandLineArgs = require('command-line-args')
const optionDefinitions = [
	{name: 'rtDrops', alias: 'r', type: Boolean},
	{name: 'timeline', alias: 't', type: Boolean},
	{name: 'username', alias: 'u', type: String}
]
const options = commandLineArgs(optionDefinitions);
let fun;

try
{
	let client = new Twit(sec[options.username]);
	
	if(options.rtDrops)
	{
		fun = twitter.rtDrops;
	}
	if(options.timeline)
	{
		fun = twitter.timeline;
	}
	if (defaults.useExpress)
	{
		require('./methods/express')();
	}
	if (defaults.useCron)
	{
		let cron = require('./methods/cron');
		cron(function () {
			fun(client)
		});
	}
	if(defaults.runOnStart)
	{
		fun(client);
	}
}
catch (error)
{
	console.log(error);
	// process.exit(-2);
}
