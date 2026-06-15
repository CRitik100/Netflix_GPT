import { useState } from "react";

const ToolTip = (props) => {
  const { text } = props;
  const [showToolTip, setShowToolTip] = useState(false);

  return (
    <div
      className="absolute inset-0 hidden md:block"
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
    >
      <div>
        {showToolTip && (
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black outline-1 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-50">
            {text}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolTip;
