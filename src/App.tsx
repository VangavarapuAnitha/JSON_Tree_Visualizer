import { ToastContainer } from "react-toastify";
import { JSONInput } from "./components/JSONInput";
import { cn } from "./shared/utils/cn";
import { JSONTree } from "./components/JSONTree";
import JSONProvider from "./context/JSONProvider";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="flex flex-col md:flex-row  h-screen bg-gray-50 text-gray-900">
      <JSONProvider>
        {/*Input Field for json */}
        <div
          className={cn(
            "w-full md:w-2/5 h-auto md:h-full p-4 pb-0 md:pb-4  flex flex-col max-h-[40vh] md:md:max-h-none"
          )}
        >
          <JSONInput />
        </div>
        {/*React flow */}
        <div
          className={cn(
            " w-full flex-1 py-0 px-4 md:p-4 relative overflow-hidden min-h-[55vh] md:min-h-0"
          )}
        >
          <JSONTree />
        </div>
      </JSONProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
