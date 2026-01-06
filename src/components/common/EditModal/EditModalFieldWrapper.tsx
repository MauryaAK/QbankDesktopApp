// // EditModalFieldWrapper.tsx
// interface EditModalFieldWrapperProps {
//   label: string;
//   required?: boolean;
//   children: React.ReactNode;
// }

// const EditModalFieldWrapper = ({
//   label,
//   required,
//   children,
// }: EditModalFieldWrapperProps) => {
//   return (
//     <div className="relative py-2">

//       <div className="flex items-start min-h-[34px]">

//         {/* LEFT GOLD BAR */}
//         <div className="w-[2px] h-5 bg-[#C7A35D] mx-2 rounded-tr-md rounded-br-md mt-2" />

//         {/* LABEL */}
//         <div className="w-[130px] text-sm font-medium pt-1">
//           {label} {required && "*"}
//         </div>

//         {/* VERTICAL DIVIDER */}
//         <div className="w-[2px] bg-[#C7A35D] mx-3 self-stretch" />

//         {/* CONTENT */}
//         <div className="flex-1">
//           {children}
//         </div>

//       </div>

//       {/* BOTTOM LINE */}
//       <div className="absolute left-0 right-0 bottom-1 h-[1px] bg-[#C7A35D]">
//         <span className="absolute -right-[3px] -top-[3px] w-[6px] h-[6px] rounded-full bg-[#C7A35D]" />
//       </div>

//     </div>
//   );
// };

// export default EditModalFieldWrapper;




interface EditModalFieldWrapperProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

const EditModalFieldWrapper = ({
  label,
  required,
  children,
}: EditModalFieldWrapperProps) => {
  return (
    <div className="relative py-2">
      <div className="flex items-start min-h-[34px]">
        <div className="w-[2px] h-5 bg-[#C7A35D] mx-2 rounded-tr-md rounded-br-md mt-2" />

        <div className="w-[130px] text-sm font-medium pt-1">
          {label} {required && "*"}
        </div>

        <div className="w-[2px] bg-[#C7A35D] mx-3 self-stretch" />

        <div className="flex-1">{children}</div>
      </div>

      <div className="absolute left-0 right-0 bottom-1 h-[1px] bg-[#C7A35D]">
        <span className="absolute -right-[3px] -top-[3px] w-[6px] h-[6px] rounded-full bg-[#C7A35D]" />
      </div>
    </div>
  );
};

export default EditModalFieldWrapper;
