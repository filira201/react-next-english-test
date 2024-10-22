import Pagination from "../../components/Pagination";
import CardsTable from "../../components/CardsTable";
import Search from "../../components/Search";
import { fetchThemesPages } from "../../lib/data";
import { CreateCard } from "../../components/Buttons";
import Link from "next/link";

export default async function Page({ searchParams }) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalThemes = await fetchThemesPages(query);

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
      <CardsTable query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalThemes={totalThemes} />
      </div>
    </div>
  );
}
