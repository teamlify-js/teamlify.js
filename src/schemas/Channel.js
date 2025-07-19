import { parsePermissions } from "../utils/Permissions.js";
import { Message } from "./Message.js";

class Channel {
    id;
    type;
    teamId;
    name;
    description;
    createdBy;
    parentId;
    participants = [];
    priority = 0;
    rateLimitPerUser = 0;
    createdAt;
    permissions = [];
    additionalData = {};

    constructor(data = {}) {
        this.id = data.id || null;
        this.type = data.type || 'text'; // Default to 'text' channel
        this.teamId = data.teamId || null;
        this.name = data.name || '';
        this.description = data.description || '';
        this.createdBy = data.createdBy || null;
        this.parentId = data.parentId || null;
        this.participants = data.participants || [];
        this.priority = data.priority || 0;
        this.rateLimitPerUser = data.rateLimitPerUser || 0;
        this.createdAt = data.createdAt || new Date();
        this.permissions = parsePermissions(this.type, data.permissions || []);
        this.additionalData = data.additionalData || {};
        this.bot = data.bot || null;
    }

    async updateName(newName) {
        const response = await this.bot.api.fetch(`/teams/${this.teamId}/channels/${this.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ name: newName })
        });
        if (!response.success) {
            throw new Error(response.message || "Failed to update channel name");
        }
        this.name = newName;
        return true;
    }

    async clone() {
        const response = await this.bot.api.fetch(`/teams/${this.teamId}/channels/${this.id}/clone`, {
            method: 'POST'
        });
        if (!response.status) {
            throw new Error(response.message || "Failed to duplicate channel");
        }
        const newChannelData = response.channel;
        return new Channel({
            ...newChannelData,
            bot: this.bot
        });
    }

    async delete() {
        const response = await this.bot.api.fetch(`/teams/${this.teamId}/channels/${this.id}`, {
            method: 'DELETE'
        });
        if (!response.status) {
            throw new Error(response.message || "Failed to delete channel");
        }
        return true;
    }

    async startTyping() {
        if (this.bot.ws && this.bot.ws.readyState === WebSocket.OPEN) {
            this.bot.ws.send(JSON.stringify({ t: "CHANNEL_TYPING", d: { channelId: this.id, teamId: this.teamId } }));
        }
    }

    async sendMessage(message) {
        if (!this.bot || !this.bot.api) {
            throw new Error("Bot API is not available.");
        }
        const endpoint = `/channels/${this.id}/messages`;
        // delete undefined properties from message embed
        const messageBuild = message.build();
        if (messageBuild.embeds) {
            messageBuild.embeds = messageBuild.embeds.map(embed => {
                const cleanedEmbed = { ...embed };
                Object.keys(cleanedEmbed).forEach(key => {
                    if (cleanedEmbed[key] === undefined) {
                        delete cleanedEmbed[key];
                    }
                });
                return cleanedEmbed;
            });
        }
        if (!messageBuild.replyTo) {
            delete messageBuild.replyTo; // Remove replyTo if it's undefined
        }

        const response = await this.bot.api.fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(messageBuild)
        });
        if (!response.success) {
            throw new Error(response.message || "Failed to send message");
        }
        return new Message({
            ...response.message,
            bot: this.bot
        })
    }
}

export { Channel };