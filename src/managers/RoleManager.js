import { Role } from "../schemas/Role.js";

class RoleManager {
    constructor(team, bot) {
        this.team = team;
        this.bot = bot;
    }

    async all() {
        const roles = await this.bot.api.fetch(`/teams/${this.team.id}/roles`);
        const rolesData = roles.roles.map(roleData => {
            const role = new Role({
                ...roleData,
                bot: this.bot
            });
            role.team = this.team; // Set the team reference
            role.bot = this.bot; // Set the bot reference
            return role;
        });
        return rolesData;
    }

    async get(id) {
        const roles = await this.bot.api.fetch(`/teams/${this.team.id}/roles`);
        const roleData = roles.roles.find(role => role.id === id);
        if (!roleData) {
            return null;
        }
        const role = new Role({
            ...roleData,
            bot: this.bot
        });
        role.team = this.team; // Set the team reference
        role.bot = this.bot; // Set the bot reference
        return role;
    }

    async create(name, permissions, color, color2 = null, isDisplayedSeparately = null) {
        const endpoint = `/teams/${this.team.id}/roles`;
        const data = {
            name,
            permissions,
            color,
            color2,
            isDisplayedSeparately
        };
        const response = await this.bot.api.fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        
        if (response.message) {
            throw new Error(response.message);
        }
        
        return new Role({
            ...response.role,
            bot: this.bot
        });
    }
}

export { RoleManager };