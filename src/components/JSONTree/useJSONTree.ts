import { useState, useRef } from "react";
import { useJSONContext } from "../../context/JSONProvider";
import { useReactFlow } from "reactflow";
import { toast } from "react-toastify";
import * as htmlToImage from "html-to-image";
export const useJSONTree = () => {
  const { nodes, edges } = useJSONContext();
  const [search, setSearch] = useState<string>("");
  const { setNodes, getNodes, setCenter } = useReactFlow();
  const flowWrapper = useRef<HTMLDivElement>(null);
  const handleSearch = () => {
    if (!search.trim()) return;

    const allNodes = getNodes();
    const matchedNode = allNodes.find(
      (n) => n.data?.path?.toLowerCase() === search.trim().toLowerCase()
    );

    if (matchedNode) {
      // Highlight the matched node
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          style: {
            ...n.style,
            border:
              n.id === matchedNode.id
                ? "3px solid #F43F5E" // pink border for highlight
                : "1px solid #333",
          },
        }))
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
