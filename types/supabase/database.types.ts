export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          letto: boolean
          messaggio: string
          nome: string
          obiettivo: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          letto?: boolean
          messaggio: string
          nome: string
          obiettivo: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          letto?: boolean
          messaggio?: string
          nome?: string
          obiettivo?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          created_at: string
          description: string | null
          id: number
          subject: string | null
          title: string | null
          type: string | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          subject?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          subject?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          approved: boolean
          author_name: string
          content: string
          created_at: string | null
          id: string
          rating: number
          subject: string | null
        }
        Insert: {
          approved?: boolean
          author_name: string
          content: string
          created_at?: string | null
          id?: string
          rating: number
          subject?: string | null
        }
        Update: {
          approved?: boolean
          author_name?: string
          content?: string
          created_at?: string | null
          id?: string
          rating?: number
          subject?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role: "student" | "tutor" | "promoter" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type AppRole = Database["public"]["Enums"]["app_role"]
export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
