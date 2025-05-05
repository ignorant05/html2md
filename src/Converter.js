import * as htmlparser from "htmlparser";
import { TAG_MAP } from "./tagMap.js";
import { readFile, writeFile } from "fs/promises";

export async function handleConversion(inputFilePath, outputFilePath) {
  const res = await readFile(inputFilePath, "utf-8");

  var content = "";

  var handler = new htmlparser.DefaultHandler(function(error, dom) {
    if (error) {
      console.log(`Something went wrong... \nError: ${error}`);
    } else {
      function dfs(nodes) {
        for (const node of nodes) {
          if (node.type === "text") {
            if (node.tag)
              content = content + "\n" + TAG_MAP.node.tag(node).trim();
            else content = content + node.data.trim() + "\n";
          }
          if (node.children) {
            dfs(node.children);
          }
        }
      }
      dfs(dom);
    }
  });

  var parser = new htmlparser.Parser(handler);
  parser.parseComplete(res);

  async function outputContent(outputFilePath) {
    return await writeFile(outputFilePath, content, (error) => {
      if (error) {
        console.error(`Something went wrong...\nError: ${error}`);
      }
    });
  }

  return outputContent(outputFilePath);
}
