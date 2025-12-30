// import React, {
//   useMemo,
//   useState,
//   forwardRef,
//   useImperativeHandle,
// } from "react";
// import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
// import {
//   DataGrid,
//   GridColDef,
//   useGridApiRef,
// } from "@mui/x-data-grid";
// import {
//   HiChevronDown,
//   HiChevronRight,
//   HiPencil,
//   HiArrowPath,
//   HiFlag,
// } from "react-icons/hi2";
// import {FiEdit} from 'react-icons/fi'

// import useIsMobile from "../hooks/useIsMobile";
// import MobileTableCards from "./common/MobileTableCards";
// import { styled } from "@mui/material/styles";

// import {
//   HiChevronLeft,
//   HiChevronDoubleLeft,
//   HiChevronDoubleRight,
// } from "react-icons/hi2";
// import ToggleRadio from "./common/ToggleRadio";

// /* ================= TOOLTIP ================= */

// const GradientTooltip = styled(({ className, ...props }: any) => (
//   <Tooltip {...props} classes={{ popper: className }} />
// ))(() => ({
//   [`& .${tooltipClasses.tooltip}`]: {
//     background:
//       "linear-gradient(135deg, #ffffff 0%, #fff5f5 60%, #fdeaea 100%)",
//     color: "#3a3a3a",
//     boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
//     borderRadius: "10px",
//     padding: "10px 14px",
//     fontSize: "13px",
//     lineHeight: 1.5,
//     maxWidth: 420,
//     border: "1px solid rgba(218,14,41,0.25)",
//   },
// }));

// const CellWithHoverTooltip = ({ value }: { value: any }) => {
//   if (value === null || value === undefined) return null;
//   return (
//     <GradientTooltip title={String(value)} arrow>
//       <span className="block truncate cursor-default">
//         {String(value)}
//       </span>
//     </GradientTooltip>
//   );
// };

// /* ================= TYPES ================= */

// export interface DataTableRef {
//   setSearch: (value: string) => void;
// }

// type ActionType = "edit" | "refresh" | "radio";

// interface ActionConfig {
//   edit?: boolean;
//   refresh?: boolean;
//   radio?: boolean;
// }

// interface DataTableProps {
//   columns: GridColDef[];
//   rows: any[];
//   visibleRows?: number;
//   actionConfig?: ActionConfig;

//   isExpandable?: boolean;
//   selectedRowId?: any,
//   renderExpandedRow?: (row: any) => React.ReactNode;
//   showExpandedColumn?: number[];

//   includeActionColumn?: boolean;
//   onStatusClick?: (row: any) => void;
//   onEditClick?: (row: any) => void;
//   onRefreshClick?: (row: any) => void;
//   onRadioSelect?: (row: any) => void;
// }

// /* ================= CONSTANTS ================= */


// /* ================= COMPONENT ================= */

// const DataTable = forwardRef<DataTableRef, DataTableProps>(
//   (
//     {
//       columns,
//       rows,
//       isExpandable = false,
//       visibleRows,
//       selectedRowId,
//       renderExpandedRow,
//       showExpandedColumn = [],
//       includeActionColumn = false,
//       onStatusClick,
//       onEditClick,
//       onRefreshClick,
//       onRadioSelect,
//       actionConfig
//     },
//     ref
//   ) => {
//     const isMobile = useIsMobile();
//     const apiRef = useGridApiRef();
//     const [expandedRowId, setExpandedRowId] = useState<
//       string | number | null
//     >(null);

//     /* 🔑 expose MUI search */
//     useImperativeHandle(ref, () => ({
//       setSearch(value: string) {
//         apiRef.current.setQuickFilterValues(
//           value ? [value] : []
//         );
//       },
//     }));
//     const ROW_HEIGHT = 32;
//     const HEADER_HEIGHT = 30;
//     const DEFAULT_PAGE_SIZE = 100;

//     const [pageSize, setPageSize] = useState(
//       visibleRows ?? DEFAULT_PAGE_SIZE
//     );
//     const getRowId = (row: any) => row.sno;

