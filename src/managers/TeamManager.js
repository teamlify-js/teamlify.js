import { Team } from "../schemas/Team.js";

class TeamManager {
    constructor(bot) {
        this.bot = bot;
    }

    async all() {
        const teamsData = await this.bot.api.fetch('/teams');
        const teams = teamsData.teams.map(data => new Team({
            ...data,
            bot: this.bot
        }));
        return teams;
    }

    async get(id) {
        const teamData = await this.bot.api.fetch(`/teams/${id}/details`);
        if (teamData.message) {
            throw new Error(teamData.message);
        }
        const team = new Team({
            ...teamData.team,
            bot: this.bot
        });
        return team;
    }
}

export { TeamManager };