// -----------------------------------------------------------------------------
// DISCORD ROLE MAPPINGS
// -----------------------------------------------------------------------------
// Replace the dummy string IDs below with your actual Magadh Striker Discord 
// Server Role IDs. You can get these by right-clicking a role in Discord 
// Server Settings and clicking "Copy ID".
// -----------------------------------------------------------------------------

export const DISCORD_SERVER_ID = process.env.DISCORD_GUILD_ID || "REPLACE_WITH_YOUR_SERVER_ID";

export const ROLE_MAPPINGS: Record<string, string> = {
  // Map Discord Role ID to App Role
  "111111111111111111": "super_admin",
  "222222222222222222": "tournament_mgr",
  "333333333333333333": "content_mgr",
  "444444444444444444": "support"
};

/**
 * Iterates through a user's array of Discord Role IDs and returns 
 * the highest priority application role they map to.
 */
export function getAppRoleFromDiscordRoles(userRoleIds: string[]): string {
  if (!userRoleIds || userRoleIds.length === 0) return 'user';
  
  // Priority order for resolving multiple roles
  const priority = ['super_admin', 'tournament_mgr', 'content_mgr', 'support', 'user'];
  
  const mappedRoles = userRoleIds
    .map(id => ROLE_MAPPINGS[id])
    .filter(Boolean);
    
  if (mappedRoles.length === 0) return 'user';
  
  // Sort by priority and return the highest
  mappedRoles.sort((a, b) => priority.indexOf(a) - priority.indexOf(b));
  
  return mappedRoles[0];
}
