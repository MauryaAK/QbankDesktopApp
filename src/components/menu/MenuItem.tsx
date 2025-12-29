// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { IconType } from 'react-icons';

// interface MenuItemProps {
//   onClick?: () => void;
//   catalog: string;
//   listItems: Array<{
//     isLink: boolean;
//     url?: string;
//     icon: string;
//     label: string;
//     onClick?: () => void;
//   }>;
// }

// const MenuItem: React.FC<MenuItemProps> = ({
//   onClick,
//   catalog,
//   listItems,
// }) => {
//   return (
//     <div className="w-full flex flex-col items-stretch gap-2">
//       <span className="hidden xl:block px-2 xl:text-sm 2xl:text-base 3xl:text-lg uppercase">
//         {catalog}
//       </span>
//       {listItems.map((listItem, index) => {
//         if (listItem.isLink) {
//           return (
//             <NavLink
//               key={index}
//               onClick={onClick}
//               to={listItem.url || ''}
//               className={({ isActive }) =>
//                 isActive
//                   ? 'btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-active btn-ghost btn-block justify-start'
//                   : 'btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-ghost btn-block justify-start'
//               }
//             >
//               <listItem.icon  />
//               <span className="xl:text-sm 2xl:text-base 3xl:text-lg capitalize">
//                 {listItem.label}
//               </span>
//             </NavLink>
//           );
//         } else {
//           return (
//             <button
//               key={index}
//               onClick={listItem.onClick}
//               className="btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-ghost btn-block justify-start"
//             >
//              <img src={}/>
//               <span className="xl:text-sm 2xl:text-base 3xl:text-lg capitalize">
//                 {listItem.label}
//               </span>
//             </button>
//           );
//         }
//       })}
//     </div>
//   );
// };

// export default MenuItem;


import React from "react";
import { NavLink } from "react-router-dom";

interface ListItem {
  isLink: boolean;
  url?: string;
  icon: string;
  label: string;
  onClick?: () => void;
}

interface MenuItemProps {
  onItemClick?: () => void;
  catalog: string;
  listItems: ListItem[];
}

const MenuItem: React.FC<MenuItemProps> = ({
  onItemClick,
  catalog,
  listItems,
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <span className="hidden xl:block px-2 text-xs 2xl:text-sm 3xl:text-base uppercase text-gray-500">
        {catalog}
      </span>

      {listItems.map((item) =>
        item.isLink ? (
          <NavLink
            key={item.label}
            to={item.url || "#"}
            onClick={onItemClick}
            className={({ isActive }) =>
              `
    btn btn-ghost border-none btn-block justify-start gap-3
    2xl:min-h-[52px] 3xl:min-h-[64px]
    hover:bg-transparent hover:text-inherit active:bg-transparent
    ${isActive
                ? "btn-active bg-gradient-to-r from-blue-dark to-blue-light text-primary"
                : "text-black"}
    `
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={item.icon}
                  alt={item.label}
                  className={`h-5 w-5 ${isActive ? "opacity-100" : "opacity-80"
                    }`}
                />
                <span className="capitalize xl:text-sm 2xl:text-base flex justify-end">
                  {item.label}
                  {isActive && <span className="capitalize pl-1  text-primary">
                    •
                  </span>}
                </span>
              </>
            )}
          </NavLink>
        ) : (
          <button
            key={item.label}
            onClick={item.onClick}
            className="
    btn btn-ghost btn-block justify-start gap-3
    2xl:min-h-[52px] 3xl:min-h-[64px]
    hover:bg-transparent hover:text-inherit active:bg-transparent
  "
          >

            <img src={item.icon} alt={item.label} className="h-5 w-5" />
            <span className="capitalize xl:text-sm 2xl:text-base">
              {item.label}
            </span>
          </button>
        )
      )}
    </div>
  );
};

export default MenuItem;
