"use server";

import { v4 as uuidv4 } from "uuid";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { splitObjectIntoArrayPairs } from "./utils";

export const createCard = async (formData) => {
  const rawFormData = Object.fromEntries(formData.entries());

  const themeId = uuidv4();

  await sql`
    INSERT INTO themes (id, name)
    VALUES (${themeId}, ${rawFormData.cardTheme})
  `;

  await sql`
    INSERT INTO words (id, theme_id, english, russian)
    VALUES (${uuidv4()}, ${themeId}, ${rawFormData.englishFirst}, ${
    rawFormData.russianFirst
  })
  `;

  await sql`
    INSERT INTO words (id, theme_id, english, russian)
    VALUES (${uuidv4()}, ${themeId}, ${rawFormData.englishSecond}, ${
    rawFormData.russianSecond
  })
  `;

  revalidatePath("/cards");
  redirect("/cards");
};

export const updateCard = async (themeId, formData) => {
  const rawFormData = Object.fromEntries(formData.entries());
  const cardTheme = rawFormData.cardTheme;

  await sql`
    UPDATE themes
    SET name = ${cardTheme}
    WHERE id = ${themeId}
  `;

  revalidatePath("/cards");
  redirect("/cards");
};
