export const useVisibilityChange = (callback: () => void) => {
  // Add event listener for visibility change
  document.addEventListener("visibilitychange", callback);

  // Clean up by removing event listener when component unmounts
  return () => {
    document.removeEventListener("visibilitychange", callback);
  };
};
