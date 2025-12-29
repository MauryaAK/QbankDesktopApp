import React, { useState } from "react";
import Modal from "../common/Modal";

const DocumentCard = ({ data }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="border rounded-md p-2 bg-white">
        <p className="text-xs font-medium text-gray-800 mb-1">
          {data?.docType}
        </p>

        <img src={data.url} className="h-24 bg-gray-200 rounded-md
                        flex items-center justify-center
                        text-xs text-gray-500"

        />

        <p className="text-[11px] text-gray-600 mt-1">
          Uploaded by Passenger • {data?.dateTime}
        </p>


        <button
          onClick={() => setOpen(true)}
          className="mt-1 text-xs px-2 py-0.5
                     border rounded-md hover:bg-gray-100"
        >
          View full
        </button>
      </div>

      {/* Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={data?.docType}
      >
        {/* Replace with real doc */}
        <div className="flex justify-center">
          <img
            src={data.url}
            alt={data?.docType}
            className="rounded-lg shadow-md max-h-[70vh]"
          />
        </div>
      </Modal>
    </>
  );
};

export default DocumentCard;
