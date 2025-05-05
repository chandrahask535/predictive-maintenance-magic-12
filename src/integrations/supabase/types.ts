export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      engines: {
        Row: {
          created_at: string | null
          id: string
          unit_number: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          unit_number: number
        }
        Update: {
          created_at?: string | null
          id?: string
          unit_number?: number
        }
        Relationships: []
      }
      operational_settings: {
        Row: {
          created_at: string | null
          cycle: number
          engine_id: string | null
          id: string
          setting_1: number
          setting_2: number
          setting_3: number
        }
        Insert: {
          created_at?: string | null
          cycle: number
          engine_id?: string | null
          id?: string
          setting_1: number
          setting_2: number
          setting_3: number
        }
        Update: {
          created_at?: string | null
          cycle?: number
          engine_id?: string | null
          id?: string
          setting_1?: number
          setting_2?: number
          setting_3?: number
        }
        Relationships: [
          {
            foreignKeyName: "operational_settings_engine_id_fkey"
            columns: ["engine_id"]
            isOneToOne: false
            referencedRelation: "engines"
            referencedColumns: ["id"]
          },
        ]
      }
      rul_predictions: {
        Row: {
          created_at: string | null
          cycle: number
          engine_id: string | null
          failure_probability: number | null
          id: string
          model_version: string | null
          rul: number
        }
        Insert: {
          created_at?: string | null
          cycle: number
          engine_id?: string | null
          failure_probability?: number | null
          id?: string
          model_version?: string | null
          rul: number
        }
        Update: {
          created_at?: string | null
          cycle?: number
          engine_id?: string | null
          failure_probability?: number | null
          id?: string
          model_version?: string | null
          rul?: number
        }
        Relationships: [
          {
            foreignKeyName: "rul_predictions_engine_id_fkey"
            columns: ["engine_id"]
            isOneToOne: false
            referencedRelation: "engines"
            referencedColumns: ["id"]
          },
        ]
      }
      sensor_readings: {
        Row: {
          created_at: string | null
          cycle: number
          engine_id: string | null
          id: string
          sensor_1: number | null
          sensor_10: number | null
          sensor_11: number | null
          sensor_12: number | null
          sensor_13: number | null
          sensor_14: number | null
          sensor_15: number | null
          sensor_16: number | null
          sensor_17: number | null
          sensor_18: number | null
          sensor_19: number | null
          sensor_2: number | null
          sensor_20: number | null
          sensor_21: number | null
          sensor_3: number | null
          sensor_4: number | null
          sensor_5: number | null
          sensor_6: number | null
          sensor_7: number | null
          sensor_8: number | null
          sensor_9: number | null
        }
        Insert: {
          created_at?: string | null
          cycle: number
          engine_id?: string | null
          id?: string
          sensor_1?: number | null
          sensor_10?: number | null
          sensor_11?: number | null
          sensor_12?: number | null
          sensor_13?: number | null
          sensor_14?: number | null
          sensor_15?: number | null
          sensor_16?: number | null
          sensor_17?: number | null
          sensor_18?: number | null
          sensor_19?: number | null
          sensor_2?: number | null
          sensor_20?: number | null
          sensor_21?: number | null
          sensor_3?: number | null
          sensor_4?: number | null
          sensor_5?: number | null
          sensor_6?: number | null
          sensor_7?: number | null
          sensor_8?: number | null
          sensor_9?: number | null
        }
        Update: {
          created_at?: string | null
          cycle?: number
          engine_id?: string | null
          id?: string
          sensor_1?: number | null
          sensor_10?: number | null
          sensor_11?: number | null
          sensor_12?: number | null
          sensor_13?: number | null
          sensor_14?: number | null
          sensor_15?: number | null
          sensor_16?: number | null
          sensor_17?: number | null
          sensor_18?: number | null
          sensor_19?: number | null
          sensor_2?: number | null
          sensor_20?: number | null
          sensor_21?: number | null
          sensor_3?: number | null
          sensor_4?: number | null
          sensor_5?: number | null
          sensor_6?: number | null
          sensor_7?: number | null
          sensor_8?: number | null
          sensor_9?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sensor_readings_engine_id_fkey"
            columns: ["engine_id"]
            isOneToOne: false
            referencedRelation: "engines"
            referencedColumns: ["id"]
          },
        ]
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
