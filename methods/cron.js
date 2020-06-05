let defaults = require('../defaults.json');
var CronJob = require('cron').CronJob;
let colors = require('colors');
const random = require('random');

module.exports = function (cb)
{
	console.log(`App will run every ${defaults.cronEveryHour} hour`.yellow);
	var job = new CronJob(`*/${defaults.cronEveryMin} * * * *`, async function cl()
	// var job = new CronJob(`0 */${defaults.cronEveryHour} * * *`, async function cl()
	{
		if (typeof cl.counter == 'undefined')
		{
			cl.counter = 0;
			cl.dived = 0;
		}
		console.log(`Cron Running number: ${cl.counter++}`.yellow);
		if (random.int(1, defaults.botRunChance) == 1 && cl.counter != 1)
		{
			console.log(`Cron Dived ... ${cl.dived++}`.yellow);
			await cb();
		}
	}, null, true, 'Asia/Tehran');
	job.start();
}