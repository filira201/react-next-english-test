import { sql } from "@vercel/postgres";

export const fetchThemes = async () => {
  try {
    const data = await sql`SELECT * FROM themes`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch themes data.");
  }
};

export const fetchWordsById = async (id) => {
  try {
    const data = await sql`SELECT w.id, w.english, w.russian
    FROM words w
    JOIN themes t ON w.theme_id = t.id
    WHERE t.id = ${id};
    `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch words by theme id.");
  }
};

export const fetchThemeById = async (id) => {
  try {
    const data = await sql`SELECT *
    FROM themes
    WHERE themes.id = ${id};
    `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch theme by id.");
  }
};

const ITEMS_PER_PAGE = 2;
export const fetchFilteredThemes = async (query, currentPage) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  let wordCapitalLetter;
  let wordSmallLetter;
  if (query) {
    wordCapitalLetter = query[0].toUpperCase() + query.toLowerCase().slice(1);
    wordSmallLetter = query[0].toLowerCase() + query.toLowerCase().slice(1);
  }

  try {
    const themes = await sql`
      SELECT *
      FROM themes
      WHERE name ILIKE ${`%${wordCapitalLetter}%`} OR name ILIKE ${`%${wordSmallLetter}%`} OR name ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return themes.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered themes.");
  }
};

export async function fetchThemesPages(query) {
  let wordCapitalLetter;
  let wordSmallLetter;
  if (query) {
    wordCapitalLetter = query[0].toUpperCase() + query.toLowerCase().slice(1);
    wordSmallLetter = query[0].toLowerCase() + query.toLowerCase().slice(1);
  }

  try {
    const count = await sql`SELECT COUNT(*)
    FROM themes
    WHERE name ILIKE ${`%${wordCapitalLetter}%`} OR name ILIKE ${`%${wordSmallLetter}%`} OR name ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of themes.");
  }
}
