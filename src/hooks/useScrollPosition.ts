import { useEffect, useState } from "react";

export default function useScrollPosition() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setPosition(
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          )
        );
      }

      window.addEventListener("scroll", handleResize);

      handleResize();

      return () => window.removeEventListener("scroll", handleResize);
    }
  }, []);

  return { position };
}
