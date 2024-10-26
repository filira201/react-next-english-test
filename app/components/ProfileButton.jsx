import { signOut, useSession } from "next-auth/react";

const ProfileButton = ({ onOpen }) => {
  const { data: session } = useSession();

  const handleOpen = () => {
    onOpen();
  };

  return (
    <div>
      {!session ? (
        <button
          onClick={handleOpen}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Войти
        </button>
      ) : (
        <button
          onClick={() =>
            signOut({
              callbackUrl: "/",
              redirect: true,
            })
          }
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Выйти
        </button>
      )}
    </div>
  );
};

export default ProfileButton;
