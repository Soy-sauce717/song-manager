import { updateSong } from "./actions";

export default function EditSong({
  song,
}: {
  song: any;
}) {
  return (
    <details className="relative">

      <summary
        className="
          list-none
          cursor-pointer
          border
          rounded-full
          w-10
          h-10
          flex
          items-center
          justify-center
          text-xl
          hover:bg-gray-100
        "
        title="編集"
      >
        ✏️
      </summary>

      <form
        action={updateSong}
        className="
          mt-3
          space-y-3
          border
          rounded
          p-4
          bg-white
          shadow
        "
      >
        <input
          type="hidden"
          name="id"
          value={song.id}
        />

        <div>
          <label>曲名</label>

          <input
            name="title"
            defaultValue={song.title}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>曲名読み</label>

          <input
            name="title_kana"
            defaultValue={song.title_kana}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>アーティスト名</label>

          <input
            name="artist"
            defaultValue={song.artist}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>アーティスト名読み</label>

          <input
            name="artist_kana"
            defaultValue={song.artist_kana}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>作詞者</label>

          <input
            name="lyricist"
            defaultValue={song.lyricist}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>作曲者</label>

          <input
            name="composer"
            defaultValue={song.composer}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>編曲者</label>

          <input
            name="arranger"
            defaultValue={song.arranger}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>アルバム名</label>

          <input
            name="album"
            defaultValue={song.album}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>リリース日</label>

          <input
            type="date"
            name="release_date"
            defaultValue={
              song.release_date ?? ""
            }
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>ジャンル</label>

          <input
            name="genre"
            defaultValue={song.genre}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>動画リンク</label>

          <input
            name="video_url"
            defaultValue={song.video_url}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>音源状態</label>

          <select
            name="audio_status"
            defaultValue={
              song.audio_status
            }
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
            defaultValue={
              song.youtube_status
            }
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

        <div>
          <label>
            その他情報
          </label>

          <textarea
            name="other_info"
            defaultValue={
              song.other_info
            }
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="practicing"
              defaultChecked={
                song.practicing
              }
            />
            {" "}
            練習中
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="is_visible"
              defaultChecked={
                song.is_visible
              }
            />
            {" "}
            表示する
          </label>
        </div>

        <div>
          <label>備考</label>

          <textarea
            name="notes"
            defaultValue={song.notes}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>歌詞</label>

          <textarea
            name="lyrics"
            defaultValue={song.lyrics}
            className="border p-2 w-full h-40"
          />
        </div>

        <button
          type="submit"
          className="
            border
            px-4
            py-2
            rounded
            bg-blue-500
            text-white
          "
        >
          保存
        </button>

      </form>

    </details>
  );
}