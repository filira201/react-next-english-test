import Quize from "@/app/components/Quize";
import { fetchWordsById } from "../../../lib/data";

const Page = async ({ params }) => {
  const id = params.id;
  const data = await fetchWordsById(id);

  return (
    <main className="h-screen flex items-center justify-center bg-[#6a5be2]">
      <Quize data={data} />
    </main>
  );
};

export default Page;
