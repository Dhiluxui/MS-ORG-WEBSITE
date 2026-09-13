export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          discord_id: string
          discord_username: string
          discord_avatar: string | null
          email: string | null
          role: 'user' | 'super_admin' | 'tournament_mgr' | 'content_mgr' | 'support'
          is_banned: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      tournaments: {
        Row: {
          id: string
          name: string
          game: 'Free Fire MAX' | 'BGMI' | 'CODM' | 'MOBA' | 'Legend RC'
          type: 'open' | 'invitational' | 'govt_scrim' | 'private_scrim'
          format: 'Solo' | 'Duo' | 'Squad' | 'Custom'
          description: string | null
          rules: string | null
          cover_image: string | null
          registration_opens: string | null
          registration_closes: string | null
          start_date: string | null
          end_date: string | null
          total_slots: number
          waitlist_slots: number
          entry_fee: number
          upi_id: string | null
          prize_pool: number
          prize_distribution: Json | null
          scoring_system: string | null
          scoring_formula: Json | null
          total_rounds: number
          status: 'draft' | 'published' | 'registering' | 'full' | 'live' | 'completed' | 'cancelled'
          allow_other_orgs: boolean
          hosting_org_name: string | null
          created_by: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['tournaments']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['tournaments']['Insert']>
      }
      teams: {
        Row: {
          id: string
          tournament_id: string
          team_name: string
          team_tag: string | null
          captain_id: string | null
          captain_discord: string
          captain_phone: string | null
          captain_email: string | null
          payment_screenshot: string | null
          payment_upi_ref: string | null
          payment_status: 'pending' | 'verified' | 'failed'
          status: 'pending' | 'approved' | 'rejected' | 'waitlisted'
          rejection_reason: string | null
          admin_notes: string | null
          slot_number: number | null
          registered_at: string
        }
        Insert: Omit<Database['public']['Tables']['teams']['Row'], 'id' | 'registered_at'>
        Update: Partial<Database['public']['Tables']['teams']['Insert']>
      }
      players: {
        Row: {
          id: string
          team_id: string
          user_id: string | null
          ign: string
          game_id_screenshot: string | null
          player_level: number | null
          role: 'IGL' | 'Rusher' | 'Sniper' | 'Support' | 'Sub' | null
          is_substitute: boolean
          verified: boolean
          banned_ign: boolean
          joined_at: string
        }
        Insert: Omit<Database['public']['Tables']['players']['Row'], 'id' | 'joined_at'>
        Update: Partial<Database['public']['Tables']['players']['Insert']>
      }
      matches: {
        Row: {
          id: string
          tournament_id: string
          round_number: number
          round_name: string | null
          match_number: number
          team_a_id: string | null
          team_b_id: string | null
          room_id: string | null
          room_password: string | null
          room_sent: boolean
          scheduled_time: string | null
          status: 'pending' | 'live' | 'completed'
          winner_id: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['matches']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['matches']['Insert']>
      }
      round_scores: {
        Row: {
          id: string
          match_id: string
          team_id: string
          round_number: number
          position: number
          kills: number
          position_points: number
          kill_points: number
          total_points: number
          recorded_by: string | null
          recorded_at: string
        }
        Insert: Omit<Database['public']['Tables']['round_scores']['Row'], 'id' | 'recorded_at'>
        Update: Partial<Database['public']['Tables']['round_scores']['Insert']>
      }
      leaderboard: {
        Row: {
          id: string
          tournament_id: string
          team_id: string
          rank: number
          total_points: number
          total_kills: number
          published: boolean
          last_updated: string
        }
        Insert: Omit<Database['public']['Tables']['leaderboard']['Row'], 'id' | 'last_updated'>
        Update: Partial<Database['public']['Tables']['leaderboard']['Insert']>
      }
      roster: {
        Row: {
          id: string
          real_name: string | null
          ign: string
          role: string | null
          game: string | null
          type: 'competitive' | 'content' | 'management' | null
          status: string
          featured_home: boolean
          instagram: string | null
          youtube: string | null
          bio: string | null
          image: string | null
          display_order: number | null
        }
        Insert: Omit<Database['public']['Tables']['roster']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['roster']['Insert']>
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          category: string | null
          tags: string[] | null
          author_id: string | null
          author_name: string | null
          author_role: string | null
          status: 'draft' | 'published' | 'scheduled'
          scheduled_at: string | null
          featured_image: string | null
          excerpt: string | null
          content: string | null
          published_at: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          original_price: number | null
          images: string[] | null
          badge: string | null
          category: string | null
          sizes: Json | null
          low_stock_alert: number
          status: string
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
      tickets: {
        Row: {
          id: string
          type: string | null
          event_id: string | null
          event_name: string
          event_date: string | null
          venue: string | null
          price: number
          total_seats: number | null
          sold_seats: number
          buyer_id: string | null
          buyer_name: string | null
          buyer_phone: string | null
          payment_screenshot: string | null
          status: 'pending' | 'confirmed' | 'cancelled'
          ticket_code: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['tickets']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['tickets']['Insert']>
      }
      sponsors: {
        Row: {
          id: string
          name: string
          tier: 'title' | 'gold' | 'bronze' | null
          logo: string | null
          website: string | null
          display_order: number | null
          contract_start: string | null
          contract_end: string | null
          is_active: boolean
        }
        Insert: Omit<Database['public']['Tables']['sponsors']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['sponsors']['Insert']>
      }
      site_settings: {
        Row: { key: string; value: string | null; updated_at: string }
        Insert: Omit<Database['public']['Tables']['site_settings']['Row'], 'updated_at'>
        Update: Partial<Database['public']['Tables']['site_settings']['Insert']>
      }
      contact_submissions: {
        Row: {
          id: string
          name: string | null
          email: string | null
          phone: string | null
          organization: string | null
          message: string | null
          type: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['contact_submissions']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['contact_submissions']['Insert']>
      }
      message_log: {
        Row: {
          id: string
          recipient_team_id: string | null
          channel: string | null
          trigger_event: string | null
          message: string | null
          status: string | null
          sent_by: string | null
          sent_at: string
        }
        Insert: Omit<Database['public']['Tables']['message_log']['Row'], 'id' | 'sent_at'>
        Update: Partial<Database['public']['Tables']['message_log']['Insert']>
      }
      profiles: {
        Row: {
          id: string
          tier: string | null
          created_at?: string
          updated_at?: string
        }
        Insert: {
          id: string
          tier?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tier?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Convenience type aliases
export type Tournament = Database['public']['Tables']['tournaments']['Row']
export type Team = Database['public']['Tables']['teams']['Row']
export type Player = Database['public']['Tables']['players']['Row']
export type Match = Database['public']['Tables']['matches']['Row']
export type RoundScore = Database['public']['Tables']['round_scores']['Row']
export type Leaderboard = Database['public']['Tables']['leaderboard']['Row']
export type RosterPlayer = Database['public']['Tables']['roster']['Row']
export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type Ticket = Database['public']['Tables']['tickets']['Row']
export type Sponsor = Database['public']['Tables']['sponsors']['Row']
export type SiteSetting = Database['public']['Tables']['site_settings']['Row']
export type AdminUser = Database['public']['Tables']['users']['Row']
export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row']
export type MessageLog = Database['public']['Tables']['message_log']['Row']
