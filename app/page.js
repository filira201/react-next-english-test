import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <h1>Page</h1>
        <Link href="/cards">
          <p className="text-blue-500">Go To Cards</p>
        </Link>
      </div>
    </main>
  );
}
