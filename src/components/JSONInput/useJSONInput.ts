import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { jsonConvertion } from "../../shared/utils/jsonConvertion";
import { useJSONContext } from "../../context/JSONProvider";

export const useJSONInput = () => {
  const { setNodes, setEdges, setOriginalNodes, setSearch } = useJSONContext();
  //State for input field
  const [jsonInput, setJsonInput] = useState<string>("");

  //Check jsonInput and valid json format
  const handleSubmit = useCallback(async () => {
    const trimmed = jsonInput.trim();
    //Check empty string
    if (!trimmed) {
      toast.warning("Please enter some JSON data");
      return;
    }
    try {
      const parsed = JSON.parse(trimmed);
      console.log(parsed);
      //Makesure JSON must be object or array
      if (
        parsed === null ||
        typeof parsed === "string" ||
        typeof parsed === "number" ||
        typeof parsed === "boolean"
      ) {
        toast.warning(
          "Primitive values cannot be visualized,use object or arra"
        );
        return;
      }
      //Reject empty json(object or array)
      if (
        (Array.isArray(parsed) && parsed.length === 0) ||
        (typeof parsed === "object" && Object.keys(parsed).length === 0)
      ) {
        toast.warning("Empty JSON, nothing to visualize");
        return;
      }
      const { finalNodes, finalEdges } = await jsonConvertion(parsed);
      //Check whether nodes generated or not
      if (finalNodes.length === 0) {
        toast.warning("No nodes generated from JSON");
        return;
      }
      setOriginalNodes(finalNodes);
      setNodes(finalNodes);
      setEdges(finalEdges);
    } catch (error) {
      console.log("Error in JSONInput:", error);
      toast.error("Invalid JSON format");
    }
  }, [jsonInput]);

  const handleClear = () => {
    setJsonInput("");
    setNodes([]);
    setEdges([]);
    setOriginalNodes([]);
    setSearch("");
  };

  return { jsonInput, setJsonInput, handleSubmit, handleClear };
};
