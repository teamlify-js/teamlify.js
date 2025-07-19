import { BitField } from "./BitField.js";

const ChannelPermissions = new BitField({
    VIEW_CHANNEL: 1 << 0, // 1
    MANAGE_MESSAGES: 1 << 1, // 2
    SEND_MESSAGES: 1 << 2, // 4
    USE_EXTERNAL_EMOJIS: 1 << 3, // 8
    MANAGE_CHANNEL: 1 << 4, // 16
    CAN_SEE_MESSAGE_HISTORY: 1 << 5, // 32
});

const VoiceChannelPermissions = new BitField({
    VIEW_CHANNEL: 1 << 0, // 1
    CONNECT: 1 << 1, // 2
    SPEAK: 1 << 2, // 4
    MUTE_MEMBERS: 1 << 3, // 8
    DEAFEN_MEMBERS: 1 << 4, // 16
    MOVE_MEMBERS: 1 << 5, // 32
    MANAGE_CHANNEL: 1 << 6, // 64
    DISCONNECT: 1 << 7, // 128
});

const TodoChannelPermissions = new BitField({
    VIEW_CHANNEL: 1 << 0, // 1
    MANAGE_TODOS: 1 << 1, // 2
    CREATE_TODOS: 1 << 2, // 4
    DELETE_TODOS: 1 << 3, // 8
    EDIT_TODOS: 1 << 4, // 16
    MANAGE_CHANNEL: 1 << 5, // 32
});

const WatchStreamChannelPermissions = new BitField({
    VIEW_CHANNEL: 1 << 0, // 1
    MANAGE_CHANNEL: 1 << 1, // 2
});

const AnnouncementChannelPermissions = new BitField({
    VIEW_CHANNEL: 1 << 0, // 1
    MANAGE_CHANNEL: 1 << 1, // 2
    CREATE_ANNOUNCEMENTS: 1 << 2, // 4
    DELETE_ANNOUNCEMENTS: 1 << 3, // 8
});

const TeamPermissions = new BitField({
    ADMINISTRATOR: 1 << 0, // 1
    MANAGE_CHANNELS: 1 << 1, // 2
    MANAGE_ROLES: 1 << 2, // 4
    MANAGE_TEAM: 1 << 3, // 8
    VIEW_AUDIT_LOGS: 1 << 4, // 16
    BAN_MEMBERS: 1 << 5, // 32
    DELETE_MESSAGES: 1 << 6, // 64
    MANAGE_APPLICATIONS: 1 << 7, // 128
    JOIN_TOURNAMENTS: 1 << 8, // 256
    CREATE_INVITES: 1 << 9, // 512
    MENTION_EVERYONE_AND_HERE: 1 << 10, // 1024
    MANAGE_BLOGS: 1 << 11, // 2048
    KICK_MEMBERS: 1 << 12, // 4096
    MOVE_MEMBERS: 1 << 13, // 8192
});

const parsePermissions = (channelType, permissions) => {
    const roles = Object.entries(permissions.role || {}).map(([key, value]) => {
        return {
            roleId: key,
            permissions: value
        };
    }) || [];
    return parseRoles(channelType, roles);
}

const parseRoles = (channelType, roles) => {
    return roles.map(role => {
        let permissions = role.permissions || {};

        // Convert permissions to a more usable format if needed
        switch (channelType) {
            case 'text':
                permissions = {
                    allow: ChannelPermissions.decode(permissions.allow || 0),
                    deny: ChannelPermissions.decode(permissions.deny || 0)
                }
                break;
            case 'voice':
                permissions = {
                    allow: VoiceChannelPermissions.decode(permissions.allow || 0),
                    deny: VoiceChannelPermissions.decode(permissions.deny || 0)
                }
                break;
            case 'todo':
                permissions = {
                    allow: TodoChannelPermissions.decode(permissions.allow || 0),
                    deny: TodoChannelPermissions.decode(permissions.deny || 0)
                }
                break;
            case 'announcement':
                permissions = {
                    allow: AnnouncementChannelPermissions.decode(permissions.allow || 0),
                    deny: AnnouncementChannelPermissions.decode(permissions.deny || 0)
                }
                break;
            default:
                permissions = {
                    allow: ChannelPermissions.decode(permissions.allow || 0),
                    deny: ChannelPermissions.decode(permissions.deny || 0)
                }
                break;
        }

        return {
            roleId: role.roleId,
            permissions: {
                allow: permissions.allow,
                deny: permissions.deny
            }
        };
    });
}

export {
    ChannelPermissions,
    VoiceChannelPermissions,
    TodoChannelPermissions,
    WatchStreamChannelPermissions,
    AnnouncementChannelPermissions,
    TeamPermissions,
    parsePermissions,
}