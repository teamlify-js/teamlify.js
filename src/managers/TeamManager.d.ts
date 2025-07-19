import { Team } from "../schemas/Team.js";

export declare class TeamManager {
    async all(): Promise<Team[]>;
    async get(id: string): Promise<Team | null>;
}