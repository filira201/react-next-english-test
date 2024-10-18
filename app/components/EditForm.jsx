import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "./Button";
import { updateCard } from "./../lib/actions";

export default function EditForm({ theme, words }) {
  const updateCardWithId = updateCard.bind(null, theme.id);

  return (
    <form action={updateCardWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label
            htmlFor="card-theme"
            className="mb-2 block text-sm font-medium"
          >
            Enter Card Theme
          </label>
          <div className="relative">
            <input
              type="text"
              name="cardTheme"
              placeholder="Enter Card Theme"
              id="card-theme"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={theme.name}
              required
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        {words.map((word, index) => {
          return (
            <div key={word.id} className="mb-4">
              <div className="flex justify-between">
                <label
                  htmlFor={`card-word-english-${index + 1}`}
                  className="mb-2 block text-sm font-medium"
                >
                  Enter English Word {index + 1}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name={`english-${index + 1}`}
                    placeholder="Enter English Words"
                    id={`card-word-english-${index + 1}`}
                    className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    defaultValue={word.english}
                    required
                  />

                  <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>

                <label
                  htmlFor={`card-word-russian-${index + 1}`}
                  className="mb-2 block text-sm font-medium"
                >
                  Enter Russian Word {index + 1}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name={`russian-${index + 1}`}
                    placeholder="Enter Russian Words"
                    id={`card-word-russian-${index + 1}`}
                    className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    defaultValue={word.russian}
                    required
                  />

                  <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/cards"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Card</Button>
      </div>
    </form>
  );
}
