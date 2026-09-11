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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string
          id: string
          name: string | null
          role: string
        }
        Insert: {
          created_at?: string
          id: string
          name?: string | null
          role?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          role?: string
        }
        Relationships: []
      }
      banners: {
        Row: {
          created_at: string
          cta_href: string | null
          cta_label: string | null
          description: string | null
          enabled: boolean
          ends_at: string | null
          id: string
          image_desktop_url: string | null
          image_mobile_url: string | null
          sort_order: number
          starts_at: string | null
          title: string
        }
        Insert: {
          created_at?: string
          cta_href?: string | null
          cta_label?: string | null
          description?: string | null
          enabled?: boolean
          ends_at?: string | null
          id?: string
          image_desktop_url?: string | null
          image_mobile_url?: string | null
          sort_order?: number
          starts_at?: string | null
          title: string
        }
        Update: {
          created_at?: string
          cta_href?: string | null
          cta_label?: string | null
          description?: string | null
          enabled?: boolean
          ends_at?: string | null
          id?: string
          image_desktop_url?: string | null
          image_mobile_url?: string | null
          sort_order?: number
          starts_at?: string | null
          title?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          enabled: boolean
          icon: string | null
          id: string
          image_url: string | null
          name: string
          parent_id: string | null
          slug: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          enabled?: boolean
          icon?: string | null
          id?: string
          image_url?: string | null
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          enabled?: boolean
          icon?: string | null
          id?: string
          image_url?: string | null
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          active: boolean
          code: string
          created_at: string
          expires_at: string | null
          id: string
          max_discount: number | null
          min_order: number | null
          per_customer_limit: number | null
          starts_at: string | null
          type: string
          usage_limit: number | null
          value: number
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          expires_at?: string | null
          id?: string
          max_discount?: number | null
          min_order?: number | null
          per_customer_limit?: number | null
          starts_at?: string | null
          type: string
          usage_limit?: number | null
          value: number
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          max_discount?: number | null
          min_order?: number | null
          per_customer_limit?: number | null
          starts_at?: string | null
          type?: string
          usage_limit?: number | null
          value?: number
        }
        Relationships: []
      }
      inventory_movements: {
        Row: {
          change: number
          created_at: string
          created_by: string | null
          id: string
          product_id: string
          reason: string
          variant_id: string | null
        }
        Insert: {
          change: number
          created_at?: string
          created_by?: string | null
          id?: string
          product_id: string
          reason: string
          variant_id?: string | null
        }
        Update: {
          change?: number
          created_at?: string
          created_by?: string | null
          id?: string
          product_id?: string
          reason?: string
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_movements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          active: boolean
          created_at: string
          cta_href: string | null
          cta_label: string | null
          ends_at: string | null
          id: string
          sort_order: number
          starts_at: string | null
          subtitle: string | null
          title: string
          tone: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          cta_href?: string | null
          cta_label?: string | null
          ends_at?: string | null
          id?: string
          sort_order?: number
          starts_at?: string | null
          subtitle?: string | null
          title: string
          tone?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          cta_href?: string | null
          cta_label?: string | null
          ends_at?: string | null
          id?: string
          sort_order?: number
          starts_at?: string | null
          subtitle?: string | null
          title?: string
          tone?: string
        }
        Relationships: []
      }
      product_images: {
        Row: {
          created_at: string
          id: string
          position: number
          product_id: string
          public_url: string
          storage_path: string
        }
        Insert: {
          created_at?: string
          id?: string
          position?: number
          product_id: string
          public_url: string
          storage_path: string
        }
        Update: {
          created_at?: string
          id?: string
          position?: number
          product_id?: string
          public_url?: string
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          attributes: Json
          created_at: string
          id: string
          image_url: string | null
          mrp: number | null
          price: number
          product_id: string
          sku: string
          stock: number
          swatch_hex: string | null
        }
        Insert: {
          attributes?: Json
          created_at?: string
          id?: string
          image_url?: string | null
          mrp?: number | null
          price: number
          product_id: string
          sku: string
          stock?: number
          swatch_hex?: string | null
        }
        Update: {
          attributes?: Json
          created_at?: string
          id?: string
          image_url?: string | null
          mrp?: number | null
          price?: number
          product_id?: string
          sku?: string
          stock?: number
          swatch_hex?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          bestseller: boolean
          brand: string | null
          category_id: string | null
          compatibility: string[]
          created_at: string
          delivery_info: string | null
          description: string | null
          featured: boolean
          id: string
          mrp: number | null
          new_arrival: boolean
          price: number
          published: boolean
          rating: number | null
          review_count: number
          seo_description: string | null
          seo_title: string | null
          short_description: string | null
          slug: string
          specifications: Json
          stock: number
          tags: string[]
          title: string
          updated_at: string
          variant_label: string | null
          warranty: string | null
        }
        Insert: {
          bestseller?: boolean
          brand?: string | null
          category_id?: string | null
          compatibility?: string[]
          created_at?: string
          delivery_info?: string | null
          description?: string | null
          featured?: boolean
          id?: string
          mrp?: number | null
          new_arrival?: boolean
          price: number
          published?: boolean
          rating?: number | null
          review_count?: number
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug: string
          specifications?: Json
          stock?: number
          tags?: string[]
          title: string
          updated_at?: string
          variant_label?: string | null
          warranty?: string | null
        }
        Update: {
          bestseller?: boolean
          brand?: string | null
          category_id?: string | null
          compatibility?: string[]
          created_at?: string
          delivery_info?: string | null
          description?: string | null
          featured?: boolean
          id?: string
          mrp?: number | null
          new_arrival?: boolean
          price?: number
          published?: boolean
          rating?: number | null
          review_count?: number
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug?: string
          specifications?: Json
          stock?: number
          tags?: string[]
          title?: string
          updated_at?: string
          variant_label?: string | null
          warranty?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          approved: boolean
          author: string
          comment: string | null
          created_at: string
          id: string
          image_url: string | null
          product_id: string
          rating: number
          verified: boolean
        }
        Insert: {
          approved?: boolean
          author: string
          comment?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          product_id: string
          rating: number
          verified?: boolean
        }
        Update: {
          approved?: boolean
          author?: string
          comment?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          product_id?: string
          rating?: number
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          area: string
          free_delivery_threshold: number
          gst_number: string | null
          hero_eyebrow: string
          hero_headline: string
          hero_subheadline: string
          hours: string
          id: boolean
          instagram_handle: string
          store_name: string
          updated_at: string
          whatsapp_enquiry_template: string
          whatsapp_number: string
          whatsapp_order_template: string
        }
        Insert: {
          area?: string
          free_delivery_threshold?: number
          gst_number?: string | null
          hero_eyebrow?: string
          hero_headline?: string
          hero_subheadline?: string
          hours?: string
          id?: boolean
          instagram_handle?: string
          store_name?: string
          updated_at?: string
          whatsapp_enquiry_template?: string
          whatsapp_number?: string
          whatsapp_order_template?: string
        }
        Update: {
          area?: string
          free_delivery_threshold?: number
          gst_number?: string | null
          hero_eyebrow?: string
          hero_headline?: string
          hero_subheadline?: string
          hours?: string
          id?: boolean
          instagram_handle?: string
          store_name?: string
          updated_at?: string
          whatsapp_enquiry_template?: string
          whatsapp_number?: string
          whatsapp_order_template?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admins_exist: { Args: never; Returns: boolean }
      is_admin: { Args: never; Returns: boolean }
      is_owner: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
