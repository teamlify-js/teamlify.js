import { CategoryManager } from "../managers/CategoryManager.js";
import { ChannelManager } from "../managers/ChannelManager.js";
import { MemberManager } from "../managers/MemberManager.js";
import { RoleManager } from "../managers/RoleManager.js";
import { Channel } from "./Channel.js";

export declare class Team {
    id: string;
    name: string;
    description: string;
    profilePicture: string;
    banner: string;
    isVerified: boolean;
    isSuspended: boolean;
    createdBy: string;
    defaultChannelId: string;
    games: Array<{
        id: string;
        platforms: Array<string>;
        region: string;
    }>;
    isDiscoverable: boolean;
    discoverableInvite: string;
    createdAt: string;
    memberCount: number;
    channels: ChannelManager;
    roles: RoleManager;
    categories: CategoryManager; // Array of Category IDs
    members: MemberManager;

    async updateName(name: string): Promise<Team>;
    async updateDescription(description: string): Promise<Team>;
    async updateProfilePicture(profilePicture: string): Promise<Team>;
    async updateBanner(banner: string): Promise<Team>;
    async ban(userId: string, reason?: string): Promise<boolean>;
    async unban(userId: string): Promise<boolean>;
    async bans(): Promise<Array<{ userId: string; reason: string }>>;
}