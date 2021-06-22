import * as React from "react";
import ReactMarkdown from "react-markdown";
import useWindowSize from "@/hooks/useWindowSize";

const githubReadmeStats =
  "![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=apple-yagi&show_icons=true&theme=cobalt&layout=compact)";
const githubReadmeStatsCompact =
  "[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=apple-yagi&langs_count=5&theme=cobalt)](https://github.com/anuraghazra/github-readme-stats)";

const GithubReadmeStats: React.FC = () => {
  const { windowSize } = useWindowSize();

  if (windowSize.width === 0) return <></>;

  return (
    <ReactMarkdown
      children={
        windowSize.width > 1024 ? githubReadmeStats : githubReadmeStatsCompact
      }
      components={{
        img: ({ node, ...props }) => (
          <img {...props} style={{ borderRadius: "25px" }} />
        )
      }}
    />
  );
};

export default GithubReadmeStats;
