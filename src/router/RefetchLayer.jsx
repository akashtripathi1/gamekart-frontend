// src/components/Customer/RefetchLayer.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const RefetchLayer = ({ children }) => {
  const location = useLocation();
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Whenever location changes, increment key to force remount or refetch
    setKey((prev) => prev + 1);
  }, [location]);

  return <div key={key}>{children}</div>;
};

export default RefetchLayer;
