export const TAG_MAP = {
  h1: (node) => {
    return `# ${node.data}`;
  },
  h2: (node) => {
    return `## ${node.data}`;
  },
  h3: (node) => {
    return `### ${node.data}`;
  },
  h4: (node) => {
    return `#### ${node.data}`;
  },
  h5: (node) => {
    return `##### ${node.data}`;
  },
  h6: (node) => {
    return `###### ${node.data}`;
  },
  strong: (node) => {
    return `**${node.data}**`;
  },
  p: (node) => {
    return `${node.data}`;
  },
  span: (node) => {
    return `${node.data}`;
  },
  br: () => {
    return "\n";
  },
  em: (node) => {
    return `*${node.data}*`;
  },
  hr: () => {
    return "___";
  },
  a: (node) => {
    return `(${node})[${node.attribs.href}]`;
  },
  img: (node) => {
    const alt = node.attribs.alt || "";
    const src = node.attribs.src || "";
    return `![${alt}](${src})`;
  },
  code: (node) => {
    return `\`\`\`\n${node.data}\n\`\`\``;
  },
  blockquote: (node) => {
    let result = "";
    for (let child of node.children) {
      result = result + `> ${child.data}.\n`;
    }
    return result;
  },
  ul: (node) => {
    let result = "";
    for (let child of node.children) {
      result = result + "\n" + `- ${child.data}.\n`;
    }
    return result;
  },
  ol: (node) => {
    let num = 1;
    let result = "";
    for (let child of node.children) {
      result = result + `\n ${num}.${child.data}.\n`;
      num += 1;
    }
    return result;
  },
  table: (node) => {
    let result = "";
    for (let child of node.children) {
      let sub_res = "";
      if (child === "tr") {
        for (let grandChild of child) {
          if (grandChild === "th") {
            sub_res = sub_res + `| **${grandChild.data}** `;
          }
        }
        sub_res + "|\n| ;---";
        for (let index = 0; index < child.length; index++) {
          sub_res + " | ;---;";
        }
        sub_res + " |";
      } else {
        for (let grandChild of child) {
          if (grandChild === "th") {
            sub_res = sub_res + `| ${grandChild.data} `;
          }
        }
        sub_res + "|\n| ;---";
        for (let index = 0; index < child.length; index++) {
          sub_res + " | ;---;";
        }
        sub_res + " |";
      }
      result = result + sub_res + "\n";
    }
    return result;
  },
};
