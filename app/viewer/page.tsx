import SongList from "../song-list";import SongListViewer
from "../song-list-viewer";import { createServerClient } from "@/lib/supabase/server";

export default async function ViewerPage() {
  const supabase =
    createServerClient();

  const {
    data: songs,
    error,
  } = await supabase
    .from("songs")
    .select("*");

  const {
    data: settings,
  } = await supabase
    .from("display_settings")
    .select("*")
    .single();

  const {
    data: sortSettings,
  } = await supabase
    .from("sort_settings")
    .select("*")
    .single();

  if (error) {
    return (
      <main className="p-8">
        <h1>
          接続エラー
        </h1>

        <pre>
          {error.message}
        </pre>
      </main>
    );
  }

  return (
    <main className="p-4">

      <h1
        className="
          text-2xl
          font-bold
          mb-4
          text-center
        "
      >
        歌える曲リスト
      </h1>

      <SongListViewer
  songs={songs ?? []}
  settings={settings}
  sortSettings={sortSettings}
/>

    </main>
  );
}
