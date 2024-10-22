"use server";

import { v4 as uuidv4 } from "uuid";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createCard = async (words, formData) => {
  const rawFormData = Object.fromEntries(formData.entries());

  const themeId = uuidv4();
  try {
    await sql`
      INSERT INTO themes (id, name)
      VALUES (${themeId}, ${rawFormData.cardTheme})
    `;

    await Promise.all(
      words.map(
        (word) =>
          sql`
          INSERT INTO words (id, theme_id, english, russian)
          VALUES (${uuidv4()}, ${themeId}, ${word.english}, ${word.russian})
        `
      )
    );
    console.log("Theme and words insert successfully");
  } catch (error) {
    console.error("Error inster theme and words:", error);
  }

  revalidatePath("/cards");
  redirect("/cards");
};

export const updateCard = async (editedTheme, editedWords, words, formData) => {
  const rawFormData = Object.fromEntries(formData.entries());

  try {
    if (rawFormData.cardTheme !== editedTheme.name) {
      await sql`
        UPDATE themes
        SET name = ${rawFormData.cardTheme}
        WHERE id = ${editedTheme.id}
      `;
    }

    const existingWordsMap = new Map(
      editedWords.map((word) => [word.id, word])
    );

    const wordsToInsert = [];
    const wordsToUpdate = [];
    const newWordIds = new Set();

    words.forEach((word) => {
      newWordIds.add(word.id);

      if (!existingWordsMap.has(word.id)) {
        wordsToInsert.push(word);
      } else {
        const existingWord = existingWordsMap.get(word.id);
        if (
          existingWord.english !== word.english ||
          existingWord.russian !== word.russian
        ) {
          wordsToUpdate.push(word);
        }
      }
    });

    const wordsToDelete = editedWords.filter(
      (word) => !newWordIds.has(word.id)
    );

    if (wordsToDelete.length > 0) {
      await Promise.all(
        wordsToDelete.map(
          (word) =>
            sql`
            DELETE FROM words
            WHERE id = ${word.id}
          `
        )
      );
    }

    await Promise.all(
      wordsToInsert.map(
        (word) =>
          sql`
          INSERT INTO words (id, theme_id, english, russian)
          VALUES (${word.id}, ${editedTheme.id}, ${word.english}, ${word.russian})
        `
      )
    );

    await Promise.all(
      wordsToUpdate.map(
        (word) =>
          sql`
          UPDATE words
          SET english = ${word.english}, russian = ${word.russian}
          WHERE id = ${word.id}
        `
      )
    );
    console.log("Theme and words update successfully");
  } catch (error) {
    console.error("Error update theme and words:", error);
  }

  revalidatePath(`/cards/${editedTheme.id}/edit`);
  revalidatePath(`/cards/${editedTheme.id}/card`);
  revalidatePath("/cards");
  redirect("/cards");
};

export const deleteCard = async (id) => {
  try {
    await sql`DELETE FROM themes WHERE id = ${id}`;
    await sql`DELETE FROM words WHERE theme_id = ${id}`;

    console.log("Theme and words deleted successfully");
  } catch (error) {
    console.error("Error delete theme and words:", error);
  }

  revalidatePath("/cards");
};
