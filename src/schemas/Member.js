class Member {
    id;
    username;
    subdomain;
    profilePicture;
    banner;
    bot;
    presence = 0;
    flags;
    badges;
    userStatus = [];
    userRPC = [];
    createdAt;
    system = false;
    joinedAt;
    teamId;
    roles = [];

    constructor(data = {}) {
        this.id = data.id || null;
        this.username = data.username || '';
        this.subdomain = data.subdomain || '';
        this.profilePicture = data.profilePicture || '';
        this.banner = data.banner || '';
        this.bot = data.bot || false;
        this.presence = data.presence || 0;
        this.flags = data.flags || {};
        this.badges = data.badges || [];
        this.userStatus = data.userStatus || [];
        this.userRPC = data.userRPC || [];
        this.createdAt = data.createdAt || new Date();
        this.system = data.system || false;
        this.joinedAt = data.joinedAt || new Date();
        this.teamId = data.teamId || null; // Reference to the team this user belongs to
        this.roles = data.roles || []; // Array of role IDs or role objects associated with the user
        this.bot = data.bot || null; // Reference to the bot instance
    }

    async addRole(roleId) {
        await this.bot.api.fetch(`/teams/${this.teamId}/members/${this.id}/roles`, {
            method: 'POST',
            body: JSON.stringify({ roleId })
        });
        this.roles.push(roleId);
        return true;
    }

    async removeRole(roleId) {
        await this.bot.api.fetch(`/teams/${this.teamId}/members/${this.id}/roles/${roleId}`, {
            method: 'DELETE'
        });
        this.roles = this.roles.filter(role => role !== roleId);
        return true;
    }

    async kick() {
        await this.bot.api.fetch(`/teams/${this.teamId}/members/${this.id}`, {
            method: 'DELETE'
        });
        return true;
    }
}

export { Member };