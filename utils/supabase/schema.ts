export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          task_id: number
          inserted_at: string
          is_complete: boolean | null
          task: string | null
          user_id: string
          xp_pts: number
        }
        Insert: {
          task_id?: number
          inserted_at?: string
          is_complete?: boolean | null
          task?: string | null
          user_id: string
          xp_pts: number
        }
        Update: {
          task_id?: number
          inserted_at?: string
          is_complete?: boolean | null
          task?: string | null
          user_id?: string
          xp_pts?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}