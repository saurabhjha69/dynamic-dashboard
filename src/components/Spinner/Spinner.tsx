import React from "react";
import "./Spinner.css"

type SpinnerProps = {
  size?: number;        
  color?: string;    
  thickness?: number;
  className?: string;
};

const Spinner: React.FC<SpinnerProps> = ({
  size = 40,
  color = "#4f46e5",
  thickness = 4,
  className = "",
}) => {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    border: `${thickness}px solid rgba(0, 0, 0, 0.1)`,
    borderTop: `${thickness}px solid ${color}`,
  };

  return (
    <div
      className={`spinner ${className}`}
      style={style}
    />
  );
};

export default Spinner;
