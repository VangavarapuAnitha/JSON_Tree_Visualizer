import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { jsonConvertion } from "../../shared/utils/jsonConvertion";
import { useJSONContext } from "../../context/JSONProvider";

export const useJSONInput = () => {
  const { setNodes, setEdges } = useJSONContext();
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
      setNodes(finalNodes);
      setEdges(finalEdges);
    } catch (error) {
      toast.error("Invalid JSON format");
    }
  }, [jsonInput]);

  return { jsonInput, setJsonInput, handleSubmit };
};
