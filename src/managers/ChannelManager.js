import { Channel } from "../schemas/Channel.js";

class ChannelManager {
    constructor(team, bot) {
        this.team = team;
        this.bot = bot;
    }

    async all() {
        const channelsData = await this.bot.api.fetchChannels(this.team.id);
        const channels = channelsData.map(data => new Channel({
            ...data,
            bot: this.bot
        }));
        return channels;
    }

    async get(id) {
        const channelData = await this.bot.api.fetchChannels(this.team.id);
        const channelFind = channelData.find(c => c.id === id);
        if (!channelFind) {
            return null;
        }
        // Assuming Channel constructor accepts an object with channel data
        const channel = new Channel({
            ...channelFind,
            bot: this.bot
        });
        // If the Channel class has additional properties or methods, you can set them here
        channel.team = this.team; // Set the team reference
        channel.bot = this.bot; // Set the bot reference
        // Return the channel instance
        return channel;
    }

    async create(name, type, options = {}) {
        const endpoint = `/teams/${this.team.id}/channels`;
        const data = {
            name,
            type,
            ...options
        };
        const response = await this.bot.api.fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        
        if (response.message) {
            throw new Error(response.message);
        }
        
        return new Channel({
            ...response.channel,
            bot: this.bot
        });
    }
}

export { ChannelManager };