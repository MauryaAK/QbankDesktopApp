import React, {
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  GridCellModesModel,
  GridCellModes,
} from "@mui/x-data-grid";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import {
  DataGrid,
  GridColDef,
  useGridApiRef,
} from "@mui/x-data-grid";
import {
  HiChevronDown,
  HiChevronRight,
  HiArrowPath,
  HiFlag,
  HiChevronLeft,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
} from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";

import useIsMobile from "../hooks/useIsMobile";
import MobileTableCards from "./common/MobileTableCards";
import { styled } from "@mui/material/styles";
import ToggleRadio from "./common/ToggleRadio";


const GradientTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background:
      "linear-gradient(135deg, #ffffff 0%, #fff5f5 60%, #fdeaea 100%)",
    color: "#3a3a3a",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "13px",
    lineHeight: 1.5,
    maxWidth: 420,
    border: "1px solid rgba(218,14,41,0.25)",
  },
}));

const CellWithHoverTooltip = ({ value }: { value: any }) => {
  if (value === null || value === undefined) return null;
  return (
    <GradientTooltip title={String(value)} arrow>
      <span className="block truncate cursor-default">
        {String(value)}
      </span>
    </GradientTooltip>
  );
};

/* ================= TYPES ================= */

export interface DataTableRef {
  setSearch: (value: string) => void;
}

interface ActionConfig {
  edit?: boolean;
  refresh?: boolean;
  radio?: boolean;
  questionStatus?: boolean;
}

interface DataTableProps {
  columns: GridColDef[];
  rows: any[];
  visibleRows?: number;
  actionConfig?: ActionConfig;

  isExpandable?: boolean;
  selectedRowId?: any;
  renderExpandedRow?: (row: any) => React.ReactNode;
  showExpandedColumn?: number[];

  includeActionColumn?: boolean;
  onStatusClick?: (row: any) => void;
  onEditClick?: (row: any) => void;
  onRefreshClick?: (row: any) => void;
  onRadioSelect?: (row: any) => void;
  onQuestionStatusChange?: (row: any) => void;
  onRowsEditChange?: (rows: any[]) => void;
}

/* ================= COMPONENT ================= */

