import React from "react";

interface CurvedPanelProps {
  children: React.ReactNode;
  className?: string;
}

const CurvedPanel: React.FC<CurvedPanelProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`curved-box-wrapper ${className}`}>
      {/* SVG CURVED BACKGROUND (WHITE SHELL ONLY) */}
      <svg
        viewBox="0 0 2428 1216"
        preserveAspectRatio="none"
        className="curved-box-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_di)">
          <path
            d="M4 40C4 17.9086 21.9086 0 44 0H2384C2406.09 0 2424 17.9086 2424 40V1168C2424 1190.09 2406.09 1208 2384 1208H1244.13C1229.12 1208 1215.37 1199.59 1208.53 1186.22L1162.12 1095.55C1155.28 1082.19 1141.53 1073.78 1126.52 1073.78H44C21.9086 1073.78 4 1055.87 4 1033.78V40Z"
            fill="#ffffff"
          />
        </g>

        <defs>
          <filter
            id="filter0_di"
            x="0"
            y="0"
            width="2428"
            height="1216"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            {/* Drop shadow */}
            <feOffset dy="8" />
            <feGaussianBlur stdDeviation="12" />
            <feColorMatrix
              type="matrix"
              values="
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 0.18 0
              "
            />
            <feBlend in="SourceGraphic" result="shape" />

            {/* Inner shadow */}
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="6" />
            <feComposite operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 0.12 0
              "
            />
            <feBlend in2="shape" />
          </filter>
        </defs>
      </svg>

      {/* CONTENT LAYER (TRANSPARENT) */}
      <div className="curved-box-content">
        {children}
      </div>
    </div>
  );
};

export default CurvedPanel;
