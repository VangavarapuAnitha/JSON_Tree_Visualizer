import { Button } from "../../shared/Button";
import { TextArea } from "../../shared/TextArea";
import { useJSONInput } from "./useJSONInput";

const JSONInput = () => {
  const { jsonInput, setJsonInput, handleSubmit, handleClear } = useJSONInput();
  return (
    <div className="flex flex-col gap-2 md:gap-4 h-full">
        <h2 className="text-sm md:text-lg font-semibold  text-indigo-600">
            JSON Input
          </h2>
      {/*TextArea reusable input field */}
      <TextArea
        name="jsonInput"
        value={jsonInput}
        onChange={(val: string) => setJsonInput(val)}
        classNames={{
          mainDiv:"flex-1 bg-white",
          input:
            "w-full border rounded-lg border-gray-300 p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm",
        }}
      />
    
      <div className="flex justify-end gap-2 ">
        {/*Reusble button */}
        <Button
          label="Clear"
          onClick={handleClear}
          className="text-sm md:text-lg  bg-amber-500 hover:bg-amber-600 text-white px-1 md:px-2   rounded-lg shadow-md transition-all"
        />
        <Button
          label="Generate Tree"
          onClick={handleSubmit}
          className=" flex text-sm md:text-lg px-1 md:px-2  pb-0.5 md:py-0 bg-indigo-600 hover:bg-indigo-700 text-white  rounded-lg shadow-md transition-all"
        />
      </div>
    </div>
  );
};

export default JSONInput;
