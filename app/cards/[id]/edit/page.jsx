import EditForm from "@/app/components/EditForm";
import { fetchThemeById, fetchWordsById } from "@/app/lib/data";

export default async function Page({ params }) {
  const id = params.id;
  const [theme, words] = await Promise.all([
    fetchThemeById(id),
    fetchWordsById(id),
  ]);

  return (
    <main>
      <p>Edit Card</p>
      <EditForm theme={theme[0]} words={words} />
    </main>
  );
}
