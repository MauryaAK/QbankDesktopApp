import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import DataTable, { DataTableRef } from "../../components/DataTable";
import Footer from "../../components/Footer";

import questionBnkIcon from "../../assets/questionBnkIcon.svg";
import searchIcon from "../../assets/searchIcon.svg";

import {
  getDeviceMaster,
  activateDevice,
} from "../../api/ApiCollection";

import { useAppSelector } from "../../hooks/reduxHooks";
import { withRowId } from "../../utils/withRowId";

import { AlertConfig } from "../../components/common/AlertModal/alert.types";

import { machineMaster } from "../../utils/tableColumns";

const MachineMaster = () => {
  const tableRef = useRef<DataTableRef>(null);
  const queryClient = useQueryClient();
  const userId = useAppSelector((s) => s.auth.user?.id);

  /* ================= STATE ================= */
  const [alert, setAlert] = useState<AlertConfig>({
    open: false,
    title: "",
    message: "",
    variant: "warning",
    showActionButtons: true,
  });

  const hideAlert = () =>
    setAlert((prev) => ({ ...prev, open: false }));

  /* ================= API ================= */

  const deviceQuery: any = useQuery({
    queryKey: ["deviceMaster", userId],
    queryFn: getDeviceMaster,
    enabled: !!userId,
  });

  const rows = useMemo(() => {
    return withRowId(deviceQuery.data?.devices ?? []);
  }, [deviceQuery.data?.devices]);

  /* ================= MUTATION ================= */

  const mutation = useMutation({
    mutationFn: activateDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deviceMaster"] });
    },
  });

  /* ================= TOGGLE HANDLER ================= */

  const handleToggleClick = (row: any) => {
    const nextStatus = !row.isActive;

    setAlert({
      open: true,
      title: "Confirm Action",
      message: `Are you sure you want to ${nextStatus ? "activate" : "deactivate"
        } this device?`,
      variant: "warning",
      showActionButtons: true,

      onConfirm: () => {
        mutation.mutate({
          deviceId: row.deviceId,
          isActive: nextStatus,
          userId,
        });
      },

      onCancel: () => {

      },

      onClose: hideAlert,
    });
  };

  /* ================= RENDER ================= */

  return (
    <div className="h-screen flex flex-col">
      <div className="mx-20">
        <div className="flex items-center justify-between shrink-0 mt-[1%] ">
          <div className="flex gap-6 items-center">
            <button
              onClick={() => console.log("Question Bank clicked")}
              className="flex items-center gap-2 focus:outline-none hover:opacity-80"
            >
              <img
                src={questionBnkIcon}
                alt="Question Bank"
                className="w-12 h-12"
              />
              <span className="text-md font-extrabold text-black">
                Machine Master
              </span>
            </button>


          </div>

          {/* ===== SEARCH (UI ONLY – NO LOGIC CHANGE) ===== */}
          <div
            className="
                  flex items-center
                  w-[17%] h-8
                  rounded-xl
                  bg-[#C3BFBF]
                  border border-red-200
                  shadow-sm
                  px-2
                  mt-6
                  mr-0
                "
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
              <img
                src={searchIcon}
                alt="Search"
                className="w-8 h-8 mr-16"
              />
            </div>

            <input

              placeholder="Search"
              className="
                    flex-1
                    bg-transparent
                    px-4
                    text-sm
                    placeholder-gray-600
                    focus:outline-none
                    focus:ring-0
                  "
              onChange={(e) =>
                tableRef.current?.setSearch(
                  e.target.value
                )
              }
            />
          </div>
        </div>

        <div className="flex overflow-hidden mt-7 h-[450px]">
          <DataTable
            ref={tableRef}
            columns={machineMaster}
            rows={rows}
            includeActionColumn
            actionConfig={{ radio: true }}
            onRadioSelect={handleToggleClick}
          />
        </div>
      </div>

      <Footer
        buttons={[
          { label: "Refresh", onClick: () => { } },
        ]}
      />


    </div>
  );
};

export default MachineMaster;
