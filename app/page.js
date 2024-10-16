import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <h1>Page </h1>
        <Link href="/game">
          <p className="text-blue-500">Go to game</p>
        </Link>
      </div>
    </main>
  );
}
