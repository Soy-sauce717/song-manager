"use client";

import { useState } from "react";
import { addSong } from "./actions";

export default function AddSong() {
  const [loading, setLoading] =
    useState(false);

  async function autoFill() {
    const title =
      (
        document.querySelector(
          'input[name="title"]'
        ) as HTMLInputElement
      )?.value ?? "";

    const artist =
      (
        document.querySelector(
          'input[name="artist"]'
        ) as HTMLInputElement
      )?.value ?? "";

    if (!title || !artist) {
      alert(
        "曲名とアーティスト名を入力してください"
      );
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "/api/autofill",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title,
            artist,
          }),
        }
      );

      const data =
        await res.json();

      const releaseDate =
        document.querySelector(
          'input[name="release_date"]'
        ) as HTMLInputElement;

      const genre =
        document.querySelector(
          'input[name="genre"]'
        ) as HTMLInputElement;

      const lyricist =
        document.querySelector(
          'input[name="lyricist"]'
        ) as HTMLInputElement;

      const composer =
        document.querySelector(
          'input[name="composer"]'
        ) as HTMLInputElement;

      const arranger =
        document.querySelector(
          'input[name="arranger"]'
        ) as HTMLInputElement;

      const titleKana =
        document.querySelector(
          'input[name="title_kana"]'
        ) as HTMLInputElement;

      const artistKana =
        document.querySelector(
          'input[name="artist_kana"]'
        ) as HTMLInputElement;

      if (
        releaseDate &&
        data.release_date
      ) {
        releaseDate.value =
          data.release_date;
      }

      if (
        genre &&
        data.genre
      ) {
        genre.value =
          data.genre;
      }

      if (
        lyricist &&
        data.lyricist
      ) {
        lyricist.value =
          data.lyricist;
      }

      if (
        composer &&
        data.composer
      ) {
        composer.value =
          data.composer;
      }

      if (
        arranger &&
        data.arranger
      ) {
        arranger.value =
          data.arranger;
      }

      if (
        titleKana &&
        data.title_kana
      ) {
        titleKana.value =
          data.title_kana;
      }

      if (
        artistKana &&
        data.artist_kana
      ) {
        artistKana.value =
          data.artist_kana;
      }

      alert(
        "取得できた情報を入力しました"
      );
    } catch (error) {
      console.error(error);

      alert(
        "自動入力に失敗しました"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      action={addSong}
      className="
        mb-6
        border
        rounded
        p-4
        space-y-2
      "
    >
      <input
        name="title"
        placeholder="曲名"
        className="border p-2 w-full"
      />

      <input
        name="title_kana"
        placeholder="曲名読み"
        className="border p-2 w-full"
      />

      <input
        name="artist"
        placeholder="アーティスト名"
        className="border p-2 w-full"
      />

      <input
        name="artist_kana"
        placeholder="アーティスト名読み"
        className="border p-2 w-full"
      />

      <button
        type="button"
        onClick={autoFill}
        disabled={loading}
        className="
          border
          px-4
          py-2
          bg-blue-500
          text-white
          rounded
        "
      >
        {loading
          ? "取得中..."
          : "曲情報を自動入力"}
      </button>

      <input
        name="lyricist"
        placeholder="作詞者"
        className="border p-2 w-full"
      />

      <input
        name="composer"
        placeholder="作曲者"
        className="border p-2 w-full"
      />

      <input
        name="arranger"
        placeholder="編曲者"
        className="border p-2 w-full"
      />

      <input
        name="album"
        placeholder="アルバム名"
        className="border p-2 w-full"
      />

      <input
        type="date"
        name="release_date"
        className="border p-2 w-full"
      />

      <input
        name="genre"
        placeholder="ジャンル"
        className="border p-2 w-full"
      />

      <div>
        <label>
          動画リンク
        </label>

        <input
          name="video_url"
          className="border p-2 w-full"
          placeholder="YouTube等のURL"
        />
      </div>

      <div>
        <label>
          音源状態
        </label>

        <select
          name="audio_status"
          className="border p-2 w-full"
        >
          <option value="">
            未設定
          </option>

          <option value="あり">
            あり
          </option>

          <option value="なし">
            なし
          </option>
        </select>
      </div>

      <div>
        <label>
          YouTube投稿状況
        </label>

        <select
          name="youtube_status"
          className="border p-2 w-full"
        >
          <option value="">
            未設定
          </option>

          <option value="済">
            済
          </option>

          <option value="未">
            未
          </option>
        </select>
      </div>

      <textarea
        name="other_info"
        placeholder="その他情報"
        className="border p-2 w-full"
      />

      <label className="block">
        <input
          type="checkbox"
          name="practicing"
        />
        {" "}
        練習中
      </label>

      <label className="block">
        <input
          type="checkbox"
          name="is_visible"
          defaultChecked
        />
        {" "}
        表示する
      </label>

      <textarea
        name="notes"
        placeholder="備考"
        className="border p-2 w-full h-24"
      />

      <textarea
        name="lyrics"
        placeholder="歌詞"
        className="border p-2 w-full h-48"
      />

      <button
        type="submit"
        className="
          border
          px-4
          py-2
        "
      >
        登録
      </button>
    </form>
  );
}