import { Button } from "../../shared/Button";
import { TextArea } from "../../shared/TextArea";
import { useJSONInput } from "./useJSONInput";

const JSONInput = () => {
  const { jsonInput, setJsonInput, handleSubmit, handleClear } = useJSONInput();
  return (
    <div className="flex flex-col gap-4 h-full">
      {/*TextArea reusable input field */}
      <TextArea
        name="jsonInput"
        value={jsonInput}
        onChange={(val: string) => setJsonInput(val)}
        classNames={{
          input:
            "w-full h-64 md:h-[500px] lg:h-[600px] resize-none border rounded-lg border-gray-300 p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm",
        }}
      />
      <div className="flex justify-end gap-2">
        {/*Reusble button */}
        <Button
          label="Clear"
          onClick={handleClear}
          className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-lg shadow-md transition-all"
        />
        <Button
          label="Generate Tree"
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
        />
      </div>
    </div>
  );
};

export default JSONInput;
