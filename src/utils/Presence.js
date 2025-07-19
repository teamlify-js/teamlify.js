export class Presence {
    static OFFLINE = 0;
    static ONLINE = 1;
    static BUSY = 2;
    static DND = 3;

    static fromValue(value) {
        return Presence[value] || null;
    }

    static toString(value) {
        switch (value) {
            case Presence.OFFLINE:
                return "OFFLINE";
            case Presence.ONLINE:
                return "ONLINE";
            case Presence.BUSY:
                return "BUSY";
            case Presence.DND:
                return "DND";
            default:
                return "UNKNOWN";
        }
    }
}