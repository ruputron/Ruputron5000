# Ruputron5000

Ruputron5000 is a Twitch bot built with Node.js and `tmi.js`, designed for use across multiple Twitch channels. It features basic moderation tools and fun interactions like shoutouts and 8ball responses.

## ✨ Features

- Join multiple Twitch channels
- Shoutout users with `!shoutout`
- Magic 8ball responses with `!8ball`

## 🛠 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/Ruputron5000.git
cd Ruputron5000
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `config.js` file**

In the project root, create a `config.js` file (see [Configuration](#-configuration) below for the format).

4. **Start the bot**

```bash
npm start
```

## 🧾 Commands

| Command       | Description                                 |
|---------------|---------------------------------------------|
| `!shoutout`   | Shouts out a user (e.g., `!shoutout username`) |
| `!8ball`      | Returns a random 8ball-style prediction      |

*Only these two commands are currently implemented in code. You can expand the bot by editing `index.js`.*

## ⚙️ Configuration

Create a `config.js` file with the following format:

```js
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
```

> 🔐 **Keep your OAuth token private and secure!**

## 🧪 Example Usage

In a Twitch chat the bot has joined:

```
!shoutout anotherStreamer
!8ball Will I win the next game?
```

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

Copyright © 2024 rupu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
