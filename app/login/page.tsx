import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
  }>;
}) {
  const params =
    await searchParams;

  return (
    <main
      className="
        min-h-screen
        flex
        items-center
        justify-center
        p-4
      "
    >
      <form
        action={login}
        className="
          border
          rounded
          p-6
          w-full
          max-w-md
          space-y-4
        "
      >
        <h1
          className="
            text-xl
            font-bold
          "
        >
          管理者ログイン
        </h1>

        {params.error && (
          <div
            className="
              text-red-600
            "
          >
            パスワードが違います
          </div>
        )}

        <input
          type="password"
          name="password"
          placeholder="パスワード"
          className="
            border
            p-2
            w-full
          "
        />

        <button
          type="submit"
          className="
            border
            px-4
            py-2
            w-full
          "
        >
          ログイン
        </button>
      </form>
    </main>
  );
}
