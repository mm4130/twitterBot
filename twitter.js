let defaults = require('./defaults.json');
let delay = require('delay');
let common = require('./methods/common');
let history = require(`./history.json`);

exports.rtDrops = async function (client)
{
	const query = '@cctip_io OR @coinkit_';
	let params =
	{
		q: query,
		count: 70,
		result_type: "recent"
	}
	client.get('search/tweets', params, function (error, tweets, response)
	{
		if (error)
		{
			console.log('Something Wrong With twitter API', error);
			return -3;
		}
		if (tweets.statuses.length == 0)
		{
			console.log('Nothings have found for query:', j);
			return -2;
		}
		console.log(tweets);
		tweets.statuses.forEach(async (element) =>
		{
			element.text = element.text.toLowerCase();
			if (!history[ element.user.screen_name ])
			{
				history[ element.user.screen_name ] = [];
			}
			if (
				(element.in_reply_to_status_id == null && element.in_reply_to_user_id == null)
				&& (history[ element.user.screen_name ].indexOf(element.id_str) == -1 && history[ element.user.screen_name ].indexOf(element.id.toString()) == -1)
				&& (element.text.indexOf('@cctip_io tip') == -1)
				&& (element.text.indexOf('@coinkit_ tip') == -1)
				&& (element.text.indexOf('@coinkit_ give') == -1)
				&& (element.text.indexOf('@coinkit_ give') == -1)
			)
			{
				// console.log('found one', element);
				console.log('found one', element.id, element.id_str, element.user.name, element.user.screen_name, element.text);
				// console.log(history[ element.user.screen_name ].indexOf(element.id_str));
				history[ element.user.screen_name ].push(element.id_str);
				history[ element.user.screen_name ].push(element.id.toString());
				await common.UpdateHistory(history, './history_mforgoodt.json');
				await delay(2000);

				client.post('favorites/create',
				{
					'id': element.id_str,
				},
				function (err, data, response)
				{
					if (err)
					{
						console.log('favorites/create', err);
					}
					client.post('statuses/retweet',
					{
						'id': element.id_str,
					},
					async function (err, data, response)
					{
						if (err)
						{
							console.log(err);
						}
						await common.UpdateHistory(history, './history_mforgoodt.json');
					});
				});
				await delay(2000);
			}
		});

	});

}
exports.timeline = async function (client)
{
	// let tmpID = '1265967903763050496';
	// client.get('statuses/show', {id: tmpID}, function (err, tweet, response)
	// {
	// 	if(err)
	// 	{
	// 		console.log(err);
	// 		return;
	// 	}
	// 	console.log('here we are' , tweet);
	// 	console.log('user_mentions', tweet.entities.user_mentions);
	// 	console.log('urls', tweet.entities.urls);
	// 	let tweets = [tweet];
	// 	tweets.forEach(async (element) =>
	// 	{
	client.get('statuses/home_timeline', {count: defaults.tweetsNumbers}, function (err, tweets, response)
	{
		if (err)
		{
			console.log(err);
			return;
		}
		tweets.forEach(async (element) =>
		{
			element.text = element.text.toLowerCase();
			if (!history[ element.user.screen_name ])
			{
				history[ element.user.screen_name ] = [];
			}
			if (
				(
					(
						(element.text.indexOf('giveaway') != -1 || element.text.indexOf('airdrop') != -1)
						&& (
							element.text.indexOf('bat') != -1 || element.text.indexOf('btc') != -1 || element.text.indexOf('eth') != -1
							|| element.text.indexOf('ethereum') != -1 || element.text.indexOf('libra') != -1 || element.text.indexOf('usp') != -1
							|| element.text.indexOf('tron') != -1 || element.text.indexOf('trx') != -1 || element.text.indexOf('doge') != -1
							|| element.text.indexOf('crypto') != -1
						)
						&& (element.text.indexOf('retweet') != -1 || element.text.indexOf('like') != -1
							|| element.text.indexOf('rt') != -1 || element.text.indexOf('follow') != -1
							|| element.text.indexOf('btc address') != -1)
					)
					|| (element.text.indexOf('@cctip_io') != -1 || element.text.indexOf('@coinkit_') != -1)
				)
				&& (element.in_reply_to_status_id == null && element.in_reply_to_user_id == null)
				&& (history[ element.user.screen_name ].indexOf(element.id_str) == -1 && history[ element.user.screen_name ].indexOf(element.id.toString()) == -1)
			)
			{
				// console.log('found one', element);
				console.log('found one', element.id, element.id_str, element.user.name, element.user.screen_name, element.text);
				// console.log(history[ element.user.screen_name ].indexOf(element.id_str));
				history[ element.user.screen_name ].push(element.id_str);
				history[ element.user.screen_name ].push(element.id.toString());
				await common.UpdateHistory(history, './history.json');
				await delay(2000);
				client.post('statuses/update',
					{
						'in_reply_to_status_id': element.id_str,
						auto_populate_reply_metadata: true,
						'status': `@${element.user.screen_name} @mlibreT @tootherworlds1
					eth: 0x14f735bF61fC2A8DbcC6b4F531F2Ad360bc9D36e
					btc: 3JfNjydkEgKGjsnrU1SoCCAv1q2yTuCoDY
					dogecoin: DPmPEiYdcaBDAGRRZfJ5buQvAJ6oyXGzKi
					trx: TD5whKyFHikDAZzLWD5ESB7w91i9Sideka`,
						username: `@${element.user.screen_name}`,
					},
					function (err, data, response)
					{
						if (err)
						{
							console.log(err);
						}
						client.post('favorites/create',
							{
								'id': element.id_str,
							},
							function (err, data, response)
							{
								if (err)
								{
									console.log('favorites/create', err);
								}
								client.post('statuses/retweet',
									{
										'id': element.id_str,
									},
									async function (err, data, response)
									{
										if (err)
										{
											console.log(err);
										}
										client.post('friendships/create',
											{
												user_id: element.user.id_str
											},
											async function (err, data, response)
											{
												if (err)
												{
													console.log('user friendships/create', err);
												}
												let followDone = 0;
												for (let index = 0;index < element.entities.user_mentions.length;index++)
												{
													client.post('friendships/create',
														{
															// screen_name: element.entities.user_mentions[index].screen_name,
															user_id: element.entities.user_mentions[ index ].id_str
															// follow: true
														},
														async function (err, data, response)
														{
															if (err)
															{
																console.log('friendships/create', err);
															}
															followDone++;
															if (followDone == element.entities.user_mentions.length)
															{
																////
															}
														});
												}
												await common.UpdateHistory(history, './history.json');
											});
									});
							});
					});
				await delay(2000);
			}
		});
	});

}