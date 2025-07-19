export declare class MessageEmbed {
    title: string;
    description: string;
    url: string;
    color: number;
    timestamp: string;
    author: {
        name: string;
        iconUrl?: string;
    };
    footer: {
        text: string;
        iconUrl?: string;
    };
    image: {
        url: string;
    };
    thumbnail: {
        url: string;
    };

    setTitle(title: string): this;
    setDescription(description: string): this;
    setUrl(url: string): this;
    setColor(color: number): this;
    setAuthor(name: string, iconUrl?: string): this;
    setFooter(text: string, iconUrl?: string): this;
    setImage(url: string): this;
    setThumbnail(url: string): this;
    build(): {
        title: string;
        description: string;
        url: string;
        color: number;
        timestamp: string;
        author?: {
            name: string;
            iconUrl?: string;
        };
        footer?: {
            text: string;
            iconUrl?: string;
        };
        image?: {
            url: string;
        };
        thumbnail?: {
            url: string;
        };
    }
}