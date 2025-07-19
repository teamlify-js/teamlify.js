import { Channel } from "../schemas/Channel.js";
import { ChannelTypes } from "../utils/ChannelTypes.js";

export declare class ChannelManager {
    async all(): Promise<Channel[]>;
    async get(id: string): Promise<Channel | null>;
    async create(name: string, type: ChannelTypes, options: { additionalData?: 
        { streamChannel: string, streamPlatform: "twitch" | "kick" } 
    }): Promise<Channel>;
}