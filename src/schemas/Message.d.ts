import { ChannelTypes } from "../utils/ChannelTypes.js";
import { MessageEmbed } from "./MessageEmbed";

export declare class Message {
    id: string;
    channelId: string;
    type: ChannelTypes;
    content: string;
    createdAt: string;
    editedAt: string;
    attachments: Array<{
        url: string;
    }>;
    embeds: Array<MessageEmbed>;
    replyTo: string | null;
    reactions: Array<{
        emojiId: string;
        count: number;
        users: Array<string>;
    }>;
    nonce: string;
    mentions: Array<string>;
}