import { ToastContainer } from "react-toastify";
import { JSONInput } from "./components/JSONInput";
import { cn } from "./shared/utils/cn";

function App() {
  return (
    <div className="flex  gap-4 sm:flex-col  md:flex-row  md:justify-between md:p-4 h-auto md:h-screen">
      <div className={cn("sm:w-full md:w-[50%] sm:h-[300px] md:h-full")}>
        <JSONInput />
      </div>
      <div className={cn("md:flex-1 sm:h-[300px] md:h-full")}>JSON Tree</div>
      <ToastContainer />
    </div>
  );
}

export default App;
