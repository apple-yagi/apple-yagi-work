import React, { useState } from "react";
import { useEffect } from "react";

const TwitterTimeline: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !loaded) {
      const s = document.createElement("script");
      s.setAttribute("src", "https://platform.twitter.com/widgets.js");
      document.body.appendChild(s);
      setLoaded(true);
    }
  }, []);

  return (
    <a
      className='twitter-timeline'
      data-width='370'
      data-height='307'
      data-theme='dark'
      data-chrome='nofooternoborders'
      href='https://twitter.com/apple_yagi?ref_src=twsrc%5Etfw'>
      Tweets by apple_yagi
    </a>
  );
};

export default TwitterTimeline;
