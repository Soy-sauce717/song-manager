import { NextResponse } from "next/server";

import {
  createServerClient,
} from "@/lib/supabase/server";

export async function POST(
  request: Request
) {
  try {
    const backupData =
      await request.json();

    if (
      !backupData ||
      !Array.isArray(
        backupData.songs
      )
    ) {
      return NextResponse.json(
        {
          error:
            "バックアップデータが不正です",
        },
        {
          status: 400,
        }
      );
    }

    const supabase =
      createServerClient();

    const {
      error: deleteError,
    } = await supabase
      .from("songs")
      .delete()
      .not("id", "is", null);

    if (deleteError) {
      console.error(
        "DELETE ERROR",
        deleteError
      );

      throw deleteError;
    }

    const {
      data: beforeSongs,
    } = await supabase
      .from("songs")
      .select("id");

    console.log(
      "SONG COUNT AFTER DELETE:",
      beforeSongs?.length
    );

    if (
      backupData.songs.length
    ) {
      const {
        error: insertError,
      } = await supabase
        .from("songs")
        .insert(
          backupData.songs
        );

      if (insertError) {
        console.error(
          "INSERT ERROR",
          insertError
        );

        throw insertError;
      }
    }

    if (
      backupData.displaySettings
    ) {
      await supabase
        .from(
          "display_settings"
        )
        .update(
          backupData.displaySettings
        )
        .eq("id", 1);
    }

    if (
      backupData.sortSettings
    ) {
      await supabase
        .from(
          "sort_settings"
        )
        .update(
          backupData.sortSettings
        )
        .eq("id", 1);
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "IMPORT ERROR",
      error
    );

    return NextResponse.json(
      {
        error:
          "バックアップ読込失敗",
      },
      {
        status: 500,
      }
    );
  }
}