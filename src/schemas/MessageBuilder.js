import { ChannelTypes } from "../utils/ChannelTypes.js";

class MessageBuilder {
    channelId;
    content;
    attachments = [];
    embeds = [];
    replyTo = null;
    mentions = {
        users: []
    }

    constructor(data = {}) {
        this.content = data.content || '';
        this.attachments = data.attachments || [];
        this.embeds = data.embeds || [];
        this.replyTo = data.replyTo || null;
        this.mentions = data.mentions || { users: [] };

        this.bot = data.bot || null; // Reference to the bot instance
    }

    setChannelId(channelId) {
        this.channelId = channelId;
        return this;
    }

    setContent(content) {
        this.content = content;
        return this;
    }

    addEmbed(...embed) {
        this.embeds.push(...embed.map(e => e.build()));
        return this;
    }

    addAttachment(url, name, size) {
        this.attachments.push({
            url: url,
            name: name,
            size: size
        });
        return this;
    }

    setReplyTo(messageId) {
        this.replyTo = messageId;
        return this;
    }

    addMention(userId) {
        if (!this.mentions) {
            this.mentions = {
                users: []
            };
        }
        this.mentions.users.push(userId);
        return this;
    }

    build() {
        return {
            content: this.content,
            attachments: this.attachments,
            embeds: this.embeds,
            replyTo: this.replyTo,
            mentions: this.mentions
        };
    }
}

export { MessageBuilder };