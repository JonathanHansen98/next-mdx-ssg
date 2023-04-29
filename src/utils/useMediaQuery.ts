import { useEffect, useState } from "react";

export const useMediaQuery = (
  query: string,
  onMatch?: (...args: any[]) => any
) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query.slice(7));
    setMatches(mediaQuery.matches);

    const listener = () => {
      if (mediaQuery.matches && onMatch) onMatch();

      setMatches(mediaQuery.matches);
    };
    mediaQuery.addEventListener("change", listener);

    return () => mediaQuery.removeEventListener("change", listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
};
