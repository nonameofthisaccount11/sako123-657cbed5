export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          published_at: string | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
          subject?: string | null
        }
        Relationships: []
      }
      customer_reviews: {
        Row: {
          created_at: string
          customer_company: string | null
          customer_image: string | null
          customer_name: string
          customer_title: string | null
          display_order: number | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          rating: number
          review_text: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_company?: string | null
          customer_image?: string | null
          customer_name: string
          customer_title?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          rating?: number
          review_text: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_company?: string | null
          customer_image?: string | null
          customer_name?: string
          customer_title?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          rating?: number
          review_text?: string
          updated_at?: string
        }
        Relationships: []
      }
      media_library: {
        Row: {
          alt_text: string | null
          created_at: string
          file_name: string
          file_size: number | null
          file_type: string
          file_url: string
          id: string
          uploaded_by: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          file_name: string
          file_size?: number | null
          file_type: string
          file_url: string
          id?: string
          uploaded_by?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          file_name?: string
          file_size?: number | null
          file_type?: string
          file_url?: string
          id?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      page_visits: {
        Row: {
          created_at: string
          id: string
          page_path: string
          referrer: string | null
          user_agent: string | null
          visitor_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          page_path: string
          referrer?: string | null
          user_agent?: string | null
          visitor_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          page_path?: string
          referrer?: string | null
          user_agent?: string | null
          visitor_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          client_name: string | null
          created_at: string
          description: string | null
          display_order: number | null
          full_description: string | null
          gallery: Json | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          project_url: string | null
          slug: string
          technologies: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          client_name?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          full_description?: string | null
          gallery?: Json | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          project_url?: string | null
          slug: string
          technologies?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          client_name?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          full_description?: string | null
          gallery?: Json | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          project_url?: string | null
          slug?: string
          technologies?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      seo_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          keywords: string[] | null
          og_image: string | null
          page_path: string
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          keywords?: string[] | null
          og_image?: string | null
          page_path: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          keywords?: string[] | null
          og_image?: string | null
          page_path?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          features: Json | null
          icon: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          features?: Json | null
          icon?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          features?: Json | null
          icon?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          content: Json
          created_at: string
          id: string
          page_key: string
          section_key: string
          updated_at: string
        }
        Insert: {
          content?: Json
          created_at?: string
          id?: string
          page_key: string
          section_key: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          page_key?: string
          section_key?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          setting_key: string
          setting_value?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string | null
          created_at: string
          display_order: number | null
          id: string
          image_url: string | null
          is_published: boolean | null
          name: string
          role: string | null
          social_links: Json | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          name: string
          role?: string | null
          social_links?: Json | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          name?: string
          role?: string | null
          social_links?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      media_library_public: {
        Row: {
          alt_text: string | null
          file_name: string | null
          file_type: string | null
          file_url: string | null
          id: string | null
        }
        Insert: {
          alt_text?: string | null
          file_name?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string | null
        }
        Update: {
          alt_text?: string | null
          file_name?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
