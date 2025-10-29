import { useJSONContext } from "../../context/JSONProvider";

export const useJSONTree = () => {
  const { nodes, edges } = useJSONContext();
  return { nodes, edges };
};
