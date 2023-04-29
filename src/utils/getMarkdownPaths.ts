import path from "path";
import klawSync from "klaw-sync";

export const getMarkdownPaths = (includeDir = false) => {
  const markdownPath = path.join(process.cwd(), "/src", "/markdown");
  const files = klawSync(markdownPath, { nodir: !includeDir });

  const paths = files.map((file) => {
    const relativePath = path.relative(markdownPath, file.path);
    const { dir, name } = path.parse(relativePath);

    let output = path
      .format({
        dir,
        base: name == "index" ? "" : name,
      })
      .replace(/\\/g, "/");

    if (output.charAt(output.length - 1) === "/") {
      output = output.slice(0, -1);
    }

    return "/" + output;
  });

  return paths;
};
