import { ToastContainer } from "react-toastify";
import { JSONInput } from "./components/JSONInput";
import { cn } from "./shared/utils/cn";
import { JSONTree } from "./components/JSONTree";
import JSONProvider from "./context/JSONProvider";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="flex flex-col md:flex-row   min-h-screen bg-gray-50 text-gray-900 overflow-hidden">
      <JSONProvider>
        {/*Input Field for json */}
        <div
          className={cn(
            "w-full md:w-2/5 p-4 bg-white shadow-md border-b md:border-r border-gray-200 flex flex-col"
          )}
        >
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">
            JSON Input
          </h2>
          <JSONInput />
        </div>
        {/*React flow */}
        <div
          className={cn(
            "flex-1 p-2 md:p-4 relative overflow-hidden h-[60vh] md:h-auto"
          )}
        >
          <h2 className="text-xl font-semibold mb-2 text-indigo-600">
            JSON Flow Diagram
          </h2>
          <JSONTree />
        </div>
      </JSONProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