//     const computedRows = useMemo(() => {
//       if (!isExpandable || expandedRowId == null) return rows;

//       const index = rows.findIndex(
//         (r) => getRowId(r) === expandedRowId
//       );
//       if (index === -1) return rows;

//       const expandedRow = {
//         sno: `${expandedRowId}__expanded`,
//         __expanded: true,
//         parentRow: rows[index],
//       };

//       const copy = [...rows];
//       copy.splice(index + 1, 0, expandedRow);
//       return copy;
//     }, [rows, expandedRowId, isExpandable]);

//     const actionColumns: GridColDef[] = includeActionColumn
//       ? [
//         {
//           field: "__status",
//           headerName: "Status",
//           width: 90,
//           renderCell: (params) =>
//             params.row?.__expanded ? null : (
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onStatusClick?.(params.row);
//                 }}
//                 className="px-2 py-[2px] text-xs rounded-md border bg-green-400"
//               >
//                 Active
//               </button>
//             ),
//         },
//         {
//           field: "__action",
//           headerName: "Action",
//           width: 150,
//           renderCell: (params) =>
//   params.row?.__expanded ? null : (
//     <div className="flex gap-6 items-center">
      
//       {/* EDIT */}
//       {actionConfig?.edit && (
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onEditClick?.(params.row);
//           }}
//         >
//           <FiEdit size={20} />
//         </button>
//       )}

//       {/* REFRESH */}
//       {actionConfig?.refresh && (
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onRefreshClick?.(params.row);
//           }}
//         >
//           <HiArrowPath size={20} />
//         </button>
//       )}

//       {/* RADIO */}
//       {actionConfig?.radio && (
//         <ToggleRadio
//           size="xs"
//           checked={selectedRowId === params.row.id}
//           icon={<HiFlag size={12} />}
//           onChange={() => {
//             onRadioSelect?.(params.row);
//           }}
//         />
//       )}
//     </div>
//   ),

//         },
//       ]
//       : [];

//     const mergedColumns = useMemo<GridColDef[]>(() => {
//       const baseCols = columns.map((col, index) => ({
//         ...col,
//         renderCell: (params: any) => {
//           if (!params.row?.__expanded) {
//             return <CellWithHoverTooltip value={params.value} />;
//           }

//           if (showExpandedColumn.includes(index)) {
//             return (
//               <div className="w-full px-4 py-3">
//                 {renderExpandedRow?.(
//                   params.row.parentRow
//                 )}
//               </div>
//             );
//           }
//           return null;
//         },
//       }));

//       if (!isExpandable) {
//         return [...baseCols, ...actionColumns];
//       }

//       return [
//         ...baseCols,
//         ...actionColumns,
//         {
//           field: "__expand",
//           headerName: "",
//           width: 36,
//           renderCell: (params) => {
//             if (params.row?.__expanded) return null;

//             const rowId = getRowId(params.row);
//             const isOpen = expandedRowId === rowId;

