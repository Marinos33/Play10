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

<<<<<<< Updated upstream
### Step 1
Clone this repository.
### Step2
go inside the folder "Play10" and run ```npm install```
### Step 3
add a file to the folder "Play10" and call it ".env". Inside the file you should add your environnement variable like this:
=======
Neither of these solution provide the ".env" file required to run the bot. You have to either create the file at the root of the project folder and add these lines:

>>>>>>> Stashed changes
```
BOT_TOKEN="your_bot_token"
CLIENT_ID="your_bot_client_id"
GUILD_ID="your_server_id"
```
<<<<<<< Updated upstream
the GUILD_ID is useful to import the commands to your server, if you don't care about that you can let it blank.

### Step 4
in a terminal, inside the "Play10" folder, run 
=======

or manually input the variables in the run command or the compose file (discouraged for security reasons).

Notes:

- both "BOT_TOKEN" and "CLIENT_ID" are rquired and can be found in at "https://discord.com/developers/applications/$CLIENT_ID$"
- the GUILD_ID is used to import the commands to your server and is optional, but recommended.

- You also need to add a file named cookies.json at the root of the project folder. It should be a json with all the cookies from your youtube account so the bot can be identified as user otherwise it wont works. You may need to change them from time to time.

### Docker deployment by pulling the image from Dockerhub with "docker-compose.yml"

Use the "docker-compose.yml" to deploy the container. This will, by default:

- pull the latest version of the bot
- name the container "play10"
- automatically restart the container, unless stopped manually
- expose port 3000 both externally and internally (3000:3000)
- seek the environment variable in the ".env" file
- create a volume to store the commands logs (content can be found by default at "/var/lib/docker/volumes/play10_logs/\_data")
  If you deploy the container using an external too (such as Portainer stack, etc), make sure to upload the ".env" file to the stack

#### Docker deployment by building locally

1: copy the project folder to "/usr/src/app/Play10" (or any other folder of your choice)
2: `cd "/usr/src/app/Play10"`
3: `docker build -t unlimitedrulebook/play10:latest ./`
4: run the container via the compose file provided: `docker-compose -f docker-compose.yml up`

### Manual deployment

1: Clone this repository.
2: go inside the folder "Play10" and run `npm install`
3: make sure to have the ".env" file created and filled with the correct informations
4: in the terminal, inside the "Play10" folder, run
>>>>>>> Stashed changes

`npm run deploy-commands`.

<<<<<<< Updated upstream
This will import the commands to your server. Once again make sure that you have filled the GUILD_ID environnement variable from the previous step.
=======
This will import the commands to your server. Once again, make sure that you have filled the GUILD_ID environment variable from the previous step.
5: (optional) if you want to test the bot locally, run `npm run devStart`. It will start the bot in your machine, and you can then play with it from your own discord server.
>>>>>>> Stashed changes

### Step 5 (Optional)
if you want to test the bot locally, run ``` npm run devStart ```. It will start the bot in your machine, and you can then play with it from your own discord server.

### That's it, you can now host your bot wherever you like. Feel free to make any change you like to it.
## Contributing

Any contribution to make the bot better is appreciated 😉.
