import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useJSONInput = () => {
  //State for input field
  const [jsonInput, setJsonInput] = useState<string>("");

  //Check jsonInput and valid json format
  const handleSubmit = useCallback(() => {
    const trimmed = jsonInput.trim();
    if (!trimmed) {
      toast.warning("Please enter some JSON data");
      return;
    }
    try {
      const parsed = JSON.parse(trimmed);
      console.log(parsed);
    } catch (error) {
      toast.error("Invalid JSON format");
    }
  }, [jsonInput]);

  return { jsonInput, setJsonInput, handleSubmit };
};
