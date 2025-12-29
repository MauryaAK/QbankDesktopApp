// import React, { useState } from "react";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import {
//   HiChevronLeft,
//   HiChevronRight,
//   HiChevronDoubleLeft,
//   HiChevronDoubleRight,
// } from "react-icons/hi2";

// import useIsMobile from "../hooks/useIsMobile";
// import MobileTableCards from "./common/MobileTableCards";

// /* ================= TYPES ================= */

// interface DataTableProps {
//   columns: GridColDef[];
//   rows: any[];
//   slug: string;
//   includeActionColumn: boolean;
//   visibleRows?: number;
// }

// /* ================= CONSTANTS ================= */

// const ROW_HEIGHT = 32;
// const HEADER_HEIGHT = 30;
// const DEFAULT_PAGE_SIZE = 100;

// /* ================= COMPONENT ================= */

// const DataTable: React.FC<DataTableProps> = ({
//   columns,
//   rows,
//   includeActionColumn,
//   visibleRows,
// }) => {
//   const isMobile = useIsMobile();

//   /* ===== PAGINATION STATE (LOGICAL ONLY) ===== */
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(
//     visibleRows ?? DEFAULT_PAGE_SIZE
//   );

//   const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));

//   if (isMobile) {
//     return (
//       <MobileTableCards
//         columns={columns}
//         rows={rows}
//         slug=""
//         includeActionColumn={includeActionColumn}
//       />
//     );
//   }

//   return (
//     <div className="w-full h-full rounded-2xl p-[10px] shadow-sm flex flex-col overflow-hidden">
//       {/* ================= TABLE ================= */}
//       <div className="flex-1 overflow-hidden">
//         <DataGrid
//           rows={rows} // ✅ IMPORTANT: NO slicing
//           columns={columns}
//           hideFooter
//           autoHeight={false}

//           rowHeight={ROW_HEIGHT}
//           columnHeaderHeight={HEADER_HEIGHT}

//           disableRowSelectionOnClick
//           disableColumnFilter
//           disableDensitySelector
//           disableColumnSelector
//           disableColumnMenu

//           sx={{
//             height: "100%",
//             border: "none",
//             background: "transparent",

//             /* ===== HEADER ===== */
// "& .MuiDataGrid-columnHeaders": {
//   background: "rgba(255,255,255,0.85)",
//   borderRadius: "12px",
//   margin: "6px",
//   marginBottom: "8px",
//   minHeight: HEADER_HEIGHT,
//   boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
// },

//             "& .MuiDataGrid-columnHeaderTitle": {
//               fontSize: "10px",
//               fontWeight: 600,
//               textTransform: "uppercase",
//               color: "#555",
//             },

//             "& .MuiDataGrid-iconSeparator": {
//               display: "none",
//             },

//             /* ===== SCROLL (VERTICAL ONLY) ===== */
//             "& .MuiDataGrid-virtualScroller": {
//               overflowY: "auto",
//               overflowX: "hidden",
//               padding: "0 6px 6px",
//             },

//             "& .MuiDataGrid-main": {
//               overflowX: "hidden",
//             },

//             /* ===== ROW ===== */
// "& .MuiDataGrid-row": {
//   background: "rgba(255,255,255,0.55)",
//   borderRadius: "10px",
//   marginBottom: "6px",
//   boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
// },

// "& .MuiDataGrid-row:hover": {
//   background: "rgba(255,255,255,0.75)",
// },

// /* ===== CELL ===== */
// "& .MuiDataGrid-cell": {
//   fontSize: "11px",
//   padding: "4px 8px",
//   borderBottom: "none",
//   whiteSpace: "nowrap",
// },

// /* ===== THIN RED SCROLLBAR ===== */
// "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
//   width: "4px",
// },
// "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
//   backgroundColor: "#DA0E29",
//   borderRadius: "6px",
// },
// "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
//   background: "transparent",
// },

//             scrollbarWidth: "thin",
//             scrollbarColor: "#DA0E29 transparent",
//           }}
//         />
//       </div>

//       {/* ================= BOTTOM CUSTOM PAGINATION ================= */}
// <div className="flex items-center justify-between px-2 pt-2 text-xs shrink-0">
//   {/* ===== RECORD COUNT ===== */}
//   <div className="flex items-center gap-2 text-gray-600">
//     Show
//     <select
//       value={pageSize}
//       onChange={(e) => {
//         setPageSize(Number(e.target.value));
//         setPage(0);
//       }}
//       className="rounded-md border px-2 py-1 bg-white"
//     >
//       {[10, 20, 50, 100].map((n) => (
//         <option key={n} value={n}>
//           {n}
//         </option>
//       ))}
//     </select>
//     records
//   </div>

//         {/* ===== PAGINATION CONTROLS (LOGICAL) ===== */}
//         <div className="flex items-center gap-1">
//           <PaginationButton
//             icon={<HiChevronDoubleLeft />}
//             disabled={page === 0}
//             onClick={() => setPage(0)}
//           />
//           <PaginationButton
//             icon={<HiChevronLeft />}
//             disabled={page === 0}
//             onClick={() => setPage((p) => Math.max(0, p - 1))}
//           />

//           <span className="px-3 text-gray-700">
//             Page {page + 1} of {pageCount}
//           </span>

//           <PaginationButton
//             icon={<HiChevronRight />}
//             disabled={page >= pageCount - 1}
//             onClick={() =>
//               setPage((p) => Math.min(pageCount - 1, p + 1))
//             }
//           />
//           <PaginationButton
//             icon={<HiChevronDoubleRight />}
//             disabled={page >= pageCount - 1}
//             onClick={() => setPage(pageCount - 1)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ================= PAGINATION BUTTON ================= */

// const PaginationButton = ({
//   icon,
//   disabled,
//   onClick,
// }: {
//   icon: React.ReactNode;
//   disabled: boolean;
//   onClick: () => void;
// }) => (
//   <button
//     onClick={onClick}
//     disabled={disabled}
//     className={`p-2 rounded-md border text-sm
//       ${disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-white"}
//     `}
//   >
//     {icon}
//   </button>
// );

// export default DataTable;









// import React, { useMemo, useState } from "react";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import {
//   HiChevronDown,
//   HiChevronRight,
//   HiChevronLeft,
//   HiChevronDoubleLeft,
//   HiChevronDoubleRight,
// } from "react-icons/hi2";

// import useIsMobile from "../hooks/useIsMobile";
// import MobileTableCards from "./common/MobileTableCards";

// /* ================= TYPES ================= */

// interface DataTableProps {
//   columns: GridColDef[];
//   rows: any[];
//   slug: string;
//   includeActionColumn: boolean;
//   visibleRows?: number;

//   isExpandable?: boolean;
//   renderExpandedRow?: (row: any) => React.ReactNode;
// }

// /* ================= CONSTANTS ================= */

// const ROW_HEIGHT = 32;
// const HEADER_HEIGHT = 30;
// const DEFAULT_PAGE_SIZE = 100;

// /* ================= COMPONENT ================= */

// const DataTable: React.FC<DataTableProps> = ({
//   columns,
//   rows,
//   includeActionColumn,
//   visibleRows,
//   isExpandable = false,
//   renderExpandedRow,
// }) => {
//   const isMobile = useIsMobile();
//   const [expandedRowId, setExpandedRowId] = useState<
//     string | number | null
//   >(null);

//   const pageSize = visibleRows ?? DEFAULT_PAGE_SIZE;
//   const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));

//   /* ===== SAFE ROW INJECTION ===== */
//   const computedRows = useMemo(() => {
//     if (!isExpandable || expandedRowId == null) return rows;

//     const index = rows.findIndex((r) => r.id === expandedRowId);
//     if (index === -1) return rows;

//     const expandedRow = {
//       id: `${expandedRowId}__expanded`,
//       __expanded: true,
//       parentRow: rows[index],
//     };

//     const copy = [...rows];
//     copy.splice(index + 1, 0, expandedRow);
//     return copy;
//   }, [rows, expandedRowId, isExpandable]);

//   /* ===== ADD MINI EXPAND ICON COLUMN (RIGHT) ===== */
//   const mergedColumns = useMemo<GridColDef[]>(() => {
//     if (!isExpandable) return columns;

//     return [
//       ...columns,
//       {
//         field: "__expand",
//         headerName: "",
//         width: 36,
//         sortable: false,
//         filterable: false,
//         disableColumnMenu: true,
//         align: "center",
//         headerAlign: "center",
//         renderCell: (params) => {
//           if (params.row?.__expanded) return null;

//           const isOpen = expandedRowId === params.row.id;

//           return (
//             <button
//               type="button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setExpandedRowId(isOpen ? null : params.row.id);
//               }}
//               className="cursor-pointer"
//             >
//               {isOpen ? (
//                 <HiChevronDown size={14} />
//               ) : (
//                 <HiChevronRight size={14} />
//               )}
//             </button>
//           );
//         },
//       },
//     ];
//   }, [columns, isExpandable, expandedRowId]);

//   /* ===== MOBILE ===== */
//   if (isMobile) {
//     return (
//       <MobileTableCards
//         columns={columns}
//         rows={rows}
//         slug=""
//         includeActionColumn={includeActionColumn}
//       />
//     );
//   }

//   return (
//     <div className="w-full h-full rounded-2xl p-[10px] shadow-sm flex flex-col overflow-hidden">
//       {/* ===== TABLE ===== */}
//       <div className="flex-1 overflow-hidden">
//         <DataGrid
//           rows={computedRows}
//           columns={mergedColumns}
//           hideFooter
//           autoHeight={false}
//           rowHeight={ROW_HEIGHT}
//           columnHeaderHeight={HEADER_HEIGHT}
//           disableRowSelectionOnClick
//           disableColumnFilter
//           disableDensitySelector
//           disableColumnSelector
//           disableColumnMenu
//           sx={{
//             height: "100%",
//             border: "none",
//             background: "transparent",
//           }}
//           getRowHeight={(params) =>
//             params.model.__expanded ? "auto" : ROW_HEIGHT
//           }
//           componentsProps={{
//             row: {
//               style: { alignItems: "flex-start" },
//             },
//           }}
//           components={{
//             NoRowsOverlay: undefined,
//           }}
//           getCellClassName={(params) =>
//             params.row?.__expanded ? "w-full" : ""
//           }
//         />
//       </div>

//       {/* ===== EXPANDED CONTENT RENDER (NO STYLE CHANGE) ===== */}
//       {isExpandable && expandedRowId && (
//         <div className="hidden" />
//       )}

//       {/* ===== PAGINATION (UNCHANGED) ===== */}
//       <div className="flex items-center justify-between px-2 pt-2 text-xs shrink-0">
//         <span className="text-gray-600">
//           Page 1 of {pageCount}
//         </span>

//         <div className="flex gap-1">
//           <PaginationButton
//             icon={<HiChevronDoubleLeft />}
//             disabled
//             onClick={() => { }}
//           />
//           <PaginationButton
//             icon={<HiChevronLeft />}
//             disabled
//             onClick={() => { }}
//           />
//           <PaginationButton
//             icon={<HiChevronRight />}
//             disabled
//             onClick={() => { }}
//           />
//           <PaginationButton
//             icon={<HiChevronDoubleRight />}
//             disabled
//             onClick={() => { }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ================= PAGINATION BUTTON ================= */

// const PaginationButton = ({
//   icon,
//   disabled,
//   onClick,
// }: any) => (
//   <button
//     onClick={onClick}
//     disabled={disabled}
//     className={`p-2 rounded-md border text-sm
//       ${disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-white"}
//     `}
//   >
//     {icon}
//   </button>
// );

// export default DataTable;










// import React, { useMemo, useState } from "react";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import {
//   HiChevronDown,
//   HiChevronRight,
//   HiChevronLeft,
//   HiChevronDoubleLeft,
//   HiChevronDoubleRight,
// } from "react-icons/hi2";

// import useIsMobile from "../hooks/useIsMobile";
// import MobileTableCards from "./common/MobileTableCards";

// /* ================= TYPES ================= */

// interface DataTableProps {
//   columns: GridColDef[];
//   rows: any[];
//   slug: string;
//   includeActionColumn: boolean;
//   visibleRows?: number;

//   isExpandable?: boolean;
//   renderExpandedRow?: (row: any) => React.ReactNode;
// }

// /* ================= CONSTANTS ================= */

// const ROW_HEIGHT = 32;
// const HEADER_HEIGHT = 30;
// const DEFAULT_PAGE_SIZE = 100;

// /* ================= COMPONENT ================= */

// const DataTable: React.FC<DataTableProps> = ({
//   columns,
//   rows,
//   includeActionColumn,
//   visibleRows,
//   isExpandable = false,
//   renderExpandedRow,
// }) => {
//   const isMobile = useIsMobile();
//   const [expandedRowId, setExpandedRowId] = useState<
//     string | number | null
//   >(null);

//   const pageSize = visibleRows ?? DEFAULT_PAGE_SIZE;
//   const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));

//   /* ===== SAFE ROW INJECTION ===== */
//   const computedRows = useMemo(() => {
//     if (!isExpandable || expandedRowId == null) return rows;

//     const index = rows.findIndex((r) => r.id === expandedRowId);
//     if (index === -1) return rows;

//     const expandedRow = {
//       id: `${expandedRowId}__expanded`,
//       __expanded: true,
//       parentRow: rows[index],
//     };

//     const copy = [...rows];
//     copy.splice(index + 1, 0, expandedRow);
//     return copy;
//   }, [rows, expandedRowId, isExpandable]);

//   /* ===== COLUMNS (UNCHANGED + 1 CONTENT COLUMN) ===== */
//   const mergedColumns = useMemo<GridColDef[]>(() => {
//     if (!isExpandable) return columns;

//     const baseColumns = columns.map((col) => ({
//       ...col,
//       renderCell: (params: any) => {
//         if (params.row?.__expanded) return null;
//         return col.renderCell
//           ? col.renderCell(params)
//           : params.value;
//       },
//     }));

//     baseColumns.push({
//       field: "__expand",
//       headerName: "",
//       width: 36,
//       sortable: false,
//       filterable: false,
//       disableColumnMenu: true,
//       align: "center",
//       headerAlign: "center",
//       renderCell: (params) => {
//         if (params.row?.__expanded) return null;

//         const isOpen = expandedRowId === params.row.id;

//         return (
//           <button
//             type="button"
//             onClick={(e) => {
//               e.stopPropagation();
//               setExpandedRowId(isOpen ? null : params.row.id);
//             }}
//             className="cursor-pointer"
//           >
//             {isOpen ? (
//               <HiChevronDown size={14} />
//             ) : (
//               <HiChevronRight size={14} />
//             )}
//           </button>
//         );
//       },
//     });

//     baseColumns.push({
//       field: "__expanded_content",
//       headerName: "",
//       flex: 1,
//       sortable: false,
//       filterable: false,
//       renderCell: (params) => {
//         if (!params.row?.__expanded) return null;

//         return (
//           <div className="w-full">
//             {renderExpandedRow?.(params.row.parentRow)}
//           </div>
//         );
//       },
//     });

//     return baseColumns;
//   }, [columns, isExpandable, expandedRowId, renderExpandedRow]);

//   /* ===== MOBILE ===== */
//   if (isMobile) {
//     return (
//       <MobileTableCards
//         columns={columns}
//         rows={rows}
//         slug=""
//         includeActionColumn={includeActionColumn}
//       />
//     );
//   }

//   return (
//     <div className="w-full h-full rounded-2xl p-[10px] shadow-sm flex flex-col overflow-hidden">
//       <div className="flex-1 overflow-hidden">
//         <DataGrid
//           rows={computedRows}
//           columns={mergedColumns}
//           hideFooter
//           autoHeight={false}
//           rowHeight={ROW_HEIGHT}
//           columnHeaderHeight={HEADER_HEIGHT}
//           disableRowSelectionOnClick
//           disableColumnFilter
//           disableDensitySelector
//           disableColumnSelector
//           disableColumnMenu
//           getRowHeight={(params) =>
//             params.model?.__expanded ? "auto" : ROW_HEIGHT
//           }
//           sx={{
//             height: "100%",
//             border: "none",
//             background: "transparent",
//           }}
//         />
//       </div>

//       {/* ===== PAGINATION (UNCHANGED) ===== */}
//       <div className="flex items-center justify-between px-2 pt-2 text-xs shrink-0">
//         <span className="text-gray-600">
//           Page 1 of {pageCount}
//         </span>

//         <div className="flex gap-1">
//           <PaginationButton icon={<HiChevronDoubleLeft />} disabled onClick={() => {}} />
//           <PaginationButton icon={<HiChevronLeft />} disabled onClick={() => {}} />
//           <PaginationButton icon={<HiChevronRight />} disabled onClick={() => {}} />
//           <PaginationButton icon={<HiChevronDoubleRight />} disabled onClick={() => {}} />
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ================= PAGINATION BUTTON ================= */

// const PaginationButton = ({
//   icon,
//   disabled,
//   onClick,
// }: any) => (
//   <button
//     onClick={onClick}
//     disabled={disabled}
//     className={`p-2 rounded-md border text-sm
//       ${disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-white"}
//     `}
//   >
//     {icon}
//   </button>
// );

// export default DataTable;





















// import React, { useMemo, useState } from "react";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import {
//   HiChevronDown,
//   HiChevronRight,
//   HiChevronLeft,
//   HiChevronDoubleLeft,
//   HiChevronDoubleRight,
// } from "react-icons/hi2";

// import useIsMobile from "../hooks/useIsMobile";
// import MobileTableCards from "./common/MobileTableCards";

// /* ================= TYPES ================= */

// interface DataTableProps {
//   columns: GridColDef[];
//   rows: any[];
//   slug: string;
//   includeActionColumn: boolean;
//   visibleRows?: number;

//   isExpandable?: boolean;
//   renderExpandedRow?: (row: any) => React.ReactNode;
// }

// /* ================= CONSTANTS ================= */

// const ROW_HEIGHT = 32;
// const HEADER_HEIGHT = 30;
// const DEFAULT_PAGE_SIZE = 100;

// /* ================= COMPONENT ================= */

// const DataTable: React.FC<DataTableProps> = ({
//   columns,
//   rows,
//   includeActionColumn,
//   visibleRows,
//   isExpandable = false,
//   renderExpandedRow,
// }) => {
//   const isMobile = useIsMobile();
//   const [expandedRowId, setExpandedRowId] = useState<
//     string | number | null
//   >(null);

//   const pageSize = visibleRows ?? DEFAULT_PAGE_SIZE;
//   const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));

//   /* ===== ROW INJECTION ===== */
//   const computedRows = useMemo(() => {
//     if (!isExpandable || expandedRowId == null) return rows;

//     const index = rows.findIndex((r) => r.id === expandedRowId);
//     if (index === -1) return rows;

//     const expandedRow = {
//       id: `${expandedRowId}__expanded`,
//       __expanded: true,
//       parentRow: rows[index],
//     };

//     const copy = [...rows];
//     copy.splice(index + 1, 0, expandedRow);
//     return copy;
//   }, [rows, expandedRowId, isExpandable]);

//   /* ===== COLUMNS ===== */
//   const mergedColumns = useMemo<GridColDef[]>(() => {
//     if (!isExpandable) return columns;

//     return [
//       ...columns.map((col, colIndex) => ({
//         ...col,
//         renderCell: (params: any) => {
//           if (!params.row?.__expanded) {
//             return col.renderCell
//               ? col.renderCell(params)
//               : params.value;
//           }

//           // EXPANDED ROW → render content only in FIRST column
//           if (colIndex === 0) {
//             return (
//               <div className="w-full px-4 py-3">
//                 {renderExpandedRow?.(params.row.parentRow)}
//               </div>
//             );
//           }

//           return null;
//         },
//       })),
//       {
//         field: "__expand",
//         headerName: "",
//         width: 36,
//         sortable: false,
//         filterable: false,
//         disableColumnMenu: true,
//         align: "center",
//         headerAlign: "center",
//         renderCell: (params) => {
//           if (params.row?.__expanded) return null;

//           const isOpen = expandedRowId === params.row.id;

//           return (
//             <button
//               type="button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setExpandedRowId(isOpen ? null : params.row.id);
//               }}
//               className="cursor-pointer"
//             >
//               {isOpen ? (
//                 <HiChevronDown size={14} />
//               ) : (
//                 <HiChevronRight size={14} />
//               )}
//             </button>
//           );
//         },
//       },
//     ];
//   }, [columns, isExpandable, expandedRowId, renderExpandedRow]);
//   const gridKey = useMemo(
//     () => `${rows.length}-${expandedRowId ?? "none"}`,
//     [rows.length, expandedRowId]
//   );


//   /* ===== MOBILE ===== */
//   if (isMobile) {
//     return (
//       <MobileTableCards
//         columns={columns}
//         rows={rows}
//         slug=""
//         includeActionColumn={includeActionColumn}
//       />
//     );
//   }

//   return (
//     <div className="w-full h-full rounded-2xl p-[10px] shadow-sm flex flex-col overflow-hidden">
//       <div className="flex-1 overflow-hidden">
//         <DataGrid
//           key={gridKey}
//           rows={computedRows}
//           columns={mergedColumns}
//           hideFooter
//           disableVirtualization
//           autoHeight={false}
//           rowHeight={ROW_HEIGHT}
//           columnHeaderHeight={HEADER_HEIGHT}
//           disableRowSelectionOnClick
//           disableColumnFilter
//           disableDensitySelector
//           disableColumnSelector
//           disableColumnMenu
//           getRowHeight={(params) =>
//             params.model?.__expanded ? "auto" : ROW_HEIGHT
//           }
//           getRowClassName={(params) =>
//             params.row?.__expanded ? "expanded-row" : ""
//           }
//           sx={{
//             height: "100%",
//             border: "none",
//             background: "transparent",

//             /* ===== HEADER ===== */
//             "& .MuiDataGrid-columnHeaders": {
//               background: "rgba(255,255,255,0.85)",
//               borderRadius: "5px",
//               margin: "0px",
//               marginBottom: "4px",
//               minHeight: HEADER_HEIGHT,
//               boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
//             },

//             /* ===== ROW ===== */
//             "& .MuiDataGrid-row": {
//               background: "rgba(255,255,255,0.55)",
//               borderRadius: "10px",
//               marginBottom: "6px",
//               boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
//               maxWidth: "100%",
//             },

//             "& .MuiDataGrid-row:hover": {
//               background: "rgba(255,255,255,0.75)",
//             },

//             /* ===== CELL ===== */
//             "& .MuiDataGrid-cell": {
//               borderBottom: "none",
//               whiteSpace: "nowrap",
//               maxWidth: "100%",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//             },

//             /* ===== EXPANDED ROW FIX (NO X SCROLL) ===== */
//             "& .MuiDataGrid-row.expanded-row": {
//               alignItems: "stretch",
//               maxWidth: "100%",
//             },

//             "& .MuiDataGrid-row.expanded-row .MuiDataGrid-cell": {
//               padding: 0,
//               overflowX: "hidden",   // 🔑 prevent horizontal scroll
//               overflowY: "visible",
//               maxWidth: "100%",
//             },

//             "& .MuiDataGrid-row.expanded-row .MuiDataGrid-cell > div": {
//               maxWidth: "100%",
//               overflowX: "hidden",
//             },

//             /* ===== FORCE NO HORIZONTAL SCROLL ===== */
//             "& .MuiDataGrid-main": {
//               overflowX: "hidden",
//             },

//             "& .MuiDataGrid-virtualScroller": {
//               overflowX: "hidden",
//             },

//             "& .MuiDataGrid-virtualScrollerContent": {
//               width: "100%",
//             },

//             /* ===== THIN RED SCROLLBAR (VERTICAL ONLY) ===== */
//             "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
//               width: "4px",
//             },
//             "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
//               backgroundColor: "#DA0E29",
//               borderRadius: "6px",
//             },
//             "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
//               background: "transparent",
//             },
//           }}

//         />
//       </div>

//       {/* ===== PAGINATION (UNCHANGED) ===== */}
//       <div className="flex items-center justify-between px-2 pt-2 text-xs shrink-0">
//         <span className="text-gray-600">
//           Page 1 of {pageCount}
//         </span>

//         <div className="flex gap-1">
//           <PaginationButton icon={<HiChevronDoubleLeft />} disabled onClick={() => { }} />
//           <PaginationButton icon={<HiChevronLeft />} disabled onClick={() => { }} />
//           <PaginationButton icon={<HiChevronRight />} disabled onClick={() => { }} />
//           <PaginationButton icon={<HiChevronDoubleRight />} disabled onClick={() => { }} />
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ================= PAGINATION BUTTON ================= */

// const PaginationButton = ({
//   icon,
//   disabled,
//   onClick,
// }: any) => (
//   <button
//     onClick={onClick}
//     disabled={disabled}
//     className={`p-2 rounded-md border text-sm
//       ${disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-white"}
//     `}
//   >
//     {icon}
//   </button>
// );

// export default DataTable;




















import React, { useMemo, useState } from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  HiChevronDown,
  HiChevronRight,
  HiChevronLeft,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
} from "react-icons/hi2";

