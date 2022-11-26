// Déclarer toute les variables importantes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { type } = require('node:os');


// Déclare les Intents
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Code Qui Permet D'enregister les slash commands
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}


// Bout de code qui permet déclarer le statut du bot et son username.
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
	// client.user.setPresence('WATCHING')
    client.user.setActivity("la version 0.0.3")
    client.user.setStatus("dnd");
})

client.once(Events.ClientReady, () => {
	// console.log('Ready!');
});


// Bout de code qui permet de retourner une erreur lors ce que une commande est mal écrite dans le code.
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Une erreur s\'est produite.', ephemeral: true });
	}
});


// Connecte le bot à Discord avec le const { token }.
client.login(token);