import { TeamPermissions } from "../utils/Permissions.js";

class Role {
    id;
    teamId;
    name;
    iconUrl;
    color;
    color2;
    permissions;
    priority = 0;
    createdAt;
    updatedAt;
    isDisplayedSeparately = false;
    isSelfAssignable = false;
    iconEmojiId;
    mentionable = true;
    botScope = {
        userId: null
    }

    constructor(data = {}) {
        this.id = data.id || null;
        this.teamId = data.teamId || null;
        this.name = data.name || '';
        this.iconUrl = data.iconUrl || '';
        this.color = data.color || '';
        this.color2 = data.color2 || '';
        this.permissions = TeamPermissions.decode(data.permissions || 0);
        this.priority = data.priority || 0;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
        this.isDisplayedSeparately = data.isDisplayedSeparately || false;
        this.isSelfAssignable = data.isSelfAssignable || false;
        this.iconEmojiId = data.iconEmojiId || null;
        this.mentionable = data.mentionable !== undefined ? data.mentionable : true;
        this.botScope.userId = data.botScope?.userId || null;
        this.bot = data.bot || null; // Reference to the bot instance
    }

    async clone() {
        const response = await this.bot.api.fetch(`/teams/${this.teamId}/roles/${this.id}/clone`, {
            method: 'POST'
        });
        if (!response.status) {
            throw new Error(response.message || "Failed to clone role");
        }
        const newRoleData = response.role;
        return new Role({
            ...newRoleData,
            bot: this.bot
        });
    }

    async delete() {
        const response = await this.bot.api.fetch(`/teams/${this.teamId}/roles/${this.id}`, {
            method: 'DELETE'
        });
        if (!response.status) {
            throw new Error(response.message || "Failed to delete role");
        }
        return true;
    }

    async update(name = this.name, permissions = this.permissions, color = this.color, color2 = this.color2, isDisplayedSeparately = this.isDisplayedSeparately) {
        const response = await this.bot.api.fetch(`/teams/${this.teamId}/roles/${this.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                name,
                permissions: TeamPermissions.encode(permissions),
                color,
                color2,
                isDisplayedSeparately
            })
        });
        if (!response.status) {
            throw new Error(response.message || "Failed to update role");
        }
        this.name = name;
        this.permissions = permissions;
        this.color = color;
        this.color2 = color2;
        this.isDisplayedSeparately = isDisplayedSeparately;
        return true;
    }
}

export { Role };