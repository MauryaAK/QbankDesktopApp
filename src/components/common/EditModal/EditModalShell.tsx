import React from "react";
import popupBgImage from "../../../assets/popupBgImage.png";
import popupLeftCircle from "../../../assets/popupLeftCircle.png";
import popupLeftTopCircle from "../../../assets/popupLeftTopCircle.png";
import popupRightBottomCircle from "../../../assets/popupRightBottomCircle.png";

interface EditModalShellProps {
  open: boolean;
  title: string;
  leftTitle: string;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit: () => void;
  loading?: boolean;
}

const EditModalShell: React.FC<EditModalShellProps> = ({
  open,
  title,
  leftTitle,
  children,
  onClose,
  onSubmit,
  loading,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">

      {/* OUTER CREAM CONTAINER */}
      <div className="
  relative
  w-full
  max-w-[1100px]
  h-[70vh]
  bg-[#F6EEDA]
  rounded-2xl
  p-4
">

        {/* MAIN WHITE CARD */}
        <div className="relative w-full h-full bg-white p-2 rounded-xl flex overflow-hidden">

          {/* ================= LEFT RED PANEL ================= */}
          <div className="relative w-[290px] overflow-hidden flex items-center justify-center">

            {/* GRID BACKGROUND */}
            <img
              src={popupBgImage}
              alt=""
              className="absolute inset-0 w-full h-full object-contain opacity-80 pointer-events-none"
            />

            {/* HUD CIRCLE */}
            <img
              src={popupLeftCircle}
              alt=""
              className="absolute bottom-16 left-1/2 -translate-x-1/2 w-44 opacity-90 pointer-events-none"
            />

            {/* INNER BORDER */}
            <div className="absolute  rounded-lg pointer-events-none" />

            {/* TITLE */}
            <div className="relative z-10 text-white text-lg font-semibold">
              {leftTitle}
            </div>
          </div>

          {/* ================= RIGHT CONTENT ================= */}
          <div className="relative flex-1 flex flex-col px-8 py-6 overflow-hidden">

            {/* DECORATIVE CIRCLES */}
            <img
              src={popupLeftTopCircle}
              alt=""
              className="absolute top-6 left-40 w-28 opacity-20 pointer-events-none"
            />
            <img
              src={popupRightBottomCircle}
              alt=""
              className="absolute right-10 bottom-10 w-72 opacity-20 pointer-events-none"
            />

            {/* CONTENT */}
            <div className="relative z-10 flex flex-col h-full">

              <div className="flex-1 overflow-y-auto pr-4">
                {children}
              </div>

              {/* FOOTER */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={onSubmit}
                  disabled={loading}
                  className="px-6 py-2 rounded-md bg-gradient-to-r from-[#DA0E29] to-[#740716] text-white"
                >
                  Update
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-md bg-gray-800 text-white"
                >
                  Cancel
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModalShell;
