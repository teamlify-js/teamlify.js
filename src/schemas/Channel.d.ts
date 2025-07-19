import { Message } from "./Message.js";
import { MessageBuilder } from "./MessageBuilder.js";
import { Role } from "./Role.js";

export declare class Channel {
    id: string;
    type: string; // e.g., "text", "voice", "category"
    teamId: string;
    name: string;
    description: string;
    createdBy: string; // User ID of the creator
    parentId: string | null; // For nested channels
    participants: Array<string> | null; // Array of User IDs or null if not applicable
    priority: number; // Priority level of the channel
    rateLimitPerUser: number; // Rate limit in seconds 0-21600
    permissions: Array<Role>; // Array of Role objects defining permissions for the channel
    additionalData: {
        streamChannel: string | null; // Stream channel ID if applicable
        streamPlatform: string | null; // Platform for streaming (e.g., "twitch", "youtube")
    } | null; // Additional data specific to the channel type
    createdAt: string; // ISO date string for when the channel was created

    async clone(): Promise<Channel>;
    async delete(): Promise<boolean>;
    async updateName(name: string): Promise<Channel>;
    async startTyping(): Promise<void>;
    async sendMessage(message: MessageBuilder): Promise<void>;
}