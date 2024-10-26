import { signIn } from "next-auth/react";

export const AuthModal = ({ open, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {open && (
        <div>
          <div className="w-[450px] bg-white p-10">
            <button
              onClick={handleClose}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  signIn("github", {
                    callbackUrl: "/",
                    redirect: true,
                  })
                }
                type="button"
                className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
              >
                GitHub
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
