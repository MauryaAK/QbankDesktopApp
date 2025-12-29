// import Select, { components ,ValueContainerProps} from "react-select";
// interface Option {
//   label: string;
//   value: string;
// }

// interface Props {
//   label: string;
//   value: Option | null;
//   options: Option[];
//   onChange: (val: Option | null) => void;
// }

// const styles = {
//   control: (base: any, state: any) => ({
//     ...base,
//     minHeight: 32,
//     height: 32,
//     borderRadius: 8,
//     borderColor: state.isFocused ? "#ec4899" : "#fbcfe8",
//     boxShadow: "none",
//     fontSize: "12px",
//     "&:hover": { borderColor: "#ec4899" },
//   }),
//   valueContainer: (base: any) => ({
//     ...base,
//     padding: "0 8px",
//   }),
//   indicatorsContainer: (base: any) => ({
//     ...base,
//     height: 32,
//   }),
//   indicatorSeparator: () => ({ display: "none" }),
//   menu: (base: any) => ({
//     ...base,
//     zIndex: 50,
//     fontSize: "12px",
//   }),
// };

// const SelectField: React.FC<Props> = ({
//   label,
//   value,
//   options,
//   onChange,
// }) => {
//   return (
//     <div className="flex items-center gap-2">
//       <span className="
//         min-w-[90px]
//         text-xs
//         font-medium
//         text-gray-600
//       ">
//         {label}
//       </span>

//       <div className="w-full">
//         <Select
//           value={value}
//           options={options}
//           onChange={onChange}
//           styles={styles}
//           placeholder="Select"
//           isClearable
//         />
//       </div>
//     </div>
//   );
// };


// /* ================= TYPES ================= */

// export type SelectSize = "xs" | "sm" | "md" | "lg";


// interface GradientSelectProps {
//   value: Option | null;
//   onChange: (opt: Option) => void;
//   options: Option[];
//   placeholder?: string;
//   isClearable?: boolean;
//   size?: SelectSize;
//   isActive?: boolean;

//   /** Static text always shown in field */
//   staticLabel: string;
// }

// /* ================= SIZE CONFIG ================= */

// const sizeConfig: Record<
//   SelectSize,
//   { height: number; fontSize: number; paddingX: number }
// > = {
//   xs: { height: 28, fontSize: 11, paddingX: 12 },
//   sm: { height: 34, fontSize: 12, paddingX: 16 },
//   md: { height: 40, fontSize: 14, paddingX: 20 },
//   lg: { height: 38, fontSize: 15, paddingX: 20 },
// };

// /* ================= CUSTOM VALUE CONTAINER ================= */

// const StaticValueContainer = (props: any) => {
//   const { children, selectProps } = props;

//   return (
//     <components.ValueContainer {...props}>
//       <span
//         style={{
//           color: "#fff",
//           fontWeight: 600,
//           fontSize: selectProps.fontSize,
//           whiteSpace: "nowrap",
//         }}
//       >
//         {selectProps.staticLabel}
//       </span>

//       {/* keep input for keyboard / menu control */}
//       {children[1]}
//     </components.ValueContainer>
//   );
// };

// /* ================= STYLES ================= */

// const getCustomStyles = (size: SelectSize, isActive: boolean) => {
//   const cfg = sizeConfig[size];

//   const activeGradient = "linear-gradient(135deg,#BB9652 0%, #F9CD7C 100%)";
//   const defaultGradient = "linear-gradient(135deg,#c92b2b 0%, #6b0f14 100%)";

//   return {
//     control: (base: any) => ({
//       ...base,
//       minHeight: cfg.height,
//       height: cfg.height,
//       minWidth: "220px",
//       borderRadius: 9999,
//       border: "none",
//       padding: `0 ${cfg.paddingX}px`,
//       background: isActive ? activeGradient : defaultGradient,
//       boxShadow: "none",
//       cursor: "pointer",
//       overflow: "hidden",
//       "&:hover": { boxShadow: "none" },
//     }),

//     valueContainer: (base: any) => ({
//       ...base,
//       padding: 0,
//     }),

//     placeholder: () => ({
//       display: "none",
//     }),

//     singleValue: () => ({
//       display: "none",
//     }),

