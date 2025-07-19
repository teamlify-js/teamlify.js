import { Member } from "../schemas/Member.js";

class MemberManager {
    constructor(team, bot) {
        this.team = team;
        this.bot = bot;
    }
    
    async all() {
        const membersData = await this.bot.api.fetch(`/teams/${this.team.id}/members`);
        return membersData.members.map(memberData => {
            const member = new Member({
                ...memberData,
                bot: this.bot
            });
            member.team = this.team; // Set the team reference
            member.bot = this.bot; // Set the bot reference
            return member;
        });
    }
}

export { MemberManager };