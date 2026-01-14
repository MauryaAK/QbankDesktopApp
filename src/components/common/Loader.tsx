import React from "react";
import loaderGif from '../../assets/loader.gif'

interface LoaderProps {
  visible?: boolean;           // 🔥 NEW
  size?: number;               // px
  fullscreen?: boolean;
  overlay?: boolean;
  className?: string;
  ariaLabel?: string;
}

const Loader: React.FC<LoaderProps> = React.memo(
  ({
    visible = true,
    size = 300,
    fullscreen = false,
    overlay = false,
    className = "",
    ariaLabel = "Loading",
  }) => {
    // 🚀 Fast exit – no render, no DOM
    if (!visible) return null;

    return (
      <div
        role="status"
        aria-label={ariaLabel}
        className={[
          "flex items-center justify-center",
          fullscreen ? "fixed inset-0 z-[9999]" : "",
          overlay ? "bg-black/30 backdrop-blur-sm" : "",
          className,
        ].join(" ")}
      >
        <img
          src={loaderGif}
          alt={ariaLabel}
          width={size}
          height={size}
          draggable={false}
          loading="eager"
          decoding="async"
          className="select-none"
        />
      </div>
    );
  }
);

export default Loader;
