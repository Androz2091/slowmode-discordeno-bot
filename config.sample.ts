export default {
	"token": "YOUR_DISCORD_BOT_TOKEN",
	"botID": "YOUR_DISCORD_BOT_ID",
	"locale": "en",
	"messages": {
			"wait": "You need to wait **{{time}}** before being able to send a new message!",
			"waitMP": "Hello {{user}}! You're cooldowned in {{channel}}! You will be able to send a message **{{time}}**!"
	},
	"slowmodes": [
			{
					"channelID": "ID of your channel",
					"slowmodes": [
							{
									"roleID": "ID of your role",
									"time": "3h"
							},
							{
									"roleID": "ID of your role",
									"time": "12min"
							},
							{
									"roleID": "ID of your role",
									"time": "10s"
							}
					]
			},
			{
					"channelID": "ID of your channel",
					"slowmodes": [
							{
									"roleID": "ID of your role",
									"time": "10s"
							}
					]
			}
	]
}
