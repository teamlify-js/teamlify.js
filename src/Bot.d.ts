import { TeamManager } from "./managers/TeamManager.js";
import { Team } from "./schemas/Team.js";
import { Presence } from "./utils/Presence.js";

export declare class Bot {
    id: string;
    username: string;
    subdomain: string;
    verified: boolean;
    profilePicture: string;
    banner: string;
    disabled: boolean;
    presence: Presence;
    badges: string[];
    flags: string;
    createdAt: Date;
    lastOnline: Date;
    userStatus: { content: string; emojiId: string };
    privateFlags: string;
    teams: TeamManager;

    async login(token: string): Promise<void>;
    async isActive(): Promise<boolean>;
}