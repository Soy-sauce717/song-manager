import { NextResponse } from "next/server";

import {
  createServerClient,
} from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase =
      createServerClient();

    const {
      data: songs,
      error: songsError,
    } = await supabase
      .from("songs")
      .select("*");

    const {
      data: displaySettings,
      error: displayError,
    } = await supabase
      .from("display_settings")
      .select("*")
      .single();

    const {
      data: sortSettings,
      error: sortError,
    } = await supabase
      .from("sort_settings")
      .select("*")
      .single();

    if (
      songsError ||
      displayError ||
      sortError
    ) {
      console.error(
        songsError ||
          displayError ||
          sortError
      );

      return NextResponse.json(
        {
          error:
            "バックアップ取得失敗",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      version: 1,

      exportedAt:
        new Date().toISOString(),

      songs,

      displaySettings,

      sortSettings,
    });
  } catch (error) {
    console.error(
      "EXPORT ERROR",
      error
    );

    return NextResponse.json(
      {
        error:
          "バックアップ出力に失敗しました",
      },
      {
        status: 500,
      }
    );
  }
}