export declare class MessageBuilder {
    channelId: string | null;
    content: string;
    attachments: Array<{ url: string, name: string, size: number }>;
    embeds: Array<MessageEmbed>;
    replyTo: string | null;

    constructor();

    setChannelId(channelId: string): this;
    setContent(content: string): this;
    addEmbed(...embed: MessageEmbed[]): this;
    setReplyTo(messageId: string): this;
    addMention(userId: string): this;
    build(): {
        content: string;
        attachments: Array<{ url: string, name: string, size: number }>;
        embeds: Array<MessageEmbed>;
        replyTo: string | null;
        mentions?: { users: Array<string> };
    };
}