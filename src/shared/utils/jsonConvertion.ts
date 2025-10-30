import type { Edge } from "reactflow";
import type { JSONNode } from "../../context/JSONProvider";
import "reactflow/dist/style.css";
import { buildTree } from "./buildTree";
import { getLayoutedElements } from "./dagreLayout";

//Recieves object or array of anytype(primitive or object)
export const jsonConvertion = (jsonData: Record<string, any> | any[]) => {
  let finalNodes: JSONNode[] = [];
  let finalEdges: Edge[] = [];

  //Create Node
  const createNode = (node: any, parentId: string | null) => {
    const { id, label, type, level, path, value } = node;

    const newNode: JSONNode = {
      id,
      data: {
        id,
        label: label,
        path,
        level,
        value: type === "primitive" ? value : undefined,
      },
      position: { x: 0, y: 0 },
      type,
      style: {
        background:
          type === "object"
            ? "#4F46E5" // blue
            : type === "array"
            ? "#10B981" // green
            : type==="primitive"?"#F59E0B":"red", // orange (primitive) red (value)
        color: "white",
        border: "1px solid #333",
        padding: 8,
        borderRadius: 6,
      },
    };
    finalNodes.push(newNode);
    //Create and push edge
    if (parentId && !finalEdges.find((e) => e.id === `${parentId}-${id}`)) {
      finalEdges.push({
        id: `${parentId}-${id}`,
        source: parentId,
        target: id,
      });
    }

    node.children?.forEach((child: any) => {
      createNode(child, id);
    });
  };

  let rootNode: any;

  if (Array.isArray(jsonData)) {
    rootNode = buildTree(jsonData, "root", "$", 0);
  } else if (typeof jsonData === "object" && jsonData !== null) {
    const keys = Object.keys(jsonData);
    if (keys.length === 1) {
      const key = keys[0];
      rootNode = buildTree(jsonData[key], key, "$", 0);
    } else {
      rootNode = buildTree(jsonData, "root", "$", 0);
    }
  } else {
    throw new Error("Unsupported JSON type for visualization");
  }
  createNode(rootNode, null);

  console.log(finalNodes);
  console.log(finalEdges);
  const { nodes, edges } = getLayoutedElements(finalNodes, finalEdges, "TB"); // Top-Bottom layout

  //return nodes and edges to form tree
  return { finalNodes: nodes, finalEdges: edges };
};
