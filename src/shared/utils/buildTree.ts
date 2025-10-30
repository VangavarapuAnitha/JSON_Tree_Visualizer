type TreeNode = {
  id: string;
  label: string;
  type: "object" | "array" | "primitive"|"value";
  value?: any;
  children?: TreeNode[];
  path: string;
  level: number;
};

//Get node type based on value it holds
const getNodeType = (value: any) => {
  if (Array.isArray(value)) return "array";
  if (typeof value === "object" && value !== null) return "object";
  return "primitive";
};

//Building tree
export const buildTree = (
  data: any,
  label: string,
  path: string,
  level: number
): TreeNode => {
  const type = getNodeType(data);
  const cleanPath = path === "$" ? `$.${label}` : `${path}.${label}`;
  const nodePath = `${cleanPath}_${level}`;

  const node: TreeNode = {
    id: nodePath,
    label,
    type,
    level,
    path: cleanPath,
  };

  if (type === "object") {
    node.children = Object.entries(data).map(([key, value]) =>
      buildTree(value, key, cleanPath, level + 1)
    );
  } else if (type === "array") {
    node.children = data.map((value: any, i: number) =>
      buildTree(value, `${i}`, cleanPath, level + 1)
    );
  } else {
    const valueNode: TreeNode = {
      id: `${cleanPath}_value_${level + 1}`,
      label: String(data),
      type: "value",
      value: data,
      level: level + 1,
      path: `${cleanPath}.value`,
    };

    node.children = [valueNode];
  }
  return node;
};