import useIsMobile from "../hooks/useIsMobile";
import MobileTableCards from "./common/MobileTableCards";
import { styled } from "@mui/material/styles";

const GradientTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background: "linear-gradient(135deg, #ffffff 0%, #fff5f5 60%, #fdeaea 100%)",
    color: "#3a3a3a",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "13px",
    lineHeight: 1.5,
    maxWidth: 420,
    border: "1px solid rgba(218,14,41,0.25)",
  },

  [`& .${tooltipClasses.arrow}`]: {
    color: "#fff5f5",
  },
}));

const CellWithHoverTooltip = ({ value }: { value: any }) => {
  const ref = React.useRef<HTMLSpanElement>(null);

  if (value === null || value === undefined) return null;

  const text = String(value);
  const isOverflowing =
    ref.current &&
    ref.current.scrollWidth > ref.current.clientWidth;

  return (
    <GradientTooltip
      title={
        <div className="whitespace-normal break-words">
          {text}
        </div>
      }
      placement="top-start"
      arrow
      enterDelay={400}
    // disableHoverListener={!isOverflowing}
    >
      <span
        ref={ref}
        className="block truncate cursor-default"
      >
        {text}
      </span>
    </GradientTooltip>
  );
};


/* ================= TYPES ================= */

interface DataTableProps {
  columns: GridColDef[];
  rows: any[];
  slug: string;
  includeActionColumn: boolean;
  visibleRows?: number;
  showExpandedColumn?: number[];

