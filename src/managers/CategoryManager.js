import { Category } from "../schemas/Category.js";

class CategoryManager {
    constructor(team, bot) {
        this.team = team;
        this.bot = bot;
    }

    async all() {
        const categories = await this.bot.api.fetch(`/teams/${this.team.id}/categories`);
        return categories.categories.map(categoryData => {
            const category = new Category({
                ...categoryData,
                bot: this.bot
            });
            category.team = this.team; // Set the team reference
            category.bot = this.bot; // Set the bot reference
            return category;
        });
    }

    async get(id) {
        const categories = await this.bot.api.fetch(`/teams/${this.team.id}/categories`);
        const categoryData = categories.categories.find(category => category.id === id);
        if (!categoryData) {
            return null;
        }
        const category = new Category({
            ...categoryData,
            bot: this.bot
        });
        category.team = this.team; // Set the team reference
        category.bot = this.bot; // Set the bot reference
        return category;
    }

    async create(name) {
        const endpoint = `/teams/${this.team.id}/categories`;
        const data = {
            name
        };
        const response = await this.bot.api.fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        
        if (response.message) {
            throw new Error(response.message);
        }
        
        return new Category({
            ...response.category,
            bot: this.bot
        });
    }
}

export { CategoryManager };