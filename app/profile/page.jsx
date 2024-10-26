import Link from "next/link";
import { getUserSession } from "../lib/getUserSession";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getUserSession();

  if (!session) {
    return redirect("/");
  }

  return (
    <main className="p-6">
      <h1>ЭТО Профиль</h1>
      <h2>ИМЯ {session?.name}</h2>
      <h2>Почта {session?.email}</h2>
      <img src={session?.image} alt="изображение пользователя" />
      <Link href="/">
        <p className="text-3xl">На главную</p>
      </Link>
    </main>
  );
}
