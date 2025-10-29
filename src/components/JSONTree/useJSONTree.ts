import { useState, useRef } from "react";
import { useJSONContext } from "../../context/JSONProvider";
import { useReactFlow } from "reactflow";
import { toast } from "react-toastify";
import * as htmlToImage from "html-to-image";
export const useJSONTree = () => {
  const { nodes, edges, originalNodes, setNodes } = useJSONContext();
  const [search, setSearch] = useState<string>("");
  const { setCenter } = useReactFlow();
  const flowWrapper = useRef<HTMLDivElement>(null);

  //Search and set nodes
  const handleSearch = () => {
    if (!search.trim()) return;
    console.log(originalNodes);

    const matchedNode = originalNodes.find(
      (n) => n.data?.path?.toLowerCase() === search.trim().toLowerCase()
    );

    if (matchedNode) {
      // Start fresh from original nodes before applying highlight
      setNodes(
        originalNodes.map((n) =>
          n.id === matchedNode.id
            ? {
                ...n,
                style: {
                  ...n.style,
                  border: "3px solid #F43F5E",
                  backgroundColor: "#FCE7F3",
                  transition: "all 0.3s ease",
                },
              }
            : n
        )
      );

      // Center view on the matched node
      const { x, y } = matchedNode.position;
      setCenter(x, y, { zoom: 1.5, duration: 800 });
      toast.success("Match found!");
    } else {
      toast.error("No match found!");
    }
  };

  const handleDownload = async () => {
    console.log("download clicked");
    const flowElement = flowWrapper.current?.querySelector(
      ".react-flow__viewport"
    ) as HTMLElement | null;

    if (!flowElement) {
      console.error("React Flow container not found");
      return;
    }

    try {
      const dataUrl = await htmlToImage.toPng(flowElement, {
        backgroundColor: "white",
      });

      const link = document.createElement("a");
      link.download = "json-flow.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return {
    nodes,
    edges,
    search,
    flowWrapper,
    setSearch,
    handleSearch,
    handleDownload,
  };
};
