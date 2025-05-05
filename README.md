# html2md

## Deskription

A simple CLI tool created with node.js that converts .html files into .md files. It works with both files and directories as input.

## Prerequisites

**NOTE:** If you have the **latest** node version on your local machine you can ignore the next prerequisite.

- Docker _enabled_ and _started_

```bash
sudo pacman -S docker
sudo systemctl enable docker
sudo systemctl start docker
```

## Installation

Simply clone this repo

```bash
git clone https://github.com/ignorant05/html2md.git
```

## Usage

If you have node already on your local machine then just jump into it:

```bash
npm i -g html2md # or use npm link to create a symlink on your local machine
```

For files:

```bash
html2md file -f <path/to/your/file.html>
# or
html2md file -f <path/to/your/file.html> -o <path/to/your/output/file.md>
```

As you can see the --output/-o flag is optional, if you don't use it, the tool will use your input file name as output file name.

For Directories:

```bash
html2md directory -d <path/to/directory>
```

This will generate a new directory called **/dist** which you will find oall the generated .md files from the original .html files inside you input directory path.
It imitates you original directory structure.

However if you are using docker, then:

```bash
sudo docker run html2md file -f <path/to/your/file.html>
# or
sudo docker run html2md file -f <path/to/your/file.html> -o <path/to/your/output/file.md>
# or
sudo docker run html2md directory -d <path/to/directory>
```

Optionally you can add flags and specify ports, but i don't find it necessary here.
