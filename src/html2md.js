#!/usr/bin/env node

import pkg from "fs-extra";
const { mkdirSync, existsSync, readdirSync, lstatSync } = pkg;

import path from "path";
import { program } from "commander";

import { handleConversion } from "./Converter.js";

program
  .command("file")
  .description("Convert a single file")
  .option("-f, --file <value>", "file to convert")
  .option("-o, --output <value>", "converted file")
  .action((options) => {
    if (!options.file) {
      console.error("Error: --file is required.");
      process.exit(1);
    }
    handleSingleFile(options.file, options.output);
  });

program
  .command("directory")
  .description("Convert all files in a directory")
  .option("-d, --directory <value>", "path to parent directory")
  .action((options) => {
    if (!options.directory) {
      console.error("Error: --directory is required.");
      process.exit(1);
    }
    handleDirectory(options.directory);
  });

program.parse(process.argv);

// if flag -f is selected
function update(inputFilePath, outputFilePath) {
  let input = path.resolve(inputFilePath);

  if (outputFilePath) {
    outputFilePath = path.resolve(outputFilePath);
    let extension = path.extname(outputFilePath);

    if (extension != ".md") {
      outputFilePath = outputFilePath + ".md";
    }
  } else {
    outputFilePath = path.join(
      path.dirname(input),
      path.basename(input) + ".md",
    );
  }
  return outputFilePath;
}

function handleSingleFile(file, output) {
  if (path.extname(file).toString() != ".html") {
    throw new Error(
      "Wrong file extension, this tool converts only .html files not anything else.\n",
    );
  }
  const outputFilePath = update(file, output);

  return handleConversion(file, outputFilePath);
}

// if --d flag is selected
function createDir(folderName) {
  console.log("createDir called with:", folderName);
  try {
    if (!existsSync(folderName)) {
      mkdirSync(folderName);
    }
  } catch (error) {
    throw new Error(`Something went wrong...\nError: ${error} `);
  }
}

function read(folderpath) {
  return readdirSync(folderpath).map((filename) => {
    return path.join(folderpath, filename);
  });
}

function isAFile(name) {
  return lstatSync(name).isFile();
}

function walk(outputPath, originalPath) {
  try {
    if (existsSync(originalPath) && !isAFile(originalPath)) {
      return read(originalPath).map((p) => {
        const result = path.relative(originalPath, p);
        if (path.basename(p) === "dist" || p.startsWith(outputPath)) return;
        const finalPath = path.join(outputPath, result);
        console.log(finalPath);
        if (isAFile(p)) {
          handleSingleFile(p, finalPath);
        } else {
          createDir(finalPath);
          return walk(finalPath, p);
        }
      });
    }
  } catch (error) {
    throw new Error(error);
  }
}
function handleDirectory(directory) {
  let dir = path.resolve(directory);
  let output = path.join(dir, "/dist");
  createDir(output);
  return walk(output, directory);
}
