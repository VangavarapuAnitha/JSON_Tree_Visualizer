import { useRef, useCallback, useEffect } from "react";
import { useJSONContext } from "../../context/JSONProvider";
import { useReactFlow } from "reactflow";
import { toast } from "react-toastify";
import * as htmlToImage from "html-to-image";

export const useJSONTree = () => {
  const { nodes, edges, originalNodes, search, setNodes, setSearch } =
    useJSONContext();

  const { setCenter, fitView } = useReactFlow();
  const flowWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nodes.length > 0) {
      const resizeHandler = () => {
        fitView({ padding: 0.4, includeHiddenNodes: true });
      };

      resizeHandler();
      window.addEventListener("resize", resizeHandler);

      return () => window.removeEventListener("resize", resizeHandler);
    }
  }, [nodes, fitView]);

  //Search and set nodes
  const handleSearch = useCallback(() => {
    if (!search.trim()) {
      console.log("@@@");
      setNodes((prevNodes) =>
        prevNodes.map((n) => {
          const originalStyle =
            originalNodes.find((on) => on.id === n.id)?.style || n.style;
          return { ...n, style: { ...originalStyle } };
        })
      );
      return;
    }
    console.log(originalNodes);

    const matchedNode = originalNodes.find(
      (n) => n.data?.path?.toLowerCase() === search.trim().toLowerCase()
    );

    if (matchedNode) {
      const updatedNodes = originalNodes.map((n) =>
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
      );

      setNodes(updatedNodes);

      // Center view on the matched node
      const { x, y } = matchedNode.position;
      setCenter(x, y, { zoom: 1.5, duration: 800 });
      toast.success("Match found!");
    } else {
      toast.error("No match found!");
    }
  }, [originalNodes, search, setNodes, setCenter]);

  //Download flow chart as image
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
