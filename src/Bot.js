import WebSocket from 'ws';
import { Events } from './utils/Events.js';
import { TEventEmitter } from './utils/TEventEmitter.js';
import { Team } from './schemas/Team.js';
import { Presence } from './utils/Presence.js';
import { Constants } from './Constants.js';
import { ApiManager } from './managers/ApiManager.js';
import { TeamManager } from './managers/TeamManager.js';

class Bot extends TEventEmitter {
    id;
    username;
    subdomain;
    verified;
    profilePicture;
    banner;
    disabled;
    _presence;
    badges = [];
    flags = '0';
    createdAt;
    lastOnline;
    userStatus = {};
    privateFlags = '0';
    teams = [];
    token;

    heartbeatTime = 30 * 1000; // 30 seconds

    constructor() {
        super();
        this.ws = null;
    }

    startHeartbeat() {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            throw new Error("WebSocket is not connected.");
        }

        // Heartbeat logic can be implemented here
        this.heartbeatInterval = setInterval(() => {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify({ t: "HEARTBEAT", d: null })); // Example heartbeat payload
            }
        }, this.heartbeatTime); // Send heartbeat every 30 seconds
    }


    async login(token) {
        if (!token) {
            throw new Error("Token is required for login.");
        }

        if (await this.isActive()) {
            throw new Error("WebSocket is already connected.");
        }

        this.ws = new WebSocket(Constants.WS_URL, {
            headers: {
                'Authorization': `Bot ${token}`
            }
        });

        this.ws.on('open', () => {

        });

        this.ws.on('message', async (data) => {
            try {
                const { t: eventType, d: eventData } = JSON.parse(data);
                const event = Events.fromString(eventType);

                if (event === Events.READY) {
                    this.id = eventData.user.id;
                    this.username = eventData.user.username;
                    this.subdomain = eventData.user.subdomain;
                    this.verified = eventData.user.verified;
                    this.profilePicture = eventData.user.profilePicture;
                    this.banner = eventData.user.banner;
                    this.disabled = eventData.user.disabled;
                    this._presence = eventData.user.presence || Presence.ONLINE;
                    this.badges = eventData.user.badges || [];
                    this.flags = eventData.user.flags || '0';
                    this.createdAt = new Date(eventData.user.createdAt);
                    this.lastOnline = new Date(eventData.user.lastOnline);
                    this.userStatus = eventData.user.userStatus || {};
                    this.privateFlags = eventData.user.privateFlags || '0';

                    this.token = token;
                    this.heartbeatTime = eventData.heartbeatIntervalMs || this.heartbeatTime;
                    this.startHeartbeat();

                    this.api = new ApiManager(this);
                    this.teams = new TeamManager(this);
                }

                if (event) {
                    if (eventData.teamId && eventData.channelId) {
                        const team = await this.teams.get(eventData.teamId);
                        const channel = await team.channels.get(eventData.channelId);
                        this.emit(event, { ...eventData, team, channel });
                    } else {
                        this.emit(event, eventData);
                    }
                }
            } catch (error) {
                this.emit(Events.ERROR, error);
            }
        });

        this.ws.on('error', (error) => {
            this.emit(Events.ERROR, error);
        });
    }

    async isActive() {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            return false;
        }
        // Check if the WebSocket is still connecteda
        return this.ws.readyState === WebSocket.OPEN;
    }

    get presence() {
        return this._presence;
    }

    set presence(value) {
        if (typeof value !== 'number') {
            throw new Error("Presence must be a number.");
        }
        this._presence = value;
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ t: "PRESENCE_UPDATE", d: { presence: value } }));
        }
    }
}

export { Bot };