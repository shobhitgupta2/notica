import { badge_enum } from "@/types/types";
import { createClient } from "@/utils/supabase/client";

export const apiClient = {
  async addNote(title: string, badge: badge_enum) {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { message: "User not authenticated" } };
    }

    const { error } = await supabase
      .from("notes")
      .insert({ title: title, badge: badge, user_id: user.id });

    return error;
  },
  async getNotes() {
    const supabase = createClient();

    const { data: notes, error } = await supabase
      .from("notes")
      .select("title, note_id, badge, updated_at")
      .order("updated_at", { ascending: false });

    if (!notes) {
      return { data: null, error };
    }

    type Note = typeof notes extends (infer T)[] ? T : never;
    type EnhancedNote = Note & {
      days_since_update: number;
      formatted_date: string;
      formatted_time: string;
    };

    const data = notes.map((note): EnhancedNote => {
      const updatedAt = new Date(note.updated_at);
      const now = new Date();
      const diffMs = now.getTime() - updatedAt.getTime();
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      const day = updatedAt.getDate().toString().padStart(2, "0");
      const month = (updatedAt.getMonth() + 1).toString().padStart(2, "0");
      const year = updatedAt.getFullYear();
      const formatted_date = `${day}/${month}/${year}`;

      const hours = updatedAt.getHours().toString().padStart(2, "0");
      const minutes = updatedAt.getMinutes().toString().padStart(2, "0");
      const seconds = updatedAt.getSeconds().toString().padStart(2, "0");
      const formatted_time = `${hours}:${minutes}:${seconds}`;

      return {
        ...note,
        days_since_update: days,
        formatted_date,
        formatted_time,
      };
    });
    return { data, error };
  },
  async deleteNote(id: string) {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { message: "User not authenticated" } };
    }

    const { error } = await supabase.from("notes").delete().eq("note_id", id);

    return error;
  },
  async updateNote(id: string, title: string, badge: badge_enum, text: string) {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { message: "User not authenticated" } };
    }

    const { error } = await supabase
      .from("notes")
      .update({ title: title, badge: badge, text: text })
      .eq("note_id", id);

    return error;
  },
  async getTextById(id: string) {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("notes")
      .select("text")
      .eq("note_id", id)
      .single();

    if (error) throw error;

    return data?.text || "";
  },
};