//     dropdownIndicator: (base: any) => ({
//       ...base,
//       padding: 0,
//       marginLeft: 6,
//       color: "#fff",
//       "&:hover": { color: "#fff" },
//     }),

//     indicatorSeparator: () => ({
//       display: "none",
//     }),

//     /* ===== DROPDOWN MENU ===== */

//     menu: (base: any) => ({
//       ...base,
//       marginTop: 6,
//       borderRadius: 14,
//       overflow: "hidden",
//       zIndex: 9999,
//       background: isActive ? activeGradient : defaultGradient,
//     }),

//     menuList: (base: any) => ({
//       ...base,
//       padding: 6,
//       maxHeight: 220,
//       overflowY: "auto",
//       background: "transparent",

//       /* Scrollbar (WebKit) */
//       "::-webkit-scrollbar": {
//         width: 6,
//       },
//       "::-webkit-scrollbar-track": {
//         background: "transparent",
//       },
//       "::-webkit-scrollbar-thumb": {
//         backgroundColor: "rgba(255,255,255,0.95)",
//         borderRadius: 999,
//       },

//       /* Scrollbar (Firefox) */
//       scrollbarWidth: "thin",
//       scrollbarColor: "rgba(255,255,255,0.95) transparent",
//     }),

//     option: (base: any, state: any) => ({
//       ...base,
//       padding: "6px 12px",
//       fontSize: 12,
//       borderRadius: 8,
//       cursor: "pointer",
//       backgroundColor: state.isSelected
//         ? "rgba(255,255,255,0.25)"
//         : state.isFocused
//         ? "rgba(255,255,255,0.15)"
//         : "transparent",
//       color: "#fff",
//     }),
//   };
// };

// /* ================= COMPONENT ================= */

// const GradientSelect: React.FC<GradientSelectProps> = ({
//   value,
//   onChange,
//   options,
//   placeholder = "Select",
//   isClearable = false,
//   size = "sm",
//   isActive = false,
//   staticLabel,
// }) => {
//   const cfg = sizeConfig[size];

//   return (
//     <div className="relative inline-block">
//       <Select
//         value={value}
//         onChange={(opt) => opt && onChange(opt as Option)}
//         options={options}
//         isClearable={isClearable}
//         placeholder={placeholder}
//         styles={getCustomStyles(size, isActive)}
//         menuPortalTarget={document.body}
//         menuPosition="fixed"
//         components={{
//           IndicatorSeparator: () => null,
//           ValueContainer: StaticValueContainer,
//         }}
//         staticLabel={staticLabel}
//         fontSize={cfg.fontSize - 1}
//       />
//     </div>
//   );
// };


// export { SelectField, GradientSelect };




















import React from "react";
import Select, {
  components,
  ValueContainerProps,
} from "react-select";

/* ================= COMMON TYPES ================= */

interface Option {
  label: string;
  value: string;
}

/* ================= SIMPLE SELECT (UNCHANGED) ================= */

interface Props {
  label: string;
  value: Option | null;
  options: Option[];
  onChange: (val: Option | null) => void;
}

const styles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: 32,
    height: 32,
    borderRadius: 8,
    borderColor: state.isFocused ? "#ec4899" : "#fbcfe8",
    boxShadow: "none",
    fontSize: "12px",
    "&:hover": { borderColor: "#ec4899" },
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: "0 8px",
  }),
  indicatorsContainer: (base: any) => ({
    ...base,
    height: 32,
  }),
  indicatorSeparator: () => ({ display: "none" }),
  menu: (base: any) => ({
    ...base,
    zIndex: 50,
    fontSize: "12px",
  }),
};

const SelectField: React.FC<Props> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="min-w-[90px] text-xs font-medium text-gray-600">
        {label}
      </span>

      <div className="w-full">
        <Select
          value={value}
          options={options}
          onChange={onChange}
          styles={styles}
          placeholder="Select"
          isClearable
        />
      </div>
    </div>
  );
};


interface Option {
  label: string;
  value: string;
}

export type SelectSize = "xs" | "sm" | "md" | "lg";

