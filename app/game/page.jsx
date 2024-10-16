import MainCardsWrapper from "../components/MainCardsWrapper";
import { fetchThemes } from "../lib/data";

const Page = async () => {
  const themes = await fetchThemes();

  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Game English</h1>
      <div className="grid p-10 gap-6 grid-cols-4">
        <MainCardsWrapper themes={themes} />
      </div>
    </main>
  );
};

export default Page;
