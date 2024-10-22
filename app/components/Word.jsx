"use client";

import { FaceSmileIcon } from "@heroicons/react/24/outline";

const Word = (props) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <label
          htmlFor={`card-word-english-${props.index + 1}`}
          className="mb-2 block text-sm font-medium"
        >
          English Word
        </label>
        <div className="relative">
          <input
            type="text"
            name={`english-${props.index + 1}`}
            placeholder="Enter English Words"
            id={`card-word-english-${props.index + 1}`}
            value={props.word.english}
            onChange={(e) =>
              props.onChangeEnglishWord({
                ...props.word,
                english: e.target.value,
              })
            }
            className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            required
          />
          <FaceSmileIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>

        <label
          htmlFor={`card-word-russian-${props.index + 1}`}
          className="mb-2 block text-sm font-medium"
        >
          Russian Word
        </label>
        <div className="relative">
          <input
            type="text"
            name={`russian-${props.index + 1}`}
            placeholder="Enter Russian Words"
            id={`card-word-russian-${props.index + 1}`}
            value={props.word.russian}
            onChange={(e) =>
              props.onChangeRussianWord({
                ...props.word,
                russian: e.target.value,
              })
            }
            className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            required
          />
          <FaceSmileIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <button
          onClick={() => props.onDeleteWord(props.word.id)}
          className="bg-red-500  text-white p-1 rounded-md hover:bg-red-600 text-sm"
          type="button"
        >
          Delete Word
        </button>
      </div>
    </div>
  );
};

export default Word;
