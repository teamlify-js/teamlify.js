import { parsePermissions } from "../utils/Permissions.js";
import { Channel } from "./Channel.js";

class Category {
    id;
    teamId;
    name;
    createdBy;
    priority = 0;
    permissions = [];
    createdAt;
    editedAt;

    constructor(data = {}) {
        this.id = data.id || null;
        this.teamId = data.teamId || null;
        this.name = data.name || '';
        this.createdBy = data.createdBy || null;
        this.priority = data.priority || 0;
        this.permissions = parsePermissions(null, data.permissions || []);
        this.createdAt = data.createdAt || new Date();
        this.editedAt = data.editedAt || new Date();
    }

    async updateName(newName) {
        const response = await this.bot.api.fetch(`/teams/${this.teamId}/categories/${this.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ name: newName })
        });
        if (!response.status) {
            throw new Error(response.message || "Failed to update category name");
        }
        this.name = newName;
        return true;
    }

    async updateRole(roleId, allow, deny) {
        const response = await this.bot.api.fetch(`/teams/${this.teamId}/categories/${this.id}/roles/${roleId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                allow: allow || 0,
                deny: deny || 0
            })
        });
        if (!response.status) {
            throw new Error(response.message || "Failed to update category role permissions");
        }
        this.permissions = parsePermissions(null, response.permissions || []);
        return true;
    }

    async delete() {
        const response = await this.bot.api.fetch(`/teams/${this.teamId}/categories/${this.id}`, {
            method: 'DELETE'
        });
        if (!response.status) {
            throw new Error(response.message || "Failed to delete category");
        }
        return true;
    }

    async addChannel(channelId) {
        const response = await this.bot.api.fetch(`/teams/${this.teamId}/categories/${this.id}/channels/${channelId}`, {
            method: 'POST',
        });
        if (!response.status) {
            throw new Error(response.message || "Failed to add channel to category");
        }
        return new Channel({
            ...response.channel,
            bot: this.bot
        });
    }

    async removeChannel(channelId) {
        const response = await this.bot.api.fetch(`/teams/${this.teamId}/categories/${this.id}/channels/${channelId}`, {
            method: 'DELETE'
        });
        if (!response.status) {
            throw new Error(response.message || "Failed to remove channel from category");
        }
        return new Channel({
            ...response.channel,
            bot: this.bot
        });
    }
}

export { Category };