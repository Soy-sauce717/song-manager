"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";

export async function addSong(
  formData: FormData
) {
  const supabase = createServerClient();

  const { error } = await supabase
    .from("songs")
    .insert({
      title: formData.get("title"),
      title_kana: formData.get("title_kana"),

      artist: formData.get("artist"),
      artist_kana: formData.get("artist_kana"),

      lyricist: formData.get("lyricist"),
      composer: formData.get("composer"),
      arranger: formData.get("arranger"),

      album: formData.get("album"),

      release_date:
        formData.get("release_date") || null,

      genre: formData.get("genre"),

      notes: formData.get("notes"),
      lyrics: formData.get("lyrics"),

      video_url: formData.get("video_url"),

      audio_status:
        formData.get("audio_status"),

      youtube_status:
        formData.get("youtube_status"),

      other_info:
        formData.get("other_info"),
    });

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/");
}

export async function deleteSong(
  id: string
) {
  const supabase = createServerClient();

  const { error } = await supabase
    .from("songs")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/");
}

export async function deleteSongAction(
  formData: FormData
) {
  const id = formData.get("id") as string;

  const supabase = createServerClient();

  const { error } = await supabase
    .from("songs")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/");
}

export async function updateSong(
  formData: FormData
) {
  const id = formData.get("id") as string;

  const supabase = createServerClient();

  const { error } = await supabase
    .from("songs")
    .update({
      title: formData.get("title"),
      title_kana: formData.get("title_kana"),

      artist: formData.get("artist"),
      artist_kana: formData.get("artist_kana"),

      lyricist: formData.get("lyricist"),
      composer: formData.get("composer"),
      arranger: formData.get("arranger"),

      album: formData.get("album"),

      release_date:
        formData.get("release_date") || null,

      genre: formData.get("genre"),

      notes: formData.get("notes"),
      lyrics: formData.get("lyrics"),

      video_url: formData.get("video_url"),

      audio_status:
        formData.get("audio_status"),

      youtube_status:
        formData.get("youtube_status"),

      other_info:
        formData.get("other_info"),
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/");
}

export async function updateDisplaySettings(
  formData: FormData
) {
  const supabase = createServerClient();

  const { error } = await supabase
    .from("display_settings")
    .update({
      title_kana:
        formData.get("title_kana") === "on",

      artist:
        formData.get("artist") === "on",

      artist_kana:
        formData.get("artist_kana") === "on",

      lyricist:
        formData.get("lyricist") === "on",

      composer:
        formData.get("composer") === "on",

      arranger:
        formData.get("arranger") === "on",

      album:
        formData.get("album") === "on",

      release_date:
        formData.get("release_date") === "on",

      genre:
        formData.get("genre") === "on",

      notes:
        formData.get("notes") === "on",

      audio_status:
        formData.get("audio_status") === "on",

      youtube_status:
        formData.get("youtube_status") === "on",

      video_url:
        formData.get("video_url") === "on",

      other_info:
        formData.get("other_info") === "on",

      lyrics:
        formData.get("lyrics") === "on",
    })
    .eq("id", 1);

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/");
}

export async function updateSortSettings(
  formData: FormData
) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("sort_settings")
    .update({
      sort_title:
        formData.get("sort_title") === "on",

      sort_artist:
        formData.get("sort_artist") === "on",

      sort_release_date:
        formData.get("sort_release_date") === "on",
    })
    .eq("id", 1)
    .select();

  console.log(
    "SORT DATA:",
    data
  );

  console.log(
    "SORT ERROR:",
    error
  );

  revalidatePath("/");
}