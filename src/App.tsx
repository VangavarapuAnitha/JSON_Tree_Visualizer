import { ToastContainer } from "react-toastify";
import { JSONInput } from "./components/JSONInput";
import { cn } from "./shared/utils/cn";
import { JSONTree } from "./components/JSONTree";
import JSONProvider from "./context/JSONProvider";

function App() {
  return (
    <div className="flex  gap-4 sm:gap-12 sm:flex-col  md:flex-row  md:justify-between md:p-4 h-auto md:h-screen">
      <JSONProvider>
        <div className={cn("sm:w-full md:w-[40%] sm:h-[300px] md:h-full")}>
          <JSONInput />
        </div>
        <div className={cn("md:flex-1 sm:h-[300px] md:h-full")}>
          <JSONTree />
        </div>
      </JSONProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
