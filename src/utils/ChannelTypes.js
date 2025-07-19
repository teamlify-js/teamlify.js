export class ChannelTypes {
    static TEXT = "text";
    static VOICE = "voice";
    static TODO = "todo";
    static ANNOUNCEMENT = "announcement";
    static WATCHSTREAM = "watchstream";

    static fromString(eventType) {
        return ChannelTypes[eventType.toUpperCase()] || null;
    }
}