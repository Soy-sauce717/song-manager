"use client";

import { useMemo, useState } from "react";
import SongCard from "./song-card";

export default function SongList({
  songs,
  settings,
  sortSettings,
}: {
  songs: any[];
  settings: any;
  sortSettings: any;
}) {
  const [keyword, setKeyword] =
    useState("");

  const [sortField, setSortField] =
    useState("title");

  const [sortOrder, setSortOrder] =
    useState("asc");

  const [
    practicingOnly,
    setPracticingOnly,
  ] = useState(false);

  const [
    hasVideoOnly,
    setHasVideoOnly,
  ] = useState(false);

  const [
    hasAudioOnly,
    setHasAudioOnly,
  ] = useState(false);

  const [
    youtubeDoneOnly,
    setYoutubeDoneOnly,
  ] = useState(false);
console.log(
  "SONGS:",
  songs.map(
    (s) => ({
      title: s.title,
      is_visible: s.is_visible,
    })
  )
);

  const filteredSongs = useMemo(() => {
    const result = songs
      
      .filter((song) => {
        if (
          practicingOnly &&
          !song.practicing
        ) {
          return false;
        }

        if (
          hasVideoOnly &&
          !song.video_url
        ) {
          return false;
        }

        if (
          hasAudioOnly &&
          song.audio_status !== "あり"
        ) {
          return false;
        }

        if (
          youtubeDoneOnly &&
          song.youtube_status !== "済"
        ) {
          return false;
        }

        return true;
      })

      .filter((song) => {
        const text = [
          song.title,
          song.title_kana,

          song.artist,
          song.artist_kana,

          song.lyricist,
          song.composer,
          song.arranger,

          song.genre,

          song.notes,

          song.lyrics,

          song.other_info,
        ]
          .join(" ")
          .toLowerCase();

        return text.includes(
          keyword.toLowerCase()
        );
      });

    result.sort((a, b) => {
      let aValue = "";
      let bValue = "";

      if (sortField === "title") {
        aValue =
          a.title_kana ||
          a.title ||
          "";

        bValue =
          b.title_kana ||
          b.title ||
          "";
      }

      if (sortField === "artist") {
        aValue =
          a.artist_kana ||
          a.artist ||
          "";

        bValue =
          b.artist_kana ||
          b.artist ||
          "";
      }

      if (
        sortField ===
        "release_date"
      ) {
        aValue =
          a.release_date || "";

        bValue =
          b.release_date || "";
      }

      if (sortOrder === "asc") {
        return String(
          aValue
        ).localeCompare(
          String(bValue),
          "ja"
        );
      }

      return String(
        bValue
      ).localeCompare(
        String(aValue),
        "ja"
      );
    });

    return result;
  }, [
    songs,
    keyword,
    sortField,
    sortOrder,
    practicingOnly,
    hasVideoOnly,
    hasAudioOnly,
    youtubeDoneOnly,
  ]);

  return (
    <>
      <div className="border rounded-lg p-4 mb-6 bg-white">

        <input
          value={keyword}
          onChange={(e) =>
            setKeyword(
              e.target.value
            )
          }
          placeholder="検索"
          className="border p-2 w-full mb-4"
        />

        <div className="mb-4">

          <div className="font-bold mb-2">
            絞り込み
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                checked={
                  practicingOnly
                }
                onChange={(e) =>
                  setPracticingOnly(
                    e.target.checked
                  )
                }
              />
              {" "}
              練習中のみ
            </label>

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                checked={
                  hasVideoOnly
                }
                onChange={(e) =>
                  setHasVideoOnly(
                    e.target.checked
                  )
                }
              />
              {" "}
              本人リンクあり
            </label>

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                checked={
                  hasAudioOnly
                }
                onChange={(e) =>
                  setHasAudioOnly(
                    e.target.checked
                  )
                }
              />
              {" "}
              音源あり
            </label>

            <label className="whitespace-nowrap">
              <input
                type="checkbox"
                checked={
                  youtubeDoneOnly
                }
                onChange={(e) =>
                  setYoutubeDoneOnly(
                    e.target.checked
                  )
                }
              />
              {" "}
              YouTube投稿済
            </label>

          </div>

        </div>

        <div className="flex flex-wrap gap-3 items-center">

          <select
            value={sortField}
            onChange={(e) =>
              setSortField(
                e.target.value
              )
            }
            className="border p-2"
          >
            {sortSettings?.sort_title && (
              <option value="title">
                曲名
              </option>
            )}

            {sortSettings?.sort_artist && (
              <option value="artist">
                アーティスト名
              </option>
            )}

            {sortSettings?.sort_release_date && (
              <option value="release_date">
                リリース日
              </option>
            )}
          </select>

          <button
            type="button"
            onClick={() =>
              setSortOrder("asc")
            }
            className="border px-3 py-2"
          >
            昇順 ↑
          </button>

          <button
            type="button"
            onClick={() =>
              setSortOrder("desc")
            }
            className="border px-3 py-2"
          >
            降順 ↓
          </button>

        </div>

        <div className="mt-3 text-sm text-gray-600">
          検索結果:
          {" "}
          {filteredSongs.length}
          {" "}
          曲
        </div>

      </div>

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSongs.map(
          (song) => (
            <SongCard
              key={song.id}
              song={song}
              settings={settings}
            />
          )
        )}
      </ul>
    </>
  );
}