export declare class Role {
    id: string;
    teamId: string;
    name: string;
    iconUrl: string | null; // URL to the role icon, if applicable
    color: string; // Hex color code for the role
    color2: string; // Secondary hex color code for the role
    permissions: Array<{ roleId: string; permissions: { allow: Array<string>; deny: Array<string> } }> ; // Bitwise permissions value
    priority: number; // Priority level of the role
    createdAt: string; // ISO date string for when the role was created
    updatedAt: string; // ISO date string for when the role was last updated
    isDisplayedSeparately: boolean; // Whether the role is displayed separately in the UI
    isSelfAssignable: boolean; // Whether users can assign this role to themselves
    iconEmojiId: string | null; // ID of the emoji used as the role icon, if applicable
    mentionable: boolean; // Whether the role can be mentioned
    botScope: {
        userId: string | null; // ID of the user this role is assigned to, if applicable
    }

    async clone(): Promise<Role>;
    async delete(): Promise<boolean>;
    async update(name: string, permissions: number, color: string, color2: string | null, isDisplayedSeparately: boolean | null): Promise<Role>;
}