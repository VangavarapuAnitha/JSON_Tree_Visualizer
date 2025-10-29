import { useJSONTree } from "./useJSONTree";
import { useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

const JSONTreeContent = () => {
  const { nodes, edges } = useJSONTree();
  const { fitView } = useReactFlow();

  useEffect(() => {
    if (nodes.length > 0) {
      setTimeout(() => {
        fitView({ padding: 0.4, includeHiddenNodes: true });
      }, 50);
    }
  }, [nodes, fitView]);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView minZoom={0.1} maxZoom={2}>
        <MiniMap
          nodeColor={(node) =>
            node.type === "object"
              ? "#4F46E5"
              : node.type === "array"
              ? "#10B981"
              : "#F59E0B"
          }
        />
        <Controls />
        <Background gap={16} />
      </ReactFlow>
    </div>
  );
};

const JSONTree = () => (
  <ReactFlowProvider>
    <JSONTreeContent />
  </ReactFlowProvider>
);

export default JSONTree;
