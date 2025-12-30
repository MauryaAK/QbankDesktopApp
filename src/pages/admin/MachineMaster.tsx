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

import AlertModal from "../../components/common/AlertModal/AlertModal";
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
      message: `Are you sure you want to ${
        nextStatus ? "activate" : "deactivate"
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
      <div className="flex-1 mx-10 mt-3">
        <div className="flex flex-col flex-1 overflow-hidden">

          {/* ===== HEADER ===== */}
          <div className="flex items-center justify-between shrink-0 mt-[2%]">
            <div className="flex gap-2 items-center">
              <img src={questionBnkIcon} className="w-12 h-12" alt=""/>
              <span className="text-md font-extrabold text-black">
                Machine Master
              </span>
            </div>

            {/* ===== SEARCH ===== */}
            <div className="flex items-center w-[16%] h-8 rounded-xl bg-[#C3BFBF] px-2 mt-9">
              <img src={searchIcon} className="w-6 h-6" alt=""/>
              <input
                placeholder="Search"
                className="flex-1 bg-transparent px-3 text-sm focus:outline-none"
                onChange={(e) =>
                  tableRef.current?.setSearch(e.target.value)
                }
              />
            </div>
          </div>

          {/* ===== TABLE ===== */}
          <div className="flex overflow-hidden mt-7 h-[510px]">
            <DataTable
              ref={tableRef}
              columns={machineMaster}
              rows={rows}
              includeActionColumn
              actionConfig={{radio:true }}
              onRadioSelect={handleToggleClick} // 🔥 key line
            />
          </div>
        </div>
      </div>

      <Footer />

      {/* ===== CONFIRMATION ALERT ===== */}
      <AlertModal {...alert} />
    </div>
  );
};

export default MachineMaster;
