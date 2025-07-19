import { CategoryManager } from "../managers/CategoryManager.js";
import { ChannelManager } from "../managers/ChannelManager.js";
import { MemberManager } from "../managers/MemberManager.js";
import { RoleManager } from "../managers/RoleManager.js";
import { Category } from "./Category.js";
import { Channel } from "./Channel.js";

class Team {
    id;
    name;
    profilePicture;
    banner;
    description;
    isVerified;
    isSuspended;
    createdBy;
    defaultChannelId;
    games = [];
    isDiscoverable;
    discoverableInvite;
    createdAt;
    memberCount;
    bot;
    channels = [];
    categories = [];
    roles = [];
    members = [];

    constructor(data = {}) {
        this.id = data.id || null;
        this.name = data.name || '';
        this.profilePicture = data.profilePicture || '';
        this.banner = data.banner || '';
        this.description = data.description || '';
        this.isVerified = data.isVerified || false;
        this.isSuspended = data.isSuspended || false;
        this.createdBy = data.createdBy || null;
        this.defaultChannelId = data.defaultChannelId || null;
        this.games = data.games || [];
        this.isDiscoverable = data.isDiscoverable || false;
        this.discoverableInvite = data.discoverableInvite || '';
        this.createdAt = data.createdAt || new Date();
        this.memberCount = data.memberCount || 0;
        this.bot = data.bot || null; // Reference to the bot instance
        this.channels = new ChannelManager(this, data.bot);
        this.roles = new RoleManager(this, data.bot);
        this.categories = new CategoryManager(this, data.bot);
        this.members = new MemberManager(this, data.bot);
    }

    async updateName(newName) {
        const response = await this.bot.api.fetch(`/teams/${this.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ name: newName })
        });
        if (!response.status) {
            throw new Error(response.message || "Failed to update team name");
        }
        this.name = newName;
        return true;
    }

    async updateDescription(newDescription) {
        const response = await this.bot.api.fetch(`/teams/${this.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ description: newDescription })
        });
        if (!response.status) {
            throw new Error(response.message || "Failed to update team description");
        }
        this.description = newDescription;
        return true;
    }

    async updateProfilePicture(newPicture) {
        const response = await this.bot.api.fetch(`/teams/${this.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ profilePicture: newPicture })
        });
        if (!response.status) {
            throw new Error(response.message || "Failed to update team profile picture");
        }
        this.profilePicture = newPicture;
        return true;
    }

    async updateBanner(newBanner) {
        const response = await this.bot.api.fetch(`/teams/${this.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ banner: newBanner }) 
        });
        if (!response.status) {
            throw new Error(response.message || "Failed to update team banner");
        }
        this.banner = newBanner;
        return true;
    }

    async ban(userId, reason = null) {
        const response = await this.bot.api.fetch(`/teams/${this.id}/members/${userId}/ban`, {
            method: 'POST',
            body: JSON.stringify({ reason: reason })
        });
        if (!response.status) {
            throw new Error(response.message || "Failed to ban user from team");
        }
        return true;
    }

    async unban(userId) {
        const response = await this.bot.api.fetch(`/teams/${this.id}/members/${userId}/ban`, {
            method: 'DELETE'
        });
        if (!response.status) {
            throw new Error(response.message || "Failed to unban user from team");
        }
        return true;
    }

    async bans(limit = 1000) {
        const response = await this.bot.api.fetch(`/teams/${this.id}/bans`, {
            body: JSON.stringify({
                limit: limit
            })
        });
        if (!response.status) {
            throw new Error(response.message || "Failed to fetch team bans");
        }
        return response.bans.map(ban => ({
            userId: ban.userId,
            reason: ban.reason,
            bannedAt: new Date(ban.bannedAt)
        }));
    }
}

export { Team };