import { logout }
from "../login/actions";
import AddSong from "../add-song";
import SongList from "../song-list";
import BackupButtons
from "../backup-buttons";

import {
  updateDisplaySettings,
  updateSortSettings,
} from "../actions";

import { createServerClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createServerClient();

  const { data: songs, error } =
    await supabase
      .from("songs")
      .select("*");

  const { data: settings } =
    await supabase
      .from("display_settings")
      .select("*")
      .single();

  const { data: sortSettings } =
    await supabase
      .from("sort_settings")
      .select("*")
      .single();

  if (error) {
    return (
      <main className="p-8">
        <h1>接続エラー</h1>
        <pre>{error.message}</pre>
      </main>
    );
  }

 return (
  <main className="p-4">

    <BackupButtons />

    <details className="mb-4">
        <summary className="cursor-pointer font-bold border rounded p-2">
          曲を追加
        </summary>

        <div className="mt-4">
          <AddSong />
        </div>
      </details>

      <details className="mb-4">
        <summary className="cursor-pointer font-bold border rounded p-2">
          表示設定
        </summary>

        <form
          action={updateDisplaySettings}
          className="border rounded p-4 mt-2"
        >
          <div className="flex flex-wrap gap-x-6 gap-y-2">

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                name="title_kana"
                defaultChecked={settings?.title_kana}
              />
              {" "}
              曲名読み
            </label>

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                name="artist"
                defaultChecked={settings?.artist}
              />
              {" "}
              アーティスト
            </label>

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                name="artist_kana"
                defaultChecked={settings?.artist_kana}
              />
              {" "}
              アーティスト読み
            </label>

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                name="lyricist"
                defaultChecked={settings?.lyricist}
              />
              {" "}
              作詞
            </label>

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                name="composer"
                defaultChecked={settings?.composer}
              />
              {" "}
              作曲
            </label>

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                name="arranger"
                defaultChecked={settings?.arranger}
              />
              {" "}
              編曲
            </label>

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                name="album"
                defaultChecked={settings?.album}
              />
              {" "}
              アルバム
            </label>

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                name="release_date"
                defaultChecked={settings?.release_date}
              />
              {" "}
              リリース日
            </label>

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                name="genre"
                defaultChecked={settings?.genre}
              />
              {" "}
              ジャンル
            </label>

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                name="notes"
                defaultChecked={settings?.notes}
              />
              {" "}
              備考
            </label>

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                name="audio_status"
                defaultChecked={settings?.audio_status}
              />
              {" "}
              音源状態
            </label>

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                name="youtube_status"
                defaultChecked={settings?.youtube_status}
              />
              {" "}
              YouTube投稿状況
            </label>

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                name="video_url"
                defaultChecked={settings?.video_url}
              />
              {" "}
              動画リンク
            </label>

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                name="other_info"
                defaultChecked={settings?.other_info}
              />
              {" "}
              その他情報
            </label>

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                name="lyrics"
                defaultChecked={settings?.lyrics}
              />
              {" "}
              歌詞
            </label>

          </div>

          <button
            type="submit"
            className="border px-3 py-1 mt-4"
          >
            表示設定を保存
          </button>
        </form>
      </details>

      <details className="mb-4">
        <summary className="cursor-pointer font-bold border rounded p-2">
          並び替え設定
        </summary>

        <form
          action={updateSortSettings}
          className="border rounded p-4 mt-2"
        >
          <div className="flex flex-wrap gap-x-6 gap-y-2">

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                name="sort_title"
                defaultChecked={
                  sortSettings?.sort_title
                }
              />
              {" "}
              曲名
            </label>

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                name="sort_artist"
                defaultChecked={
                  sortSettings?.sort_artist
                }
              />
              {" "}
              アーティスト
            </label>

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                name="sort_release_date"
                defaultChecked={
                  sortSettings?.sort_release_date
                }
              />
              {" "}
              リリース日
            </label>

          </div>

          <button
            type="submit"
            className="border px-3 py-1 mt-4"
          >
            並び替え設定を保存
          </button>
        </form>
      </details>

      <SongList
        songs={songs ?? []}
        settings={settings}
        sortSettings={sortSettings}
      />
<form action={logout}>
  <button
    className="
      border
      px-3
      py-1
      mb-4
    "
  >
    ログアウト
  </button>
</form>
    </main>
  );
}