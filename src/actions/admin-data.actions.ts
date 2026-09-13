"use server";

import { createClient } from '@/utils/supabase/server';

// Generic fetcher that swallows errors (e.g. if table missing) and returns empty array
async function fetchTableSafe(tableName: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from(tableName).select('*').order('created_at', { ascending: false });
  if (error) {
    console.warn(`Warning: Could not fetch from ${tableName} (it may not exist yet).`, error.message);
    return [];
  }
  return data || [];
}

export async function getTeams() { return fetchTableSafe('teams'); }
export async function getPlayers() { return fetchTableSafe('players'); }
export async function getBannedPlayers() { return fetchTableSafe('banned_users'); }

export async function getBlogPosts() { return fetchTableSafe('blog_posts'); }
export async function getRoster() { return fetchTableSafe('roster'); }
export async function getMerch() { return fetchTableSafe('merchandise'); }
export async function getSponsors() { return fetchTableSafe('sponsors'); }
export async function getLanTickets() { return fetchTableSafe('lan_tickets'); }

export async function getCommunicationsLog() { return fetchTableSafe('communications_log'); }
export async function getAuditLog() { return fetchTableSafe('audit_log'); }
export async function getScoringTemplates() { return fetchTableSafe('scoring_templates'); }
export async function getAdminUsers() { return fetchTableSafe('admin_users'); }
export async function getCommsTemplates() { return fetchTableSafe('comms_templates'); }
export async function getMediaUploads() { return fetchTableSafe('media_uploads'); }
export async function getTeamInvites() { return fetchTableSafe('team_invites'); }
export async function getFreeAgents() { return fetchTableSafe('free_agents'); }
