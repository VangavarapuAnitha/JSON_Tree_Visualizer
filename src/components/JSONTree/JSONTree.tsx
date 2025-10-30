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
    <div className="h-full flex flex-col gap-1 md:gap-4">
       <h2 className="shrink-0 text-sm md:text-lg font-semibold text-indigo-600">
            JSON Flow Diagram
         </h2>
      {/*Search and Download image */}
      <div className="shrink-0">
      <div className="flex flex-col md:flex-row  md:justify-between gap-2 bg-white p-2 rounded-lg shadow-md border border-gray-200">
        <TextInput
          name="search"
          value={search}
          onChange={setSearch}
          classNames={{
            mainDiv:"flex-1",
            input:
              "border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-indigo-500 focus:outline-none",
          }}
        />
        <div className="flex gap-2 justify-end">
          <Button
            label="Search"
            onClick={handleSearch}
            className="text-sm md:text-lg  bg-amber-500 hover:bg-amber-600 text-white px-1.5 md:px-2 pb-0.5 md:py-0  rounded-lg shadow-md transition-all"
        />
          <Button
            label="Download"
            onClick={handleDownload}
            className={cn(
              " flex text-sm md:text-lg px-1.5 md:px-2  bg-indigo-600 hover:bg-indigo-700 text-white  rounded-lg shadow-md transition-all",
              nodes.length === 0 && "pointer-events-none opacity-50"
            )}

          />
        </div>
        </div>
      </div>
      {/*React flow chart*/}
    
      <div
        ref={flowWrapper}
        className="flex-1 min-h-0 bg-white rounded-lg shadow-md border border-gray-200 relative"
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
          className="hidden md:block"
            nodeColor={(node) =>
              node.type === "object"
                ? "#4F46E5"
                : node.type === "array"
                ? "#10B981"
                : "#F59E0B"
            }
          />
          <Controls className="left-2! bottom-2! md:left-auto! md:bottom-auto!"/>
          <Background  />
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
