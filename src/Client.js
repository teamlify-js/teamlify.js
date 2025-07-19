import { Bot } from "./Bot.js";

class Client {
    constructor() {
        this.bot = new Bot();
    }

    on(event, listener) {
        this.bot.on(event, listener);
    }

    off(event, listener) {
        this.bot.off(event, listener);
    }

    once(event, listener) {
        this.bot.once(event, listener);
    }

    removeAllListeners(event) {
        this.bot.removeAllListeners(event);
    }

    async login(token) {
        if (!token) {
            throw new Error("Token is required for login.");
        }
        
        if (await this.bot.isActive()) {
            throw new Error("WebSocket is already connected.");
        }

        await this.bot.login(token);
    }

    async isActive() {
        return await this.bot.isActive();
    }

    async fetchChannels() {
        const botToken = this.bot.token;

    }
}

export { Client };