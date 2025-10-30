import { useJSONTree } from "./useJSONTree";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { TextInput } from "../../shared/TextInput";
import { Button } from "../../shared/Button";
import { cn } from "../../shared/utils/cn";

const JSONTreeContent = () => {
  const {
    nodes,
    edges,
    search,
    flowWrapper,
    handleDownload,
    setSearch,
    handleSearch,
  } = useJSONTree();

  return (
    <div className="w-full h-full flex flex-col">
      {/*Search and Download image */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 bg-white p-3 rounded-lg shadow-md border border-gray-200">
        <TextInput
          name="search"
          value={search}
          onChange={setSearch}
          classNames={{
            input:
              "flex-1 min-w-[180px] border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-indigo-500",
          }}
        />
        <div className="flex gap-2">
          <Button
            label="Search"
            onClick={handleSearch}
            className="bg-amber-500 text-white border-amber-500 hover:bg-amber-600 px-2"
          />
          <Button
            label="Download"
            onClick={handleDownload}
            className={cn(
              "bg-indigo-600 border-indigo-600 text-white px-2 hover:bg-indigo-700",
              nodes.length === 0 && "pointer-events-none"
            )}
          />
        </div>
      </div>
      {/*React flow chart*/}
      <div
        ref={flowWrapper}
        className="flex-1 h-full min-h-[300px] bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          minZoom={0.1}
          maxZoom={2}
          className="w-full h-full"
        >
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
    </div>
  );
};

const JSONTree = () => (
  <ReactFlowProvider>
    <JSONTreeContent />
  </ReactFlowProvider>
);

export default JSONTree;
