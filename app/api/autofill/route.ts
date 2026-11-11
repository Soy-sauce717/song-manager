import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  try {
    const {
      title,
      artist,
    } = await request.json();

    if (!title || !artist) {
      return NextResponse.json(
        {
          error:
            "曲名とアーティスト名を入力してください",
        },
        {
          status: 400,
        }
      );
    }

    const query = encodeURIComponent(
      `recording:"${title}" AND artist:"${artist}"`
    );

    const mbRes = await fetch(
      `https://musicbrainz.org/ws/2/recording/?query=${query}&fmt=json&limit=5`,
      {
        headers: {
          "User-Agent":
            "song-manager/1.0",
        },
      }
    );

    const mbData = await mbRes.json();

    const lyricists =
      new Set<string>();

    const composers =
      new Set<string>();

    const arrangers =
      new Set<string>();

    let releaseDate = "";

    const recordings =
      mbData.recordings || [];

    for (const recording of recordings.slice(0, 5)) {
      if (!recording?.id) {
        continue;
      }

      const detailRes =
        await fetch(
          `https://musicbrainz.org/ws/2/recording/${recording.id}?inc=artist-credits+releases+work-rels&fmt=json`,
          {
            headers: {
              "User-Agent":
                "song-manager/1.0",
            },
          }
        );

      const detail =
        await detailRes.json();

      const release =
        detail.releases?.[0]?.date;

      if (
        !releaseDate &&
        release
      ) {
        releaseDate = release;
      }

      const workIds =
        (
          detail.relations || []
        )
          .filter(
            (r: any) =>
              r.work?.id
          )
          .map(
            (r: any) =>
              r.work.id
          );

      for (const id of workIds.slice(
        0,
        5
      )) {
        const workRes =
          await fetch(
            `https://musicbrainz.org/ws/2/work/${id}?inc=artist-rels&fmt=json`,
            {
              headers: {
                "User-Agent":
                  "song-manager/1.0",
              },
            }
          );

        const work =
          await workRes.json();
console.log(
  JSON.stringify(
    work.relations,
    null,
    2
  )
);

        (
          work.relations || []
        ).forEach(
          (r: any) => {
            const name =
              r.artist?.name ||
              r["target-credit"];

            if (!name) {
              return;
            }

            console.log(
              "RELATION:",
              r.type,
              name
            );

            if (
              [
                "lyricist",
                "librettist",
              ].includes(r.type)
            ) {
              lyricists.add(
                name
              );
            }

            if (
              r.type ===
              "composer"
            ) {
              composers.add(
                name
              );
            }

            if (
              r.type ===
              "writer"
            ) {
              lyricists.add(
                name
              );

              composers.add(
                name
              );
            }

            if (
              [
                "arranger",
                "instrument arranger",
                "orchestrator",
                "vocal arranger",
                "audio arranger",
                "arrangement",
              ].includes(r.type)
            ) {
              arrangers.add(
                name
              );
            }
          }
        );
      }
    }

    const term =
      encodeURIComponent(
        `${title} ${artist}`
      );

    const itunesRes =
      await fetch(
        `https://itunes.apple.com/search?term=${term}&entity=song&limit=10&country=JP`
      );

    const itunes =
      await itunesRes.json();

    const track =
      itunes.results?.[0];

    console.log(
      "LYRICISTS:",
      Array.from(lyricists)
    );

    console.log(
      "COMPOSERS:",
      Array.from(composers)
    );

    console.log(
      "ARRANGERS:",
      Array.from(arrangers)
    );

    return NextResponse.json({
      title_kana: "",

      artist_kana: "",

      lyricist:
        Array.from(
          lyricists
        ).join("、"),

      composer:
        Array.from(
          composers
        ).join("、"),

      arranger:
        Array.from(
          arrangers
        ).join("、"),

      genre:
        track?.primaryGenreName ??
        "",

      release_date:
        releaseDate ||
        track?.releaseDate?.slice(
          0,
          10
        ) ||
        "",
    });
  } catch (error) {
    console.error(
      "AUTOFILL ERROR",
      error
    );

    return NextResponse.json(
      {
        error:
          "自動入力に失敗しました",
      },
      {
        status: 500,
      }
    );
  }
}