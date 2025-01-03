import { useState, useEffect } from "react";

const useTabletSize = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px) and (max-width: 1280px)");

    // Initial check
    const handleResize = () => setIsTablet(mediaQuery.matches);

    handleResize();

    // Add event listener for changes
    mediaQuery.addEventListener("change", handleResize);

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return isTablet;
};

export default useTabletSize;