//             return (
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setExpandedRowId(
//                     isOpen ? null : rowId
//                   );
//                 }}
//               >
//                 {isOpen ? (
//                   <HiChevronDown size={14} />
//                 ) : (
//                   <HiChevronRight size={14} />
//                 )}
//               </button>
//             );
//           },
//         },
//       ];
//     }, [
//       columns,
//       expandedRowId,
//       isExpandable,
//       actionColumns,
//     ]);

//     if (isMobile) {
//       return (
//         <MobileTableCards
//           columns={columns}
//           rows={rows}
//           slug=""
//           includeActionColumn={includeActionColumn}
//         />
//       );
//     }

//     return (

//       <div className="w-full h-full rounded-2xl p-[10px] shadow-sm flex flex-col overflow-hidden">
//         <div className="flex-1 overflow-hidden">
//           <DataGrid
//             apiRef={apiRef}
//             getRowId={getRowId}
//             rows={computedRows}
//             columns={mergedColumns}
//             hideFooter
//             autoHeight={false}
//             rowHeight={ROW_HEIGHT}
//             columnHeaderHeight={HEADER_HEIGHT}
//             disableRowSelectionOnClick
//             disableColumnFilter
//             disableDensitySelector
//             disableColumnSelector
//             disableColumnMenu
//             getRowHeight={(params) =>
//               params.model?.__expanded ? "auto" : ROW_HEIGHT
//             }
//             getRowClassName={(params) =>
//               params.row?.__expanded ? "expanded-row" : ""
//             }
//             sx={{
//               height: "100%",
//               border: "none",
//               background: "transparent",

//               /* ===== HEADER ===== */
//               "& .MuiDataGrid-columnHeaders": {
//                 background: "rgba(255,255,255,0.85)",
//                 borderRadius: "5px",
//                 marginBottom: "4px",
//                 minHeight: HEADER_HEIGHT,
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
//               },
//               "& .MuiDataGrid-columnHeaderTitle": {
//                 fontWeight: 600,
//               },

//               /* ===== ROW ===== */
//               "& .MuiDataGrid-row": {
//                 background: "rgba(255,255,255,0.55)",
//                 borderRadius: "10px",
//                 marginBottom: "6px",
//                 boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
//                 maxWidth: "100%",
//               },

//               "& .MuiDataGrid-row:hover": {
//                 background: "rgba(255,255,255,0.75)",
//               },

//               /* ===== CELL ===== */
//               "& .MuiDataGrid-cell": {
//                 borderBottom: "none",
//                 whiteSpace: "nowrap",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//               },

//               /* ===== EXPANDED ROW ===== */
//               "& .MuiDataGrid-row.expanded-row": {
//                 alignItems: "stretch",
//               },

//               "& .MuiDataGrid-row.expanded-row .MuiDataGrid-cell": {
//                 padding: 0,
//                 overflowX: "hidden",
//               },

//               "& .MuiDataGrid-main": {
//                 overflowX: "hidden",
//               },

//               "& .MuiDataGrid-virtualScroller": {
//                 overflowX: "hidden",
//               },

//               /* ===== SCROLLBAR ===== */
//               "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
//                 width: "4px",
//               },
//               "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
//                 backgroundColor: "#DA0E29",
//                 borderRadius: "6px",
//               },
//             }}
//           />
//         </div>


//         {/* ================= PAGINATION ================= */}
//         <div className="flex items-center justify-between px-2 pt-2 text-xs shrink-0">
//           <div className="flex items-center gap-2 text-gray-600">
//             Show
//             <select
//               value={pageSize}
//               onChange={(e) => {
//                 // setPageSize(Number(e.target.value));
//                 // setPage(0);
//               }}
//               className="rounded-md border px-2 py-1 bg-white"
//             >
//               {[100, 150, 200].map((n) => (
//                 <option key={n} value={n}>
//                   {n}
//                 </option>
//               ))}
//             </select>
//             records
//           </div>

//           <div className="flex gap-1">
//             <PaginationButton icon={<HiChevronDoubleLeft />} disabled />
//             <PaginationButton icon={<HiChevronLeft />} disabled />
//             <PaginationButton icon={<HiChevronRight />} disabled />
//             <PaginationButton icon={<HiChevronDoubleRight />} disabled />
//           </div>
//         </div>
//       </div>
//     );
//   }
// );
// const PaginationButton = ({ icon, disabled }: any) => (
//   <button
//     disabled={disabled}
//     className={`p-2 rounded-md border text-sm ${disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-white"
//       }`}
//   >
//     {icon}
//   </button>
// );

// export default DataTable;











import React, {
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
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

/* ================= TOOLTIP ================= */

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
}

/* ================= COMPONENT ================= */

const DataTable = forwardRef<DataTableRef, DataTableProps>(
  (
    {
      columns,
      rows,
      isExpandable = false,
      visibleRows,
      selectedRowId,
      renderExpandedRow,
      showExpandedColumn = [],
      includeActionColumn = false,
      onStatusClick,
      onEditClick,
      onRefreshClick,
      onRadioSelect,
      actionConfig,
    },
    ref
  ) => {
    const isMobile = useIsMobile();
    const apiRef = useGridApiRef();

    const [expandedRowId, setExpandedRowId] = useState<
      string | number | null
    >(null);

    useImperativeHandle(ref, () => ({
      setSearch(value: string) {
        apiRef.current.setQuickFilterValues(value ? [value] : []);
      },
    }));

    const ROW_HEIGHT = 32;
    const HEADER_HEIGHT = 30;
    const DEFAULT_PAGE_SIZE = 100;

    const [pageSize] = useState(
      visibleRows ?? DEFAULT_PAGE_SIZE
    );

    /* 🔑 USE id EVERYWHERE */
    const getRowId = (row: any) => row.id;

    const computedRows = useMemo(() => {
      if (!isExpandable || expandedRowId == null) return rows;

      const index = rows.findIndex(
        (r) => getRowId(r) === expandedRowId
      );
      if (index === -1) return rows;

      const expandedRow = {
        id: `${expandedRowId}__expanded`,
        __expanded: true,
        parentRow: rows[index],
      };

      const copy = [...rows];
      copy.splice(index + 1, 0, expandedRow);
      return copy;
    }, [rows, expandedRowId, isExpandable]);

    const actionColumns: GridColDef[] = includeActionColumn
      ? [
          {
            field: "__status",
            headerName: "Status",
            width: 90,
            renderCell: (params) =>
              params.row?.__expanded ? null : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusClick?.(params.row);
                  }}
                  className="px-2 py-[2px] text-xs rounded-md border bg-green-400"
                >
                  Active
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
                      checked={selectedRowId === params.row.id}
                      icon={<HiFlag size={12} />}
                      onChange={() => {
                        onRadioSelect?.(params.row);
                      }}
                    />
                  )}
                </div>
              ),
          },
        ]
      : [];

    const mergedColumns = useMemo<GridColDef[]>(() => {
      const baseCols = columns.map((col, index) => ({
        ...col,
        renderCell: (params: any) => {
          if (!params.row?.__expanded) {
            return <CellWithHoverTooltip value={params.value} />;
          }

          if (showExpandedColumn.includes(index)) {
            return (
              <div className="w-full px-4 py-3">
                {renderExpandedRow?.(
                  params.row.parentRow
                )}
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
                {isOpen ? (
                  <HiChevronDown size={14} />
                ) : (
                  <HiChevronRight size={14} />
                )}
              </button>
            );
          },
        },
      ];
    }, [
      columns,
      expandedRowId,
      isExpandable,
      actionColumns,
    ]);

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
      <div className="w-full h-full rounded-2xl p-[10px] shadow-sm flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <DataGrid
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
            sx={{
              height: "100%",
              border: "none",
              background: "transparent",
            }}
          />
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex items-center justify-between px-2 pt-2 text-xs shrink-0">
          <div className="flex items-center gap-2 text-gray-600">
            Show
            <select
              value={pageSize}
              className="rounded-md border px-2 py-1 bg-white"
            >
              {[100, 150, 200].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            records
          </div>

          <div className="flex gap-1">
            <PaginationButton icon={<HiChevronDoubleLeft />} disabled />
            <PaginationButton icon={<HiChevronLeft />} disabled />
            <PaginationButton icon={<HiChevronRight />} disabled />
            <PaginationButton icon={<HiChevronDoubleRight />} disabled />
          </div>
        </div>
      </div>
    );
  }
);

const PaginationButton = ({ icon, disabled }: any) => (
  <button
    disabled={disabled}
    className={`p-2 rounded-md border text-sm ${
      disabled
        ? "opacity-40 cursor-not-allowed"
        : "hover:bg-white"
    }`}
  >
    {icon}
  </button>
);

export default DataTable;
