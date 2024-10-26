import Link from "next/link";
import Header from "./components/Header";

export default function Home() {
  return (
    <main>
      <div>
        <h1>Page</h1>
        <Header />
        <Link href="/cards">
          <p className="text-blue-500 text-2xl">Go To Cards</p>
        </Link>
        <Link href="/profile">
          <p className="text-orange-950 text-xl">Перейти в профиль</p>
        </Link>
      </div>
    </main>
  );
}
