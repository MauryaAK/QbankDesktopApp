// // import toast from 'react-hot-toast';
// import {
//   HiOutlineHome,
//   HiOutlineUser,
//   HiOutlineUsers,
//   HiOutlineCube,
//   HiOutlineClipboardDocumentList,
//   HiOutlineDocumentChartBar,
//   HiOutlinePencilSquare,
//   HiOutlineCalendarDays,
//   HiOutlinePresentationChartBar,
//   HiOutlineDocumentText,
//   HiOutlineArrowLeftOnRectangle,
// } from 'react-icons/hi2';
// // import { IoSettingsOutline } from 'react-icons/io5';

// export const menu = [
//   {
//     catalog: 'main',
//     listItems: [
//       {
//         isLink: true,
//         url: '/',
//         icon: HiOutlineHome,
//         label: 'Dashboard',
//       },
//       {
//         isLink: true,
//         url: '/transaction',
//         icon: HiOutlineUser,
//         label: 'Transaction',
//       },
//       {
//         isLink: true,
//         url: '/pendingApprovals',
//         icon: HiOutlineUser,
//         label: 'Pending Approvals',
//       },
//       {
//         isLink: true,
//         url: '/user&Locations',
//         icon: HiOutlineUser,
//         label: 'User & Locations',
//       },
//       {
//         isLink: true,
//         url: '/setting',
//         icon: HiOutlineUser,
//         label: 'Setting',
//       },
//     ],
//   },
//   // {
//   //   catalog: 'lists',
//   //   listItems: [
//   //     {
//   //       isLink: true,
//   //       url: '/users',
//   //       icon: HiOutlineUsers,
//   //       label: 'users',
//   //     },
//   //     {
//   //       isLink: true,
//   //       url: '/products',
//   //       icon: HiOutlineCube,
//   //       label: 'products',
//   //     },
//   //     {
//   //       isLink: true,
//   //       url: '/orders',
//   //       icon: HiOutlineClipboardDocumentList,
//   //       label: 'orders',
//   //     },
//   //     {
//   //       isLink: true,
//   //       url: '/posts',
//   //       icon: HiOutlineDocumentChartBar,
//   //       label: 'posts',
//   //     },
//   //   ],
//   // },
//   // {
//   //   catalog: 'general',
//   //   listItems: [
//   //     {
//   //       isLink: true,
//   //       url: '/notes',
//   //       icon: HiOutlinePencilSquare,
//   //       label: 'notes',
//   //     },
//   //     {
//   //       isLink: true,
//   //       url: '/calendar',
//   //       icon: HiOutlineCalendarDays,
//   //       label: 'calendar',
//   //     },
//   //   ],
//   // },
//   // {
//   //   catalog: 'analytics',
//   //   listItems: [
//   //     {
//   //       isLink: true,
//   //       url: '/charts',
//   //       icon: HiOutlinePresentationChartBar,
//   //       label: 'charts',
//   //     },
//   //     {
//   //       isLink: true,
//   //       url: '/logs',
//   //       icon: HiOutlineDocumentText,
//   //       label: 'logs',
//   //     },
//   //   ],
//   // },
//   // {
//   //   catalog: 'miscellaneous',
//   //   listItems: [
//   //     {
//   //       isLink: true,
//   //       url: '/login',
//   //       icon: HiOutlineArrowLeftOnRectangle,
//   //       label: 'log out',
//   //     },
//   //   ],
//   // },
// ];









import HiOutlineHome from '../../assets/dashboard.svg'
import HiOutlineClipboardDocumentList from '../../assets/transaction.svg'
import HiOutlineDocumentText from '../../assets/pending.png'
import HiOutlineUsers from '../../assets/user&locations.svg'
import HiOutlineCog6Tooth from '../../assets/settings.svg'

export const menu = [
  {
    catalog: "main",
    listItems: [
      {
        isLink: true,
        url: "/",
        icon: HiOutlineHome,
        label: "Dashboard",
      },
      {
        isLink: true,
        url: "/transaction",
        icon: HiOutlineClipboardDocumentList,
        label: "Transaction",
      },
      {
        isLink: true,
        url: "/pendingApprovals",
        icon: HiOutlineDocumentText,
        label: "Pending Approvals",
      },
      {
        isLink: true,
        url: "/user&Locations",
        icon: HiOutlineUsers,
        label: "User & Locations",
      },
      {
        isLink: true,
        url: "/setting",
        icon: HiOutlineCog6Tooth,
        label: "Setting",
      },
    ],
  },
];
