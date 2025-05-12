import tmi from 'tmi.js';
import fetch from 'node-fetch';
import chalk from 'chalk';
import config from './config.js';

// Cooldown system for shoutouts
const soCooldowns = {};
const cooldownDuration = 10 * 1000; // 10 seconds

const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: config.username,
    password: `oauth:${config.accessToken}`
  },
  channels: config.channels,
  connection: {
    secure: true,
    reconnect: true
  }
});

client.connect().catch(console.error);

// Log when connected
client.on('connected', (address, port) => {
  console.log(chalk.green(`? Connected to ${address}:${port}`));
  console.log(chalk.green(`? Joined channels: ${config.channels.join(', ')}`));
});

client.on('message', async (channel, tags, message, self) => {
  if (self) return; // Ignore bot's own messages

  const args = message.slice(1).split(' ');
  const command = args.shift()?.toLowerCase();

  // Random reaction if someone says the bot's name
  if (message.toLowerCase().includes('ruputron5000')) {
    client.say(channel, '*wag wag wag* OhMyDog');
  }

  if (!message.startsWith('!')) return; // Only react to commands

  // ---- 8ball Command ----
  const responses = [
    'You can bet your last beer on it!',
    'Yes! This is as certain as a stocked refrigerator!',
    'My sources say don\'t believe the hype!',
    'You may rely on it, like an old dog pissing on your carpet intermittently.',
    'Concentrate and ask again... THIS TIME WITH FEELING!',
    'Outlook not so good... Use a better email service :P',
    'It is decidedly so! *runs into wall*',
    'Better not tell you. You might not like what I have foreseen.',
    'Very doubtful. Maybe someday.',
    'Yes - Definitely! Google said so!',
    'It is certain! With a chance of some small meteorites.',
    'I chewed JFK\'s slippers...',
    'Ask again later. I\'m smoking a bong.',
    'No!',
    'Possibly if you concentrate hard enough.',
    'Don\'t count on it. It\'s not a Casio scientific calculator!',
    'No U!'
  ];

  if (command === '8ball') {
    if (args.length === 0) {
      client.say(channel, `How about asking me something, dumbass?!`);
    } else {
      const randomIndex = Math.floor(Math.random() * responses.length);
      client.say(channel, responses[randomIndex]);
    }
    return;
  }

  // ---- Other Fun Commands ----
  if (command === 'walk') {
    client.say(channel, '*woof woof* OhMyDog');
    return;
  }

  if (command === 'lurk') {
    client.say(channel, `${tags.username} dives into a nearby bush and peeks out inconspicuously!`);
    return;
  }

  if (command === 'unlurk') {
    client.say(channel, `${tags.username} falls out of the treeline looking suspicious and somehow wearing their clothes inside out!`);
    return;
  }

  if (command === 'wut') {
    for (let i = 0; i < 5; i++) {
      client.say(channel, `WutFace WutFace WutFace WutFace WutFace`);
    }
    return;
  }

  // ---- Shoutout Command (!so) ----
  if (command === 'so') {
    const now = Date.now();
    const userId = tags['user-id'];

    if (!userId) {
      console.error('User ID not found in tags!', tags);
      return;
    }

    const shoutoutUsername = args[0]?.toLowerCase();
    if (!shoutoutUsername) {
      client.say(channel, `Please provide a username to shout out! Example: !so <username>`);
      return;
    }

    try {
      const userResponse = await fetch(`https://api.twitch.tv/helix/users?login=${shoutoutUsername}`, {
        headers: {
          'Client-ID': config.clientId,
          'Authorization': `Bearer ${config.accessToken}`
        }
      });
      const userData = await userResponse.json();
      const userIdToShoutout = userData.data[0]?.id;

      if (!userIdToShoutout) {
        client.say(channel, `Could not find user ${shoutoutUsername}.`);
        return;
      }

      const channelResponse = await fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${userIdToShoutout}`, {
        headers: {
          'Client-ID': config.clientId,
          'Authorization': `Bearer ${config.accessToken}`
        }
      });
      const channelData = await channelResponse.json();
      const game = channelData.data[0]?.game_name || "an unknown game";

      client.say(channel, `Here's a link to someone's channel on Twitch: https://twitch.tv/${shoutoutUsername} — They were last seen playing ${game}! You can even follow them if you want!`);
    } catch (error) {
      console.error('Error fetching Twitch data:', error);
      client.say(channel, 'Something went wrong while fetching user data — Twitch might be having issues or the user does not exist.');
    }
    return;
  }
});
