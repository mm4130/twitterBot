:blush: :robot: twitter.com Bot :robot: :blush:
---
Simple twitter bot, joining giveaways, liking and more ....
Features:
* Auto Commenting
* Auto Posting
* Automatic liking
* Auto retweet
* Autorun
* Scheduling
* And More

# Requirements
* NodeJs
* Linux Probably

# Up & Running
~~~bash
sudo pacman -S nodejs google-chrome build-essential make g++
git clone https://github.com/mlibre/twitter_bot.git
npm install
# npm rebuild
nano defaults.json # set botRunChance and runOnStart and mostTrustedUsers and other options
# Now you need to define your users.
# for each user u need to create a folder like users/USERNAME in the users folder. And set the user account settings
~~~
## Running
To run as a single bot - account:
~~~bash
node twitter.js
~~~

# Heroku
```bash
# "engines": {
#   "node": "latest",
#   "npm": "latest"
# },
# sudo rm -r .git
# heroku buildpacks:clear
# heroku git:remote -a twittergiveawaybot
# heroku ps:scale web=1
# heroku restart
# heroku apps:destroy twittergiveawaybot
rm package-lock.json
heroku login -i
heroku create twittergiveawaybot
git add --all
git commit -m "first message"
heroku buildpacks:add --index 1 heroku/nodejs
git push heroku master
heroku logs --tail
heroku run bash
mv history.json his.json
heroku ps:copy history.json
```

# Configuration
* `defaults.json`.
* `sec/json`.

### Important Global options
```javascript
	"cronEveryHour": 1,
```

Donate
=======
Donate or .... :heartpulse:
ETH:
> 0xc9b64496986E7b6D4A68fDF69eF132A35e91838e