  isExpandable?: boolean;
  renderExpandedRow?: (row: any) => React.ReactNode;
}

/* ================= CONSTANTS ================= */

const ROW_HEIGHT = 32;
const HEADER_HEIGHT = 30;
const DEFAULT_PAGE_SIZE = 100;

/* ================= COMPONENT ================= */

const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  includeActionColumn,
  visibleRows,
  isExpandable = false,
  renderExpandedRow,
  showExpandedColumn,
}) => {
  const isMobile = useIsMobile();
  const getRowId = React.useCallback((row: any) => row.sno, []);
  const [expandedRowId, setExpandedRowId] = useState<
    string | number | null
  >(null);

  const pageSize = visibleRows ?? DEFAULT_PAGE_SIZE;
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));

  /* ================= ROW INJECTION ================= */
  const computedRows = useMemo(() => {
    if (!isExpandable || expandedRowId == null) return rows;

    // const index = rows.findIndex((r) => r.id === expandedRowId);
    const index = rows.findIndex((r) => getRowId(r) === expandedRowId);

    if (index === -1) return rows;

    // const expandedRow = {
    //   id: `${expandedRowId}__expanded`,
    //   __expanded: true,
    //   parentRow: rows[index],
    // };
    const expandedRow = {
      sno: `${expandedRowId}__expanded`,
      __expanded: true,
      parentRow: rows[index],
    };


    const copy = [...rows];
    copy.splice(index + 1, 0, expandedRow);
    return copy;
  }, [rows, expandedRowId, isExpandable]);

  /* ================= COLUMNS ================= */
  const mergedColumns = useMemo<GridColDef[]>(() => {
    if (!isExpandable) return columns;

    return [
      ...columns.map((col, colIndex) => ({
        ...col,
        renderCell: (params: any) => {
          if (!params.row?.__expanded) {
            return <CellWithHoverTooltip value={params.value} />;
          }

          // Expanded row content only in first column
          if (showExpandedColumn.includes(colIndex)) {
            return (
              <div className="w-full px-4 py-3">
                {renderExpandedRow?.(params.row.parentRow)}
              </div>
            );
          }

          return null;
        },
      })),
      // {
      //   field: "__expand",
      //   headerName: "",
      //   width: 36,
      //   sortable: false,
      //   filterable: false,
      //   disableColumnMenu: true,
      //   align: "center",
      //   headerAlign: "center",
      //   renderCell: (params) => {
      //     if (params.row?.__expanded) return null;

      //     const rowId = getRowId(params.row);
      //     const isOpen = expandedRowId === rowId;

      //     setExpandedRowId(isOpen ? null : rowId);

      //     return (
      //       <button
      //         type="button"
      //         onClick={(e) => {
      //           e.stopPropagation();
      //           setExpandedRowId(isOpen ? null : params.row.id);
      //         }}
      //         className="cursor-pointer"
      //       >
      //         {isOpen ? (
      //           <HiChevronDown size={14} />
      //         ) : (
      //           <HiChevronRight size={14} />
      //         )}
      //       </button>
      //     );
      //   },
      // },
      {
        field: "__expand",
        headerName: "",
        width: 36,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          if (params.row?.__expanded) return null;

          const rowId = getRowId(params.row);
          const isOpen = expandedRowId === rowId;

          return (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedRowId(isOpen ? null : rowId);
              }}
              className="cursor-pointer"
            >
              {isOpen ? (
                <HiChevronDown size={14} />
              ) : (
                <HiChevronRight size={14} />
              )}
            </button>
          );
        },
      }

    ];
  }, [columns, isExpandable, expandedRowId, renderExpandedRow]);

  /* ================= MOBILE ================= */
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

  /* ================= DESKTOP ================= */
  return (
    <div className="w-full h-full rounded-2xl p-[10px] shadow-sm flex flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <DataGrid
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
          }}
        />
      </div>


      {/* ================= PAGINATION ================= */}
      <div className="flex items-center justify-between px-2 pt-2 text-xs shrink-0">
        <div className="flex items-center gap-2 text-gray-600">
          Show
          <select
            value={pageSize}
            onChange={(e) => {
              // setPageSize(Number(e.target.value));
              // setPage(0);
            }}
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
};

/* ================= PAGINATION BUTTON ================= */

const PaginationButton = ({
  icon,
  disabled,
  onClick,
}: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-2 rounded-md border text-sm
      ${disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-white"}
    `}
  >
    {icon}
  </button>
);

export default DataTable;
