import Pagination from "../../components/Pagination";
import CardsTable from "../../components/CardsTable";
import Search from "../../components/Search";
import { CreateCard } from "../../components/Buttons";
import Link from "next/link";
import { fetchThemesPagesByEmail } from "../../lib/data";
import { getUserSession } from "@/app/lib/getUserSession";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }) {
  const session = await getUserSession();

  if (!session) {
    return redirect("/");
  }

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalThemes = await fetchThemesPagesByEmail(query, session?.email);

  console.log(totalThemes);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl">English Cards</h1>
        </Link>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search cards..." />
        <CreateCard />
      </div>
      <CardsTable session={session} query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalThemes={totalThemes} />
      </div>
    </div>
  );
}
