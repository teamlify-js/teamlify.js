import { Presence } from "../utils/Presence.js";

export declare class Member {
    id: string;
    name: string;
    subdomain: string;
    profilePicture: string;
    banner: string;
    bot: boolean;
    presence: Presence;
    flags: string;
    badges: Array<{
        id: string;
        name: string;
        icon: string;
    }>;
    userStatus: {
        content: string;
        emojiId: string;
    };
    userRPC: {
        id: number;
        type: string;
        name: string;
        startedAt: string;
    };
    createdAt: string;
    system: boolean;
    joinedAt: string;
    teamId: string; // Reference to the team this user belongs to
    roles: Array<string>; // Array of role IDs or role objects associated with the user

    async addRole(roleId: string): Promise<void>;
    async removeRole(roleId: string): Promise<void>;
    async kick(): Promise<boolean>;
}