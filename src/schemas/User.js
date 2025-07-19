class User {
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
    }
}

export { User };