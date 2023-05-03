
# Play10

This is a discord bot to play music from Youtube, a feature that was removed from others bots during the great purge in 2021.


## Commands

- /join : make the bot join the voice channel
- /play : make the bot play the music specified in the url. If you try to play another music while one is already playing, it will place the music into the queue to be played next
- /next : play the next music in the queue
- /pause : pause the music
- /resume : resume the music
- /stop : stop the music and clear the queue
- /what : display the name of the music currently playing and the channel from where it came from
- /list : list the music in the queue
- /ping: the bot should respond "Pong!", just to test if the bot is working


## Acknowledgements

This bot is intended to be a private bot you can add to a server you own. You can copy and host it by yourself if you want.


## Deployment

### Step 1
Clone this repository.
### Step2
go inside the folder "Play10" and run ```npm install```
### Step 3
add a file to the folder "Play10" and call it ".env". Inside the file you should add your environnement variable like this:
```
BOT_TOKEN="your_bot_token"
CLIENT_ID="your_bot_client_id"
GUILD_ID="your_server_id"
```
the GUILD_ID is useful to import the commands to your server, if you don't care about that you can let it blank.

### Step 4
in a terminal, inside the "Play10" folder, run 

``` npm run deploy-commands ```.

This will import the commands to your server. Once again make sure that you have filled the GUILD_ID environnement variable from the previous step.

### Step 5 (Optional)
if you want to test the bot locally, run ``` npm run devStart ```. It will start the bot in your machine, and you can then play with it from your own discord server.

### That's it, you can now host your bot wherever you like. Feel free to make any change you like to it.
## Contributing

Any contribution to make the bot better is appreciated 😉.

