import { Constants } from "../Constants.js";
import { Channel } from "../schemas/Channel.js";

class ApiManager {
    constructor(bot) {
        this.bot = bot;
        this.baseUrl = Constants.API_URL;
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bot ${bot.token}`
        };
    }

    async fetch(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const response = await fetch(url, {
            ...options,
            headers: {
                ...this.headers,
                ...options.headers
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                message: errorData.message || "Unknown error occurred"
            };
        }
        
        const data = await response.json();
        return data;
    }

    async fetchChannels(teamId) {
        const endpoint = `/teams/${teamId}/channels`;
        const data = await this.fetch(endpoint);
        return data.channels;
    }

    async fetchChannel(teamId, channelId) {
        const channelsData = await this.fetchChannels(teamId);
        const channel = channelsData.find(c => c.id === channelId);
        if (!channel) {
            return null;
        }
        if (channel.name == "__PRIVATE_CHANNEL__") {
            return null;
        }
        return channel;
    }

    async fetchCategories(teamId) {
        const endpoint = `/teams/${teamId}/channels`;
        const data = await this.fetch(endpoint);
        return data.categories;
    }
}

export { ApiManager };