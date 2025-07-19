import { Presence } from "../utils/Presence.js";

export declare class User {
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
}