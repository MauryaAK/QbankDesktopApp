import React from "react";
import clsx from "clsx";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}const Card: React.FC<CardProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div
      className={clsx(
        "border rounded-lg p-3 bg-white bg-clip-padding",
        className
      )}
    >
      {title && (
        <h3 className="text-xs font-semibold text-gray-800 mb-2">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};


export default Card;
