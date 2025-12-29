import { useNavigate } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div
        className="
          w-full max-w-xl
          border border-blue-dark/50
          bg-gradient-to-br from-blue-light via-blue-base to-white
          rounded-2xl
          shadow-sm
          p-6 sm:p-8
          text-center
        "
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-dark mb-3">
          Error!
        </h1>

        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Looks like you’re lost or the page doesn’t exist.
        </p>

        <button
          onClick={() => navigate("/")}
          className="
            inline-flex items-center gap-2
            h-9 px-4
            rounded-md
            bg-blue-dark text-white
            text-sm font-medium
            hover:bg-blue-dark/90
            transition-colors
          "
        >
          <HiOutlineHome className="text-lg" />
          <span>Go to homepage</span>
        </button>
      </div>
    </div>
  );
};

export default Error;
