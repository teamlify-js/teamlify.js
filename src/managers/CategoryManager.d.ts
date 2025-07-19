import { Category } from "../schemas/Category.js";

export declare class CategoryManager {
    async all(): Promise<Category[]>;
    async get(id: string): Promise<Category | null>;
}
