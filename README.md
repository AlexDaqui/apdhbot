# About apdhbot

Bot for discord. You can create your own bot by looking at the example. You can see all the notices in [APDH](https://www.apdh.es/).
I use the library [Discord.js](https://discord.js.org/#/docs/main/stable/general/welcome)

# Installation

This bot is uploaded on [Heroku](https://discord.com/api/oauth2/authorize?client_id=569822793798123531&permissions=1576500343&scope=bot).
You must create 2 profile moderators, administrator and a welcome channel.

Allow commands:

- Everyone: me _Alias_, role _NameRole_
- Moderator: warn _@name_, kick _@name_, clear _qty message_, mute _@name_ _optional minutes(integer): X_, unmute _@name_
- Administrator: ban _@name_, unban _@name_

**Note: All commands must have prefix. You configurate token and your prefix in utils/config.json**

```
{
  "prefix" : "a!",//customized prefix
  "token" : "Your_Key",
  "channel": "waiting-area"//welcome channel
 }
```

## Help

If you are interested in helping me , please visit the Paypal [Donate](https://www.paypal.me/AlexD487).

## Security Vulnerabilities

If you discover a security vulnerability within this extensions, please send an e-mail to Alex Daqui via [apdh92@hotmail.com](mailto:apdh92@hotmail.com). All security vulnerabilities will be promptly addressed.