const AtaDataTable = forwardRef<DataTableRef, DataTableProps>(
  (
    {
      columns,
      rows,
      isExpandable = false,
      visibleRows,
      renderExpandedRow,
      showExpandedColumn = [],
      includeActionColumn = false,
      onStatusClick,
      onEditClick,
      onRefreshClick,
      onRadioSelect,
      actionConfig,
      onQuestionStatusChange,
      onRowsEditChange
    },
    ref
  ) => {
    const [updatedValues, setUpdatedValues] = useState([])


    const totalDuration = useMemo(() => updatedValues.reduce((sum, item) => sum + (item.duration ?? 0), 0), [updatedValues]);
    const totalS1 = useMemo(() => updatedValues.reduce((sum, item) => sum + (item.S1 ?? 0), 0), [updatedValues]);
    const totalS2 = useMemo(() => updatedValues.reduce((sum, item) => sum + (item.S2 ?? 0), 0), [updatedValues]);
    const totalS3 = useMemo(() => updatedValues.reduce((sum, item) => sum + (item.S3 ?? 0), 0), [updatedValues]);

    const isMobile = useIsMobile();
    const apiRef = useGridApiRef();
    const [cellModesModel, setCellModesModel] =
      useState<GridCellModesModel>({});
    const ROW_HEIGHT = 28;
    const HEADER_HEIGHT = 30;
    const DEFAULT_PAGE_SIZE = 50;

    /* ================= PAGINATION STATE ================= */
    const [pageSize, setPageSize] = useState(
      visibleRows ?? DEFAULT_PAGE_SIZE
    );
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(rows.length / pageSize);
    const [editedRowsMap, setEditedRowsMap] = useState<
      Record<string | number, any>
    >({});
    const getRowId = (row: any) => row.id;
    const applyDurationMapping = (row: any) => {
      const duration = Number(row.duration) || 0;

      return {
        ...row,
        S1: row.complexity === 1 || row.complexity === 0 ? duration : 0,
        S2: row.complexity === 2 ? duration : 0,
        S3: row.complexity === 3 ? duration : 0,
      };
    };

    const mergedRowsWithEdits = useMemo(() => {
      if (!Object.keys(editedRowsMap).length) return rows;

      return rows.map((row) => {
        const id = getRowId(row);
        return editedRowsMap[id] ? editedRowsMap[id] : row;
      });
    }, [rows, editedRowsMap]);

    // const paginatedBaseRows = useMemo(() => {
    //   const start = (currentPage - 1) * pageSize;
    //   const end = start + pageSize;
    //   return rows.slice(start, end);
    // }, [rows, currentPage, pageSize]);
    const paginatedBaseRows = useMemo(() => {
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      return mergedRowsWithEdits.slice(start, end);
    }, [mergedRowsWithEdits, currentPage, pageSize]);


    const [expandedRowId, setExpandedRowId] = useState<
      string | number | null
    >(null);


    useImperativeHandle(ref, () => ({
      setSearch(value: string) {
        apiRef.current.setQuickFilterValues(value ? [value] : []);
      },
    }));

    /* 🔑 USE id EVERYWHERE */

    const computedRows = useMemo(() => {
      if (!isExpandable || expandedRowId == null)
        return paginatedBaseRows;

      const index = paginatedBaseRows.findIndex(
        (r) => getRowId(r) === expandedRowId
      );
      if (index === -1) return paginatedBaseRows;

      const expandedRow = {
        id: `${expandedRowId}__expanded`,
        __expanded: true,
        parentRow: paginatedBaseRows[index],
      };

      const copy = [...paginatedBaseRows];
      copy.splice(index + 1, 0, expandedRow);
      return copy;
    }, [paginatedBaseRows, expandedRowId, isExpandable]);



    // const processRowUpdate = (newRow: any, oldRow: any) => {
    //   if (JSON.stringify(newRow) !== JSON.stringify(oldRow)) {
    //     setEditedRowsMap((prev) => {
    //       const updated = {
    //         ...prev,
    //         [getRowId(newRow)]: newRow,
    //       };

    //       onRowsEditChange?.(Object.values(updated));
    //       return updated;
    //     });
    //   }

    //   return newRow; // MUST return row
    // };

    const processRowUpdate = (newRow: any, oldRow: any) => {
      let updatedRow = { ...newRow };

      const durationChanged = newRow.duration !== oldRow.duration;
      const complexityChanged = newRow.complexity !== oldRow.complexity;

      if (durationChanged || complexityChanged) {
        const duration = Number(newRow.duration) || 0;

        updatedRow = {
          ...updatedRow,
          S1: 0,
          S2: 0,
          S3: 0,
        };

        if (newRow.complexity === 1 || newRow.complexity === 0) {
          updatedRow.S1 = duration;
        }

        if (newRow.complexity === 2) {
          updatedRow.S2 = duration;
        }

        if (newRow.complexity === 3) {
          updatedRow.S3 = duration;
        }
      }

      // Track edited rows
      if (JSON.stringify(updatedRow) !== JSON.stringify(oldRow)) {
        setEditedRowsMap((prev) => {
          const updated = {
            ...prev,
            [getRowId(updatedRow)]: updatedRow,
          };

          onRowsEditChange?.(Object.values(updated));
          setUpdatedValues(Object.values(updated))
          return updated;
        });
      }

      return updatedRow; // 🔑 REQUIRED
    };

    /* ================= ACTION COLUMNS ================= */

    const actionColumns: GridColDef[] = includeActionColumn
      ? [
        {
          field: "isActive",
          headerName: "Status",
          width: 90,
          renderCell: (params) =>
            params.row?.__expanded ? null : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusClick?.(params.row);
                }}
                className={`
        px-3 py-[2px] text-xs font-semibold rounded-full border
        transition-colors duration-150
        ${params.row?.isActive
                    ? "bg-green-100 text-green-700 border-green-400 hover:bg-green-200"
                    : "bg-red-100 text-red-700 border-red-400 hover:bg-red-200"
                  }
      `}
              >
                {params.row?.isActive ? "Active" : "Inactive"}
              </button>
            ),

        },
        {
          field: "__action",
          headerName: "Action",
          width: 150,
          renderCell: (params) =>
            params.row?.__expanded ? null : (
              <div className="flex gap-6 items-center">
                {actionConfig?.edit && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditClick?.(params.row);
                    }}
                  >
                    <FiEdit size={20} />
                  </button>
                )}

                {actionConfig?.refresh && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRefreshClick?.(params.row);
                    }}
                  >
                    <HiArrowPath size={20} />
                  </button>
                )}

                {actionConfig?.radio && (
                  <ToggleRadio
                    size="xs"
                    checked={params.row.isActive}
                    icon={<HiFlag size={12} />}
                    onChange={() => {
                      onRadioSelect?.(params.row);
                    }}
                  />
                )}
                {actionConfig?.questionStatus && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuestionStatusChange(params.row);
                    }}
                    className={`
                      w-16
      px-3 py-[2px] text-xs font-semibold rounded-full border
      transition-colors
      ${params.row.isChecked
                        ? "bg-green-100 text-green-700 border-green-400"
                        : "bg-red-100 text-red-700 border-red-400"
                      }
    `}
                  >
                    {params.row.isChecked ? "OK" : "Not OK"}
                  </button>
                )}
              </div>
            ),
        },
      ]
      : [];

    // const mergedColumns = useMemo<GridColDef[]>(() => {
    //   const baseCols = columns.map((col, index) => ({
    //     ...col,
    //     renderCell: (params: any) => {
    //       if (params.colDef.editable) {
    //         return params.value; // 🔑 allow MUI editor
    //       }
    //       if (!params.row?.__expanded) {
    //         return <CellWithHoverTooltip value={params.value} />;
    //       }

    //       if (showExpandedColumn.includes(index)) {
    //         return (
    //           <div className="w-full px-4 py-3">
    //             {renderExpandedRow?.(
    //               params.row.parentRow
    //             )}
    //           </div>
    //         );
    //       }
    //       return null;
    //     },
    //   }));

    //   if (!isExpandable) {
    //     return [...baseCols, ...actionColumns];
    //   }

    //   return [
    //     ...baseCols,
    //     ...actionColumns,
    //     {
    //       field: "__expand",
    //       headerName: "",
    //       width: 36,
    //       renderCell: (params) => {
    //         if (params.row?.__expanded) return null;

    //         const rowId = getRowId(params.row);
    //         const isOpen = expandedRowId === rowId;

    //         return (
    //           <button
    //             onClick={(e) => {
    //               e.stopPropagation();
    //               setExpandedRowId(isOpen ? null : rowId);
    //             }}
    //           >
    //             {isOpen ? (
    //               <HiChevronDown size={14} />
    //             ) : (
    //               <HiChevronRight size={14} />
    //             )}
    //           </button>
    //         );
    //       },
    //     },
    //   ];
    // }, [
    //   columns,
    //   expandedRowId,
    //   isExpandable,
    //   actionColumns,
    // ]);


    const mergedColumns = useMemo<GridColDef[]>(() => {
      const baseCols = columns.map((col, index) => ({
        ...col,
        renderCell: col.renderCell
          ? col.renderCell
          : (params: any) => {
            if (params.colDef.editable) {
              return params.value;
            }

            if (!params.row?.__expanded) {
              return <CellWithHoverTooltip value={params.value} />;
            }

            if (showExpandedColumn.includes(index)) {
              return (
                <div className="w-full px-4 py-3">
                  {renderExpandedRow?.(params.row.parentRow)}
                </div>
              );
            }
            return null;
          },
      }));

      if (!isExpandable) {
        return [...baseCols, ...actionColumns];
      }

      return [
        ...baseCols,
        ...actionColumns,
        {
          field: "__expand",
          headerName: "",
          width: 36,
          renderCell: (params) => {
            if (params.row?.__expanded) return null;

            const rowId = getRowId(params.row);
            const isOpen = expandedRowId === rowId;

            return (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedRowId(isOpen ? null : rowId);
                }}
              >
                {isOpen ? <HiChevronDown size={14} /> : <HiChevronRight size={14} />}
              </button>
            );
          },
        },
      ];
    }, [columns, expandedRowId, isExpandable, actionColumns]);


    if (isMobile) {
      return (
        <MobileTableCards
          columns={columns}
          rows={rows}
          slug=""
          includeActionColumn={includeActionColumn}
        />
      );
    }

    return (
      <div className="w-full h-full rounded-2xl pt-[5px] px-[10px] shadow-sm flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <DataGrid
            processRowUpdate={processRowUpdate}
            apiRef={apiRef}
            getRowId={getRowId}
            rows={computedRows}
            columns={mergedColumns}
            hideFooter
            autoHeight={false}
            rowHeight={ROW_HEIGHT}
            columnHeaderHeight={HEADER_HEIGHT}
            disableRowSelectionOnClick
            disableColumnFilter
            disableDensitySelector
            disableColumnSelector
            disableColumnMenu
            getRowHeight={(params) =>
              params.model?.__expanded ? "auto" : ROW_HEIGHT
            }
            getRowClassName={(params) =>
              params.row?.__expanded ? "expanded-row" : ""
            }
            cellModesModel={cellModesModel}
            onCellModesModelChange={setCellModesModel}
            onCellClick={(params, event) => {
              if (params.field === "complexity") {
                event.stopPropagation();

                setCellModesModel((prev) => ({
                  ...prev,
                  [params.id]: {
                    ...prev[params.id],
                    complexity: { mode: GridCellModes.Edit },
                  },
                }));
              }
            }}
            // sx={{
            //   height: "100%",
            //   border: "none",
            //   background: "transparent",
            // }}

            sx={{
              height: "100%",
              border: "none",
              background: "transparent",

              /* ===== HEADER ===== */
              "& .MuiDataGrid-columnHeaders": {
                background: "rgba(255,255,255,0.85)",
                borderRadius: "5px",
                marginBottom: "4px",
                minHeight: HEADER_HEIGHT,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: 600,
              },

              /* ===== ROW ===== */
              "& .MuiDataGrid-row": {
                background: "rgba(255,255,255,0.55)",
                borderRadius: "10px",
                marginBottom: "6px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                maxWidth: "100%",
              },

              "& .MuiDataGrid-row:hover": {
                background: "rgba(255,255,255,0.75)",
              },

              /* ===== CELL ===== */
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              },

              /* ===== EXPANDED ROW ===== */
              "& .MuiDataGrid-row.expanded-row": {
                alignItems: "stretch",
              },

              "& .MuiDataGrid-row.expanded-row .MuiDataGrid-cell": {
                padding: 0,
                overflowX: "hidden",
              },

              "& .MuiDataGrid-main": {
                overflowX: "hidden",
              },

              "& .MuiDataGrid-virtualScroller": {
                overflowX: "hidden",
              },

              /* ===== SCROLLBAR ===== */
              "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
                width: "4px",
              },
              "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
                backgroundColor: "#DA0E29",
                borderRadius: "6px",
              },
              "& .MuiDataGrid-cell--editable": {
                border: "1px dashed #DA0E29",
                borderRadius: "6px",
                backgroundColor: "rgba(218,14,41,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: '1px',
                marginRight: '1px'
              },

              /* When cell is in edit mode */
              "& .MuiDataGrid-cell--editing": {
                border: "1px solid #DA0E29",
                backgroundColor: "#fff",
                boxShadow: "0 0 0 1px rgba(218,14,41,0.25)",
              },
              "& .MuiDataGrid-cell--editable::after": {
                fontSize: "10px",
                position: "absolute",
                right: "6px",
                opacity: 0.5,
              },

              "& .MuiDataGrid-cell--editing .MuiSelect-icon": {
                opacity: 1,
                visibility: "visible",
              },
            }}
          />
        </div>
        <div className="h-6 w-full bg-[#FDF1D2] flex border border-gray-300 rounded-lg text-[11px] text-gray-600 font-normal">
          <div className="h-full w-16 flex items-center justify-center  border-gray-300">
           
          </div>

          <div className="h-full w-24 flex items-center justify-center  border-gray-300">
           
          </div>

          <div className="h-full flex-[2] flex items-center justify-center  border-gray-300">
           
          </div>

          <div className="h-full w-16 flex items-center justify-center  border-gray-300">
           
          </div>

          <div className="h-full w-16 flex items-center justify-center  border-gray-300">
           
          </div>

          <div className="h-full w-16 flex items-center justify-center  border-gray-300">
           
          </div>

          <div className="h-full flex-1 flex items-center justify-center  border-gray-300 font-medium text-gray-700 tracking-tight">
          </div>

          <div className="h-full flex-1 flex items-center justify-center font-bold text-black">
            Total Duration -  {totalDuration}
          </div>

          <div className="h-full w-16 flex items-center justify-center  border-gray-300 font-semibold text-gray-700">
            {totalS1}
          </div>

          <div className="h-full w-16 flex items-center justify-center  border-gray-300 font-semibold text-gray-700">
            {totalS2}
          </div>

          <div className="h-full w-16 flex items-center justify-center font-semibold text-gray-700">
            {totalS3}
          </div>
        </div>


        <div className=" flex items-center justify-between px-3 pt-3 text-xs shrink-0 border-t border-gray-200">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-xs font-medium">Show</span>

            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="
        appearance-none
        h-7
        min-w-[70px]
        border
        border-gray-300
        bg-white
        px-3
        text-sm
        font-semibold
        text-gray-800
        shadow-sm
        cursor-pointer
        focus:outline-none
        focus:ring-1
        focus:ring-gray-400
      "
              >
                {[50, 75, 100].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              {/* caret */}
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-[9px]">
                ▼
              </span>
            </div>
          </div>


          {/* RIGHT: RECORD INFO + PAGINATION */}
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium whitespace-nowrap">
              Showing{" "}
              <span className="text-gray-900 font-semibold">
                {(currentPage - 1) * pageSize + 1}
              </span>
              –
              <span className="text-gray-900 font-semibold">
                {Math.min(currentPage * pageSize, rows.length)}
              </span>{" "}
              of{" "}
              <span className="text-gray-900 font-bold">
                {rows.length}
              </span>{" "}
              records
            </span>


            <div className="flex gap-1">
              <PaginationButton
                icon={<HiChevronDoubleLeft />}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              />
              <PaginationButton
                icon={<HiChevronLeft />}
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((p) => Math.max(1, p - 1))
                }
              />
              <PaginationButton
                icon={<HiChevronRight />}
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(totalPages, p + 1)
                  )
                }
              />
              <PaginationButton
                icon={<HiChevronDoubleRight />}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
              />
            </div>
          </div>
        </div>

      </div>
    );
  }
);

const PaginationButton = ({ icon, disabled, onClick }: any) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`
      h-8
      w-8
      flex
      items-center rounded-lg
      justify-center
      border
      text-gray-700
      transition-all
      ${disabled
        ? "border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed"
        : "border-gray-300 bg-white hover:bg-gray-100 hover:border-gray-400"
      }
    `}
  >
    {icon}
  </button>
);


export default AtaDataTable;
