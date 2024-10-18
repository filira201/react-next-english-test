import { fetchFilteredThemes } from "../lib/data";
import Card from "./Card";

const CardsTable = async ({ query, currentPage }) => {
  const themes = await fetchFilteredThemes(query, currentPage);

  return (
    <div>
      <div className="grid p-10 gap-6 grid-cols-4">
        {themes.map((theme) => {
          return <Card key={theme.id} {...theme} />;
        })}
      </div>
    </div>
  );
};

export default CardsTable;
