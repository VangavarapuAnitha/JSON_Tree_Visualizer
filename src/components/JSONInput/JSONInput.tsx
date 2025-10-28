import { Button } from "../../shared/Button";
import { TextArea } from "../../shared/TextArea";
import { useJSONInput } from "./useJSONInput";

const JSONInput = () => {
  const { jsonInput, setJsonInput, handleSubmit } = useJSONInput();
  return (
    <div className="flex flex-col gap-4 ">
      {/*TextArea reusable input field */}
      <TextArea
        name="jsonInput"
        value={jsonInput}
        onChange={(val: string) => setJsonInput(val)}
        classNames={{
          input: "flex-1 min-h-[200px] sm:min-h-[300px] md:min-h-[400px]",
        }}
      />
      <div className="md:flex md:justify-end">
        {/*Reusble button */}
        <Button
          label="Generate Tree"
          onClick={handleSubmit}
          className="py-1 px-1.5"
        />
      </div>
    </div>
  );
};

export default JSONInput;
