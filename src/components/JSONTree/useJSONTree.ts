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
    const trimmed = search.trim().toLowerCase();

    // Reset to original nodes if search is empty string and fit view
    if (!trimmed) {
      setNodes(originalNodes.map((n) => ({ ...n, style: { ...n.style } })));
      fitView({ padding: 0.4, includeHiddenNodes: true });
      return;
    }

    // Find match using originalNodes
    const matchedNode = originalNodes.find(
      (n) => n.data?.path?.toLowerCase() === trimmed
    );

    //No match found
    if (!matchedNode) {
      toast.error("No match found!");
      return;
    }

     let targetNode = matchedNode;

  // If primitive, find its corresponding value child
  if (matchedNode.type === "primitive") {
    const valueChild = originalNodes.find(
      (n) =>
        n.data?.path?.startsWith(matchedNode.data?.path) &&
        n.type === "value" &&
        n.data?.level === matchedNode.data?.level + 1
    );
    if (valueChild) targetNode = valueChild;
  }
    // Reset nodes if match found
    setNodes(
      originalNodes.map((n) => {
        // Copy base node style
        const baseStyle = n.style ? { ...n.style } : {};

        if (n.id === targetNode.id) {
          return {
            ...n,
            style: {
              ...baseStyle,
              border: "3px solid #F43F5E",
              background: "#FCE7F3",
              boxShadow: "0 0 10px #F43F5E",
              transition: "all 0.3s ease",
            },
          };
        }

        // Otherwise, restore to original style
        return {
          ...n,
          style: { ...baseStyle },
        };
      })
    );

    // Center view on the matched node
    const { x, y } = targetNode.position;
    setCenter(x, y, { zoom: 1.5, duration: 800 });
    toast.success("Match found!");
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
