import { Role } from "./Role.js";

export declare class Category {
    id: string;
    teamId: string;
    name: string;
    createdBy: string;
    priority: number;
    permissions: Array<{ roleId: string; permissions: { allow: Array<string>; deny: Array<string> } }>;
    createdAt: string;
    editedAt: string;

    async updateName(name: string): Promise<Category>;
    async updateRole(roleId: string, allow: Number, deny: Number): Promise<Category>;
    async delete(): Promise<boolean>;
    async addChannel(channelId: string): Promise<Category>;
    async removeChannel(channelId: string): Promise<Category>;
}