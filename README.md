## About
It is a powerful [Node.js](https://nodejs.org/en) module that allows you to easily interact with the [Teamly API](https://docs.teamly.one/).
Module supports every events, schemas on API

✅ Channels
✅ Categories
✅ Messages
✅ Message Embeds
✅ Teams
✅ Roles
✅ Users
✅ Presence
✅ Typing
⏳ Webhooks
❌ Todos
❌ Direct Messages
❌ Applications
❌ Reactions
❌ Blog
❌ Announcements


## Examples
```js
import { Client, Events, MessageBuilder, MessageEmbed, Presence } from "teamlify.js";

const client = new Client();

client.on(Events.READY, async () => {
    console.log("Client is ready!");
    client.bot.presence = Presence.BUSY;
    const team = await client.bot.teams.get("fbea01647a2e2704");
    const channel = await team.channels.get("9842293c6cdcfa28");
    const messageBuilder = new MessageBuilder()
        .setContent("Hello, this is a test message!")
        .addEmbed(new MessageEmbed()
            .setTitle("Test Embed")
            .setDescription("This is a description of the embed.")
            .setColor("#FF5733")
            .setAuthor("Author Name", "https://cdn.teamly.one/userAvatar/be132efd-ddd7-413a-840a-5c2c840cd700.webp")
            .setUrl("https://example.com")
            .setThumbnail("https://cdn.teamly.one/userAvatar/be132efd-ddd7-413a-840a-5c2c840cd700.webp")
            .setFooter("Footer text", "https://cdn.teamly.one/userAvatar/be132efd-ddd7-413a-840a-5c2c840cd700.webp"));
    channel.sendMessage(messageBuilder)
});

client.on(Events.MESSAGE_SEND, async (data) => {
    if (data.message.createdBy.bot) return; // Ignore messages sent by the bot itself
    if (data.message.createdBy.id == client.bot.id) return; // Ignore messages sent by the bot itself
    if (!data.message.content.startsWith("!")) return; // Ignore messages that do not start with "!"
    const args = data.message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    await data.channel.startTyping(); // Start typing indicator

    switch (command) {
        case "ping":
            data.channel.sendMessage(new MessageBuilder().setContent(`Pong! <@${data.message.createdBy.id}>`));
            break;
        case "reply":
            data.message.reply(new MessageBuilder().setContent("This is a reply to your message!"));
            break;
        // Add more commands as needed
    }
});

client.on(Events.PRESENCE_UPDATE, (data) => {
    console.log("Presence updated:", data.userId == client.bot.id ? "Self" : data.userId, Presence.toString(data.presence));
});

client.on(Events.ERROR, (error) => {
    console.error("An error occurred:", error);
});

client.login("tly_0139e37bfcd4f3cd.mcuu4yuf.s3sx07kqthnliggo.1v6");
```
