"use client";

export default function AutoFillButton() {
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

    alert(
      "自動入力APIは次に実装します"
    );
  }

  return (
    <button
      type="button"
      onClick={autoFill}
      className="
        border
        px-4
        py-2
      "
    >
      曲情報を自動入力
    </button>
  );
}


