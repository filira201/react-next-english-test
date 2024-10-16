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
    throw new Error("Failed to fetch words by theme data.");
  }
};
