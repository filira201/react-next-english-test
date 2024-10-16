import Link from "next/link";

const Card = async ({ id, name }) => {
  return (
    <Link href={`/game/${id}`}>
      <div className="w-40 h-16 flex justify-center items-center bg-blue-300 rounded-xl">
        <p>{name}</p>
      </div>
    </Link>
  );
};

export default Card;
