import { Role } from "../schemas/Role.js";

export declare class RoleManager {
    async all(): Promise<Role[]>;
    async get(id: string): Promise<Role | null>;
    async create(name: string, permissions: number, color: string, color2: string | null, isDisplayedSeparately: boolean | null): Promise<Role>;
}