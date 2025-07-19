import { ChannelTypes } from "../utils/ChannelTypes.js";

class Message {
    id;
    channelId;
    type;
    content;
    attachments = [];
    createdBy;
    editedAt;
    replyTo;
    embeds = [];
    emojis = [];
    reactions = [];
    nonce = null;
    createdAt;
    mentions = [];

    constructor(data = {}) {
        this.id = data.id || null;
        this.channelId = data.channelId || null;
        this.type = ChannelTypes.fromString(data.type) || ChannelTypes.TEXT; // Default to 'text' message
        this.content = data.content || '';
        this.attachments = data.attachments || [];
        this.createdBy = data.createdBy || null;
        this.editedAt = data.editedAt || null;
        this.replyTo = data.replyTo || null;
        this.embeds = data.embeds || [];
        this.emojis = data.emojis || [];
        this.reactions = data.reactions || [];
        this.nonce = data.nonce || null;
        this.createdAt = data.createdAt || new Date();
        this.mentions = data.mentions || [];
        this.bot = data.bot || null; // Reference to the bot instance
    }
}

export { Message };