interface GradientSelectProps {
  value: Option | null;
  onChange: (opt: Option) => void;
  options: Option[];
  placeholder?: string;
  isClearable?: boolean;
  size?: SelectSize;
  isActive?: boolean;
  staticLabel: string;
}

/* ================= SIZE CONFIG ================= */

const sizeConfig: Record<
  SelectSize,
  { height: number; fontSize: number; paddingX: number }
> = {
  xs: { height: 28, fontSize: 11, paddingX: 12 },
  sm: { height: 34, fontSize: 12, paddingX: 16 },
  md: { height: 40, fontSize: 14, paddingX: 20 },
  lg: { height: 38, fontSize: 13, paddingX: 10 },
};

/* ================= STATIC VALUE CONTAINER ================= */

const StaticValueContainer = (
  props: ValueContainerProps<Option, false>
) => {
  const { children, selectProps } = props;

  const { staticLabel, fontSize } = selectProps as any;

  return (
    <components.ValueContainer {...props}>
      {/* Static centered label */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          color: "#fff",
          fontWeight: 600,
          fontSize,
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        {staticLabel}
      </div>

      {/* keep input for focus / keyboard */}
      {children}
    </components.ValueContainer>
  );
};

/* ================= STYLES ================= */

const getCustomStyles = (size: SelectSize, isActive: boolean) => {
  const cfg = sizeConfig[size];

  const activeGradient =
    "linear-gradient(135deg,#BB9652 0%, #F9CD7C 100%)";
  const defaultGradient =
    "linear-gradient(135deg,#c92b2b 0%, #6b0f14 100%)";

  return {
    control: (base: any) => ({
      ...base,
      minHeight: cfg.height,
      height: cfg.height,
      minWidth: "170px",
      borderRadius: 15,
      border: "none",
      padding: `0 ${cfg.paddingX}px`,
      background: isActive ? activeGradient : defaultGradient,
      boxShadow: "none",
      cursor: "pointer",
      overflow: "hidden",
      position: "relative",
    }),

    valueContainer: (base: any) => ({
      ...base,
      position: "relative",
      padding: 0,
      height: "100%",
      display: "flex",
      alignItems: "center",
    }),

    input: (base: any) => ({
      ...base,
      position: "absolute",
      opacity: 0,
      margin: 0,
      padding: 0,
    }),

    singleValue: () => ({ display: "none" }),
    placeholder: () => ({ display: "none" }),

    dropdownIndicator: (base: any) => ({
      ...base,
      padding: 0,
      marginLeft: 6,
      color: "#fff",
    }),

    indicatorSeparator: () => ({ display: "none" }),

    menu: (base: any) => ({
      ...base,
      marginTop: 6,
      borderRadius: 14,
      overflow: "hidden",
      zIndex: 9999,
      background: isActive ? activeGradient : defaultGradient,
    }),

    menuList: (base: any) => ({
      ...base,
      padding: 6,
      maxHeight: 220,
      overflowY: "auto",

      background: "transparent",

      "::-webkit-scrollbar": { width: 6 },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(255,255,255,0.95)",
        borderRadius: 999,
      },

      scrollbarWidth: "thin",
      scrollbarColor: "rgba(255,255,255,0.95) transparent",
    }),

    option: (base: any, state: any) => ({
      ...base,
      padding: "6px 12px",
      fontSize: 11,
      borderRadius: 8,
      backgroundColor: state.isFocused
        ? "rgba(255,255,255,0.15)"
        : "transparent",
      color: "#fff",
      cursor: "pointer",
    }),
  };
};

/* ================= COMPONENT ================= */

const GradientSelect: React.FC<GradientSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select",
  isClearable = false,
  size = "sm",
  isActive = false,
  staticLabel,
}) => {
  const cfg = sizeConfig[size];

  return (
    <div className="relative inline-block">
      <Select<Option, false>
        value={value}
        onChange={(opt) => opt && onChange(opt)}
        options={options}
        isClearable={isClearable}
        placeholder={placeholder}
        styles={getCustomStyles(size, isActive)}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        components={{
          IndicatorSeparator: () => null,
          ValueContainer: StaticValueContainer,
        }}
        {...{
          staticLabel,
          fontSize: cfg.fontSize - 1,
        }}
      />
    </div>
  );
};


export { SelectField, GradientSelect };
