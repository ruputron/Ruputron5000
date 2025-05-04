// config.js
export default {
  identity: {
    username: 'your_bot_username', // The bot’s Twitch username
    password: 'oauth:your_oauth_token' // Generate at https://twitchapps.com/tmi/
  },
  channels: [
    'channel1', // Add each channel you want the bot to join
    'channel2'
  ],
  shoutoutPrefix: '!shoutout',
  eightBallPrefix: '!8ball'
};
