import EditSong from "./edit-song";
import { deleteSongAction } from "./actions";

export default function SongCard({
  song,
  settings,
}: {
  song: any;
  settings: any;
}) {
 
  return (
    <li
      className="
        border
        rounded-lg
        p-4
        bg-white
        shadow
      "
    >
   {song.is_visible === false && (
      <div className="mb-3 text-center">
        <span
          className="
            bg-red-500
            text-white
            px-3
            py-1
            rounded
            font-bold
          "
        >
          非表示中
        </span>
      </div>
    )}

      {song.practicing && (
        <div className="mb-3 text-center">
          <span
            className="
              bg-yellow-400
              text-black
              px-3
              py-1
              rounded
              font-bold
            "
          >
            練習中
          </span>
        </div>
      )}

      <div className="text-center">

        {settings?.title_kana &&
          song.title_kana && (
            <div
              className="
                text-[10px]
                text-gray-500
              "
            >
              {song.title_kana}
            </div>
          )}

        <div
          className="
            text-[18px]
            font-bold
          "
        >
          {song.title}
        </div>

        {settings?.artist_kana &&
          song.artist_kana && (
            <div
              className="
                mt-2
                text-[10px]
                text-gray-500
              "
            >
              {song.artist_kana}
            </div>
          )}

        {settings?.artist && (
          <div
            className="
              text-[18px]
              font-bold
            "
          >
            {song.artist}
          </div>
        )}

      </div>

      <div className="mt-4 space-y-1">

        {settings?.lyricist &&
          song.lyricist && (
            <div>
              作詞:
              {" "}
              {song.lyricist}
            </div>
          )}

        {settings?.composer &&
          song.composer && (
            <div>
              作曲:
              {" "}
              {song.composer}
            </div>
          )}

        {settings?.arranger &&
          song.arranger && (
            <div>
              編曲:
              {" "}
              {song.arranger}
            </div>
          )}

        {settings?.album &&
          song.album && (
            <div>
              アルバム:
              {" "}
              {song.album}
            </div>
          )}

        {settings?.release_date &&
          song.release_date && (
            <div>
              リリース日:
              {" "}
              {song.release_date}
            </div>
          )}

        {settings?.genre &&
          song.genre && (
            <div>
              ジャンル:
              {" "}
              {song.genre}
            </div>
          )}

        {settings?.audio_status &&
          song.audio_status && (
            <div>
              音源状態:
              {" "}
              {song.audio_status}
            </div>
          )}

        {settings?.youtube_status &&
          song.youtube_status && (
            <div>
              YouTube投稿状況:
              {" "}
              {song.youtube_status}
            </div>
          )}

        {settings?.notes &&
          song.notes && (
            <div>
              備考:
              {" "}
              {song.notes}
            </div>
          )}

        {settings?.other_info &&
          song.other_info && (
            <div>
              その他情報:
              {" "}
              {song.other_info}
            </div>
          )}

      </div>

      {settings?.lyrics &&
        song.lyrics && (
          <details className="mt-3">
            <summary>
              歌詞
            </summary>

            <pre className="whitespace-pre-wrap mt-2">
              {song.lyrics}
            </pre>
          </details>
        )}

      <div
        className="
          mt-4
          flex
          justify-center
          items-center
          gap-4
        "
      >

        {settings?.video_url &&
          song.video_url && (
            <a
              href={song.video_url}
              target="_blank"
              rel="noreferrer"
              title="本人リンク"
              className="
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
            >
              🔗
            </a>
          )}

        <EditSong song={song} />

        <form action={deleteSongAction}>
          <input
            type="hidden"
            name="id"
            value={song.id}
          />

          <button
            type="submit"
            title="削除"
            className="
              border
              rounded-full
              w-10
              h-10
              flex
              items-center
              justify-center
              text-xl
              hover:bg-red-100
            "
          >
            🗑️
          </button>
        </form>

      </div>

    </li>
  );
}