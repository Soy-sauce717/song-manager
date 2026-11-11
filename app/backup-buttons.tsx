"use client";

import { useRef } from "react";

export default function BackupButtons() {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  async function exportBackup() {
    try {
      const res = await fetch(
        "/api/backup/export"
      );

      if (!res.ok) {
        throw new Error(
          "バックアップ取得失敗"
        );
      }

      const data =
        await res.json();

      const jsonText =
        JSON.stringify(
          data,
          null,
          2
        );

      const blob =
        new Blob(
          [jsonText],
          {
            type:
              "application/json",
          }
        );

      const url =
        URL.createObjectURL(
          blob
        );

      const a =
        document.createElement(
          "a"
        );

      a.href = url;

      a.download =
        `song-manager-backup-${
          new Date()
            .toISOString()
            .slice(0, 10)
        }.json`;

      document.body.appendChild(
        a
      );

      a.click();

      a.remove();

      URL.revokeObjectURL(
        url
      );

      alert(
        "バックアップを出力しました"
      );
    } catch (error) {
      console.error(error);

      alert(
        "バックアップ出力に失敗しました"
      );
    }
  }

  function importBackup() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const text =
        await file.text();

      const data =
        JSON.parse(text);

      if (
        !data ||
        !Array.isArray(
          data.songs
        )
      ) {
        throw new Error(
          "バックアップ形式が不正です"
        );
      }

      const ok =
        window.confirm(
          [
            "バックアップを復元します。",
            "",
            "現在の曲データは",
            "バックアップ内容に置き換えられます。",
            "",
            "よろしいですか？",
          ].join("\n")
        );

      if (!ok) {
        return;
      }

      const res =
        await fetch(
          "/api/backup/import",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                data
              ),
          }
        );

      const result =
        await res.json();

      if (!res.ok) {
        throw new Error(
          result.error ??
            "復元失敗"
        );
      }

      alert(
        "バックアップを復元しました"
      );

      location.reload();
    } catch (error) {
      console.error(error);

      alert(
        "バックアップを読み込めませんでした。\n\n正しいバックアップファイルか確認してください。"
      );
    } finally {
      if (
        fileInputRef.current
      ) {
        fileInputRef.current.value =
          "";
      }
    }
  }

  return (
    <div className="flex gap-2 flex-wrap mb-4">
      <button
        type="button"
        onClick={exportBackup}
        className="
          border
          px-4
          py-2
          rounded
        "
      >
        バックアップ出力
      </button>

      <button
        type="button"
        onClick={importBackup}
        className="
          border
          px-4
          py-2
          rounded
        "
      >
        バックアップ読込
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        hidden
        onChange={
          handleFileChange
        }
      />
    </div>
  );
}