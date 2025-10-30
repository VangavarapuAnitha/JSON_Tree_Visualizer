import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Edge, Node } from "reactflow";

export interface JSONNodeData {
  id: string; //unique identification for node
  label: string; //display name
  path: string; //full hierarchical path to this node
  level: number; //indicated depth level of node in tree
  value?: string | number | boolean | null; //actual primitve value associated with this node tells that it is leaf node
}

export type JSONNode = Node<JSONNodeData>;

export interface JSONProviderProp {
  children: ReactNode;
}

export interface JSONContextProps {
  nodes: JSONNode[];
  edges: Edge[];
  originalNodes: JSONNode[];
  search: string;
  setSearch: (val: string) => void;
  setOriginalNodes: React.Dispatch<React.SetStateAction<JSONNode[]>>;
  setNodes: React.Dispatch<React.SetStateAction<JSONNode[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export const JSONContext = createContext<JSONContextProps | null>(null);

export const useJSONContext = () => {
  const context = useContext(JSONContext);
  if (!context) {
    throw new Error("useJSONContext must be used within a JSONProvider");
  }
  return context;
};

const JSONProvider: React.FC<JSONProviderProp> = ({ children }) => {
  const [nodes, setNodes] = useState<JSONNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [originalNodes, setOriginalNodes] = useState<JSONNode[]>([]);
  const [search, setSearch] = useState<string>("");

  // useEffect(() => {
  //   console.log("###", originalNodes);
  // }, [originalNodes]);

  const contextValue: JSONContextProps = {
    nodes,
    edges,
    originalNodes,
    search,
    setSearch,
    setOriginalNodes,
    setEdges,
    setNodes,
  };

  return (
    <JSONContext.Provider value={contextValue}>{children}</JSONContext.Provider>
  );
};

export default JSONProvider;
