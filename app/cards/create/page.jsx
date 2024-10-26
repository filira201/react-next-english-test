import CreateFrom from "@/app/components/CreateForm";
import { getUserSession } from "@/app/lib/getUserSession";
import { fetchUserIdByEmail } from "@/app/lib/data";
import { redirect } from "next/navigation";


export default async function Page() {
  const session = await getUserSession();

  if (!session) {
    return redirect("/");
  }

  const userIdObject = await fetchUserIdByEmail(session?.email);
  console.log(userIdObject);

  return (
    <main className="p-6">
      <h1 className="text-2xl">Create Card</h1>
      <CreateFrom userId={userIdObject.id} />
    </main>
  );
}
